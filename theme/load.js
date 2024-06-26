const loadPost = require("../misc/post_body");
const folder = process.env.THEME_FOLDER;
const fUtil = require("../misc/file");
const http = require("http");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url, _settings, _user, data) {
  if (req.method != "POST" || url.path != "/goapi/getTheme/") return;
  loadPost(req, res).then(([data]) => {
    var theme = data.themeId;
    res.setHeader("Content-Type", "application/zip");
    fUtil.makeZip(`${folder}/${theme}.xml`, "theme.xml").then((b) => res.end(b)).catch(e => console.log(e));
  });
	return true;
};
