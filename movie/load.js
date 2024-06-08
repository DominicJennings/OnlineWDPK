const movie = require("./main");
const loadPost = require("../misc/post_body");
const fs = require("fs");
const fUtil = require("../misc/file");
const { genRandonString } = require("../asset/main");
const bcrypt = require( 'bcrypt' );
const base = Buffer.alloc(1, 0);
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url, settings) {
  // watermark xml
  const watermarkStyle = settings.watermark != "default" ? `<watermark style="${settings.watermark}"/>` : "";
	switch (req.method) {
		case "GET": {
			const match = req.url.match(/\/movies\/([^.]+)(?:\.(zip|xml))?$/);
			if (!match) return;

			var id = match[1];
			var ext = match[2];
			switch (ext) {
				case "zip": {
          res.setHeader("Content-Type", "application/zip");
          // gets a movie's zip file (helpful for downloading movies to use on wrapper offline.)
          async function loadMovie() {
            res.end(await movie.loadZip(id));
          }
          loadMovie()
					break;
        } default: {
					res.setHeader("Content-Type", "text/xml");
					movie.loadXml(id).then((v) => {
						try {
							res.statusCode = 200;
							res.end(v);
						} catch (e) {
							res.statusCode = 404;
              console.log(e);
							res.end("404 Not Found");
						}
					}).catch(e => console.log(e));
        }
			}
			return true;
		}

		case "POST": {
      switch (url.pathname) {
        case "/goapi/getMovie/": {
          async function loadMovie() {
            res.setHeader("Content-Type", "application/zip");
            // loads a movie by parsing it (helpful for starters)
            const b = await movie.loadZip(url.query.movieId);
            res.end(Buffer.concat([base, b]));
          }
          loadMovie();
          return true;
          // searches for a movie by title or tag
        } case "/ajax/searchMovies": {
          loadPost(req, res).then(([data]) => {
            const search = data.search;
            res.statusCode = 302;
            res.setHeader("Location", `/html/list.html?search_query=${search}`);
            res.end();
          });
          return true;
          // gets a watermark by user or default settings
        } case "/goapi/getMovieInfo/": {
          res.end(`<?xml encoding="UTF-8"?><watermarks>${watermarkStyle}</watermarks>`)
          return true;
          // deletes a movie along with it's meta
        } case "/ajax/movie/delete": {
          try {
            const id = url.query.id;
            const i = id.indexOf("-");
            const suffix = id.substr(i + 1);
            const path = fUtil.getFileIndex("movie-", ".xml", suffix);
            const thumbPath = fUtil.getFileIndex("thumb-", ".png", suffix);
            const usrPath = fUtil.getFileIndex("user-", ".json", suffix);
            const hiddenPath = fUtil.getFileIndex("hidden-movie-", ".txt", suffix);
            fs.existsSync(hiddenPath) ? fs.unlinkSync(hiddenPath) : "";
            fs.unlinkSync(path);
            fs.unlinkSync(thumbPath);
            fs.unlinkSync(usrPath);
            res.end(JSON.stringify({status: "ok"}));
          } catch (e) {
            res.end(JSON.stringify({status: "error"}));
          }
          return true;
          // hides a movie
        } case "/ajax/movie/hide": {
          try {
            const id = url.query.id;
            const i = id.indexOf("-");
            const suffix = id.substr(i + 1);
            const hiddenPath = fUtil.getFileIndex("hidden-movie-", ".txt", suffix);
            fs.writeFileSync(hiddenPath, `Movie ${id} is hidden. please don't tamper with this file. if this file is removed, then it reveals movie ${id} to the public.`)
            res.end(JSON.stringify({status: "ok"}));
          } catch (e) {
            res.end(JSON.stringify({status: "error"}));
          }
          return true;
          // shows a movie
        } case "/ajax/movie/show": {
          try {
            const id = url.query.id;
            const i = id.indexOf("-");
            const suffix = id.substr(i + 1);
            const hiddenPath = fUtil.getFileIndex("hidden-movie-", ".txt", suffix);
            fs.unlinkSync(hiddenPath);
            res.end(JSON.stringify({status: "ok"}));
          } catch (e) {
            res.end(JSON.stringify({status: "error"}));
          }
          return true;
          // generates a secure string (helpful for passwords)
        } case "/ajax/generateStrings": {
          try {
            const string = genRandonString(12);
            fs.writeFileSync(`./meta/accounts/password_generated_${settings.ip_address}.txt`, string);
            res.end(string);
          } catch (e) {
            res.end(e);
          }
          return true;
        } case "/ajax/account/staff/login": {
          loadPost(req, res).then(([data]) => {
            const disTag = data.discord_tag;
            if (!disTag.includes("#")) {
              res.statusCode = 302;
              res.setHeader("Location", `/html/list.html?errorMessage=Invaild Discord Tag Format`);
              res.end();
            } else {
              switch (disTag) {
                  // discord tags that are allowed to use staff accounts.
                case "joseph the animator#2292":
                case "Amy💜#0854":
                case "Crytoxs#2421":
                case "Kia#0001":
                case "TheToonsOfJosh#1462":
                case "LexianDEV#0001":
                case "MJ, the Spirit#4655":
                case "Revolution909#5017":
                  //jerry, i don't think that a recovery account will be a good idea because once again it will leave the user exposed to hackers who use the account.
                case "SnowFLG64#6512": {
                  // by request of a few staff members, this new code now uses bcrypt to secure all passwords to prevent hacking and us seeing the actual passwords.
                  const password = data.psw;
                  bcrypt.genSalt(10, function(err, salt) {
                    // error handler
                    if (err) {
                      res.statusCode = 302;
                      res.setHeader("Location", `/html/list.html?errorMessage=${err}`);
                      res.end();
                    } else if (salt) {
                      bcrypt.hash(password, salt, function(err, hash) {
                        // error handler
                        if (err) {
                          res.statusCode = 302;
                          res.setHeader("Location", `/html/list.html?errorMessage=${err}`);
                          res.end();
                        } else if (hash) {
                          const [ name, id ] = disTag.split("#");
                          const pswGenerated = fs.existsSync(
                            `./meta/accounts/password_generated_${settings.ip_address}.txt`
                          );
                          // saves the hash into the accounts database if the user does not have a password
                          if (data.no_password || pswGenerated) {
                            if (!fs.existsSync(`./meta/accounts/${id}.json`)) {
                              // creates a file witch prevents a hacker from hacking into a staff account.
                              fs.writeFileSync(`./meta/accounts/${id}.json`, JSON.stringify({hash: hash}));
                              fs.writeFileSync(`./meta/accounts/${settings.ip_address}.json`, JSON.stringify({
                                name: name,
                                hash: hash,
                                id: id
                              }));
                              res.statusCode = 302;
                              res.setHeader("Location", "/html/list.html");
                              res.end();
                            } else {
                              res.statusCode = 302;
                              res.setHeader("Location", `/html/list.html?errorMessage=The password for ${name} has already been generated. If you are a hacker then just stop trying to hack into ${name}'s account!`);
                              res.end();
                            }
                          } else {
                            // why
                            try {
                              const meta = require(`../meta/accounts/${id}.json`);
                              bcrypt.compare(password, meta.hash, function(err, result) {
                                if (err) console.log(err);
                                else if (result) {
                                  fs.writeFileSync(`./meta/accounts/${settings.ip_address}.json`, JSON.stringify({
                                    name: name,
                                    hash: hash,
                                    id: id
                                  }));
                                  res.statusCode = 302;
                                  res.setHeader("Location", "/html/list.html");
                                  res.end();
                                } else {
                                  res.statusCode = 302;
                                  res.setHeader("Location", "/html/list.html?errorMessage=Your Password Is Incorrect.");
                                  res.end();
                                }
                              });
                            } catch (e) {
                              console.log(e);
                            }
                          }
                        }
                      });
                    }
                  });
                  break;
                } default: {
                  res.statusCode = 302;
                  res.setHeader("Location", "/html/list.html?errorMessage=Your discord tag does not exist in the database. if you want to login using the staff account method, then you need to be a developer of redrawn. Not a developer? No service. just use your replit account to login instead.");
                  res.end();
                }
              }
            }
          });
          return true;
          //found the ajax to preview text2videos, it shallst worketh!
        } case "/ajax/previewText2Video": {
          loadPost(req, res).then(([data]) => {
            console.log(data);
            /*const cId = data.charId;
            const text = data['dialogue-char'];
            const voice = data.tts_voice;*/
          });
          return true;
        }
      }
		}
		default:
			return;
	}
};
