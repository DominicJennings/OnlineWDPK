const loadPost = require("../misc/post_body");
const header = process.env.XML_HEADER;
const fUtil = require("../misc/file");
const nodezip = require("node-zip"), z = nodezip.create();
const base = Buffer.alloc(1, 0);
const asset = require("./main");
const http = require("http");
var xmlString, files;
function zip(zip, files, mode) {
  files.map(file => {
    const buffer = asset.load(file.id, mode);
    fUtil.addToZip(zip, `${file.mode}/${file.id}`, buffer);
  });
}
const fs = require('fs');
async function listAssets(data, makeZip) {
	switch (data.type) {
		case "char": {
			const chars = await asset.chars(data.themeId);
			xmlString = `${header}<ugc more="0">${chars
				.map(
					(v) =>
						`<char id="${v.id}" name="Untitled Character" cc_theme_id="${v.theme}" thumbnail_url="/char_thumbs/${v.id}.png" copyable="N"><tags/></char>`
				)
				.join("")}</ugc>`;
			break;
		}
		case "bg": {
      files = asset.list("bg");
			xmlString = `${header}<ugc more="0">${files
				.map((v) => `<background subtype="0" id="${v.id}" name="${v.name}" enable="Y"/>`)
				.join("")}</ugc>`;
      zip(z, files, "bg");
			break;
		}
		case "sound": {
			files = asset.list("sound");
      xmlString = `${header}<ugc more="0">${files.map((v) => asset.xml(v, "sound")).join("")}</ugc>`;
      break;
		}	
		case "movie": {
			files = asset.list("starter");
			xmlString = `${header}<ugc more="0">${files.map((v) => `<movie id="${v.id}" enc_asset_id="${v.id}" path="/_SAVED/${v.id}" numScene="1" title="${v.name}" thumbnail_url="/movie_thumbs/${v.id}.png"><tags>${v.tag}</tags></movie>`).join("")}</ugc>`;
			break;
		}
		case "prop": {
			files = asset.list(data.movieId, "prop");
			xmlString = `${header}<ugc more="0">${files.map((v) => meta.xml("prop")).join("")}</ugc>`;
			break;
		} default: {
      xmlString = `${header}<ugc more="0"></ugc>`;
      break;
    }
	}

	if (makeZip) {
		fUtil.addToZip(z, "desc.xml", Buffer.from(xmlString));
		return await z.zip();
	} else {
		return Buffer.from(xmlString);
	}
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	var makeZip = false;
	switch (url.pathname) {
		case "/goapi/getUserAssets/":
			makeZip = true;
			break;
		case "/goapi/getUserAssetsXml/":
			break;
		default:
			return;
	}

	switch (req.method) {
		case "GET": {
      if (!url.pathname.startsWith("/quickvideo")) return;
      res.end(fs.readFileSync(`.${url.pathname}`));
      return true;
		}
		case "POST": {
      
			loadPost(req, res).then(([data]) => listAssets(data, makeZip)).then((buff) => {
				const type = makeZip ? "application/zip" : "text/xml";
				res.setHeader("Content-Type", type);
				if (makeZip) res.write(base);
				res.end(buff);
			});
			return true;
		}
		default:
			return;
	}
};
