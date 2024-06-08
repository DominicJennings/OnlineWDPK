const char = require("./main");
const http = require("http");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
  var path = url.pathname;
	if (req.method != "GET" || !path.startsWith("/char_thumbs")) return;
	var beg = path.lastIndexOf("/") + 1;
	var end = path.lastIndexOf(".");
	var ext = path.substr(end + 1).toLowerCase();
	if (ext != "png") return;

	char.loadThumb(path.substr(beg, end - beg)).then((v) => {
		res.setHeader("Content-Type", "image/png");
		res.statusCode = 200;
		res.end(v);
	}).catch(e => {
		res.statusCode = 404;
    console.log(e);
		res.end("404 Not Found");
	});
	return true;
};
