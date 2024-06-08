const loadPost = require("../misc/post_body");
const mp3Duration = require("mp3-duration");
const voices = require("./info").voices;
const asset = require("../asset/main");
const util = require("../misc/util");
const tts = require("./main");
const http = require("http");
const fs = require("fs");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
  if (req.method != "POST" || url.path != "/goapi/convertTextToSoundAsset/") return;
  loadPost(req, res).then(([data]) => {
    tts(data.voice, data.text).then((buffer) => {
      mp3Duration(buffer, (e, d) => {
        var dur = d * 1e3;
        if (e || !dur) {
          res.end(1 + util.xmlFail("Unable to retrieve MP3 stream."));
          return;
        }
        const title = `[${voices[data.voice].desc}] ${data.text}`;
				asset.saveSound(buffer, "tts", "mp3").then(id => {
          res.end(`0<response><asset><id>${id}</id><enc_asset_id>${id}</enc_asset_id><type>sound</type><subtype>tts</subtype><title>${title}</title><published>0</published><tags></tags><duration>${dur}</duration><downloadtype>progressive</downloadtype><file>${id}</file></asset></response>`);
          fs.writeFileSync(`./meta/sound/titles/${id.slice(0, -4)}.txt`, title);
        }).catch(e => console.log(e));
      });
		}).catch((e) => console.log(e));
  });
	return true;
};
