const loadPost = require("../misc/post_body");
const character = require("./main");
const http = require("http");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method == "POST")
		switch (url.pathname) {
			case "/goapi/saveCCCharacter/":
				loadPost(req, res).then(([data]) => {
          if (data.charId) {
            async function saveCharacter() {
              await character.save(data.body, data.charId);
              var thumb = Buffer.from(data.thumbdata, "base64");
              var head = Buffer.from(data.imagedata, "base64");
							character.saveThumb(thumb, data.charId);
              character.saveHead(head, data.charId);
							res.end(`0${data.charId}`);
						}
            saveCharacter();
          } else {
            character.save(data.body).then((id) => {
              var thumb = Buffer.from(data.thumbdata, "base64");
              var head = Buffer.from(data.imagedata, "base64");
							character.saveThumb(thumb, id);
              character.saveHead(head, id);
							res.end(`0${id}`);
						}).catch(e => console.log(e));
          }
        });
				return true;

			case "/goapi/saveCCThumbs/":
				loadPost(req, res).then(([data]) => {
          var id = data.assetId;
          var thumb = Buffer.from(data.thumbdata, "base64");
          var head = Buffer.from(data.imagedata, "base64");
          character.saveThumb(thumb, id);
          character.saveHead(head, id);
          res.end(`0${id}`);
				});
				return true;
		}
	return;
};
