/* Looking for a written form of the themes list?
"action"
"akon"
"animal"
"anime"
"ben10"
"bizmodels"
"botdf"
"bunny"
"business"
"cc_store"
"chibi"
"chowder"
"christmas"
"common"
"commoncraft"
"custom"
"domo"
"fullenergy"
"infographics"
"monkeytalk"
"monstermsh"
"ninja"
"ninjaanime"
"politic"
"politics2"
"retro"
"sf"
"space"
"spacecitizen"
"startrek"
"stick"
"sticklybiz"
"street"
"underdog"
"vietnam"
"whiteboard"
"willie"
*/

const http = require("http");
const fUtil = require("../misc/file");
const folder = process.env.THEME_FOLDER;
const fs = require('fs');
const { list, meta } = require("../movie/main");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url, settings) {
	switch (req.method) {
    case "POST": {
      switch (url.path) {
        case "/goapi/getThemeList/": {
          const type = settings.themelist_type;
          var [ beg, end ] = type.split("_");
          res.setHeader("Content-Type", "application/zip");
          fUtil.makeZip(`${folder}/${beg}_${end}.xml`, "themelist.xml").then((b) => res.end(b));
          return true;
        } default: return;
      }
    } case "GET": {
      const match = req.url.match(/\/ajax\/videos\/([^/]+)\/list$/);
      if (!match) return;
      Promise.all(list(match[1]).map(meta)).then(a => res.end(JSON.stringify(a))).catch(e => console.log(e));
      return true;
    }
  }
};
