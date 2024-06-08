const loadPost = require("../misc/post_body");
const movie = require("./main");
const http = require("http");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url, _settings, user) {
	if (req.method != "POST" || url.path != "/goapi/saveMovie/") return;
	loadPost(req, res).then(([data]) => {
		const trigAutosave = data.is_triggered_by_autosave;
    var thumb = Buffer.from(data.thumbnail, "base64");
    var large = Buffer.from(data.thumbnail_large, "base64");
		movie.getStockThumb(data.tray).then(buffer => {
      var body = Buffer.from(data.body_zip, "base64");
      if (trigAutosave) {
        thumb = buffer;
        large = buffer;
      }
      movie.save(body, thumb, large, data.presaveId, user).then((nId) => res.end(0 + nId)).catch(e => console.log(e));
    }).catch(e => console.log(e));
	});
	return true;
};
