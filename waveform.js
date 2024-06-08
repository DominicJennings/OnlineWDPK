const fs = require("fs");
const loadPost = require("./misc/post_body")
const get = require("./misc/get");

module.exports = function(req, res, url, settings) {
  if (req.method != "POST") return;
  switch (url.pathname) {
    case "/goapi/getWaveform/": {
      loadPost(req, res).then(([data]) => {
        if (settings.waveform) {
          try {
            if (data.wftheme == "ugc") res.end(fs.readFileSync(`./waveforms/${data.wfid.slice(0, -4)}.wf`));
            else {
              get(`${process.env.STORE_URL}/${data.wftheme}/sound/${data.wfid}`).then(buffer => {
                res.end(buffer);
              });
            }
          } catch (e) {
            res.end(fs.readFileSync(`./sounds/${data.wfid}`));
          }
        } else res.end(fs.readFileSync('./waveforms/waveform.txt'));
      });
      return true;
    }
    case "/goapi/saveWaveform/": {
      loadPost(req, res).then(([data]) => {
        if (settings.waveform) {
          if (!fs.existsSync('./waveforms')) fs.mkdirSync('./waveforms');
          fs.writeFileSync(`./waveforms/${data.wfid.slice(0, -4)}.wf`, data.waveform);
        } else res.end(1);
      });
      return true;
    }
  }
}