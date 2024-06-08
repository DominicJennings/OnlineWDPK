const loadPost = require("../misc/post_body");
const asset = require("./main");
const char = require("../character/main");
const http = require("http");
const fs = require("fs");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url, _settings, user) {
	switch (req.method) {
		case "GET": {
			const match = req.url.match(/\/char_heads\/([^/]+)$/);
			if (!match) return;
      const [ id, ext ] = match[1].split(".");
      if (ext != "png") return;
      char.loadHead(id).then(buffer => {
        res.setHeader("Content-Type", "image/png");
        res.end(buffer);
      }).catch(e => {
        console.log(e);
        res.end('An Error Has Occured.');
      });
			return true;
		}

		case "POST": {
			switch (url.pathname) {
        case "/goapi/rebuildTTS/":
				case "/goapi/getAsset/": {
          loadPost(req, res).then(([data]) => asset.loadSound(data.assetId)).then(b => {
            res.setHeader("Content-Length", b.length);
						res.setHeader("Content-Type", "audio/mp3");
						res.end(b);
          }).catch(e => console.log(e));
					return true;
          // ajax api
				} case "/ajax/settings/update": {
          loadPost(req, res).then(([data]) => {
            const setting = data.setting;
            const value = data.value;
            const id = user.id;
            switch (setting) { 
              case "watermark": {
                if (value == "g4s") fs.unlinkSync(`./watermark-${id}.txt`);
                else fs.writeFileSync(`./watermark-${id}.txt`, value);
                break;
              } case "themelist_type": {
                if (value == "gotest_themelist") fs.unlinkSync(`./themelist-${id}.txt`);
                else fs.writeFileSync(`./themelist-${id}.txt`, value);
                break;
              } default: {
                if (!fs.existsSync(`./${setting}-${id}.txt`)) fs.writeFileSync(`./${setting}-${id}.txt`, '');
                else fs.unlinkSync(`./${setting}-${id}.txt`);
                break;
              }
            }
          });
          return true;
        }
				default:
					return;
			}
		}
		default:
			return;
	}
};
