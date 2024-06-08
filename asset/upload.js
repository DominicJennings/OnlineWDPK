const loadPost = require("../misc/post_body");
const formidable = require("formidable");
const asset = require("./main");
const http = require("http");
const fs = require("fs");

function createMetaFolders(mode) {
  try {
    if (!fs.existsSync('./meta')) fs.mkdirSync('./meta');
    if (!fs.existsSync(`./meta/${mode}`)) fs.mkdirSync(`./meta/${mode}`);
    if (!fs.existsSync(`./meta/${mode}/titles`)) fs.mkdirSync(`./meta/${mode}/titles`);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "POST") return;
	switch (url.pathname) {
		case "/ajax/saveUserProp": {
      new formidable.IncomingForm().parse(req, (e, f, files) => {
        const file = files.import;
        const name = file.originalFilename;
        const dot = name.lastIndexOf('.');
        const ext = name.substring(dot + 1);
        const subtype = f.subtype;
        const path = file.filepath;
        const buffer = fs.readFileSync(path);
        const id = asset.genRandonString(12);
        if (subtype.startsWith("prop")) {
          const [sub, ptype] = subtype.split("-");
          console.log(ptype);
        } else {
          switch (subtype) {
            case "bg": {
              if (!fs.existsSync('./backgrounds')) fs.mkdirSync(`./backgrounds`);
              fs.writeFileSync(`./backgrounds/${id}.${ext}`, buffer);
              if (createMetaFolders("bg")) fs.writeFileSync(`./meta/bg/titles/${id}.txt`, name);
            }
          }
        }
        res.end();
      });
      return true;
    }
  }
};
