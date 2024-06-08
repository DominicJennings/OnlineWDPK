const chars = require("../character/main");
const fUtil = require("../misc/file");
const movie = require("../movie/main");
const mp3Duration = require("mp3-duration");
const fs = require("fs");

module.exports = {
  genRandonString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  },
  settings(id, ip) {
    const baseDb = {
			tutorial: !fs.existsSync(`./tutorial-${id}.txt`), 
      themelist_type: fs.existsSync(`./themelist-${id}.txt`) ? fs.readFileSync(`./themelist-${id}.txt`, 'utf8') : "gotest_themelist", 
			waveform: !fs.existsSync(`./waveform-${id}.txt`),
			watermark: fs.existsSync(`./watermark-${id}.txt`) ? fs.readFileSync(`./watermark-${id}.txt`, 'utf8') : "g4s",
			wide: fs.existsSync(`./wide-${id}.txt`) ? "1" : "0",
      ip_address: ip,
      mode: fs.existsSync(`./mode-${id}.txt`)
		};
    return baseDb;
  },
	load(id, mode) {
		switch (mode) {
      case "bg": return fs.readFileSync(`./backgrounds/${id}`)
      case "prop": return fs.readFileSync(`./props/${id}`)
    }
	},
  async loadSound(aId) {
    return fs.readFileSync(`./sounds/${aId}`);
	},

  saveSound(buffer, mode, ext) {
    return new Promise(res => {
      const id = this.genRandonString(12);
      if (!fs.existsSync('./sounds')) fs.mkdirSync('./sounds');
      fs.writeFileSync(`./sounds/${id}-${mode}.${ext}`, buffer);
      res(`${id}-${mode}.${ext}`);
    });
  },
  duration(buffer) {
    return new Promise((res, rej) => {
      mp3Duration(buffer, (e, d) => {
        var dur = d * 1e3;
        if (e) rej(e);
        else res(dur);
      });
    });
  },
	list(mode) {
		const table = [];
    var folder;
    switch (mode) {
      case "bg": {
        folder = "./backgrounds";
        break;
      }
    }
    if (mode == "starter") {
      var ids = fUtil.getValidFileIndicies("starter-", ".xml");
      for (const i in ids) {
        var id = `s-${ids[i]}`;
        const title = fs.readFileSync(`./meta/starter/titles/${id}.txt`, 'utf8');
        const tag = fs.readFileSync(`./meta/starter/tags/${id}.txt`, 'utf8');
        table.unshift({ id: id, title: title, tag: tag });
			}
    } else {
      fs.readdirSync(folder).forEach(file => {
        if (file.endsWith("tts")) return;
        const title = fs.readFileSync(`./meta/${mode}/titles/${file.slice(0, -4)}.txt`);
        table.unshift({id: file, name: title, mode: mode});
      })
    }
    return table;
	},
  meta(id, mode, ext) {
    var subtype, type;
    if (mode == "bg" && mode == "prop") subtype = 0;
    else subtype = mode;
    if (mode == "voiceover" && mode == "soundeffect" && mode == "bgmusic") type = "sound";
    const title = fs.readFileSync(`./meta/${mode}/titles/${id}.txt`);
    const info = {
      id: id + '.' + ext,
      tags: "",
      type: type || mode,
      subtype: subtype,
      title: title,
      themeId: "ugc"
    } 
    if (type == "sound") info.duration = this.duration(fs.readFileSync(`./sounds/${id}-${mode}.${ext}`))
    return info;
  },
  meta2Xml(v) {
		let xml;
		switch (v.type) {
			case "char": {
				xml = `<char id="${v.id}" enc_asset_id="${v.id}" name="${v.title || "Untitled"}" cc_theme_id="${v.themeId}" thumbnail_url="/char_thumbs/${v.id}.png" copyable="Y"><tags>${v.tags || ""}</tags></char>`;
				break;
			} case "bg": {
				xml = `<background subtype="0" id="${v.id}" enc_asset_id="${v.id}" name="${v.title}" enable="Y" asset_url="/assets/${v.id}"/>`
				break;
			} case "movie": {
				xml = `<movie id="${v.id}" enc_asset_id="${v.id}" path="/go/toons/${v.id}" numScene="${v.sceneCount}" title="${v.title}" thumbnail_url="/starter_thumbs/${v.id}.png"><tags>${v.tags || ""}</tags></movie>`;
				break;
			} case "prop": {
				if (v.subtype == "video") {
					xml = `<prop subtype="video" id="${v.id}" enc_asset_id="${v.id}" name="${v.title}" enable="Y" placeable="1" facing="left" width="640" height="360" asset_url="/assets/${v.id}" thumbnail_url="/assets/${v.id.slice(0, -3) + "png"}"/>`;
				} else {
					xml = `<prop subtype="0" id="${v.id}" enc_asset_id="${v.id}" name="${v.title}" enable="Y" placeable="1" facing="left" width="0" height="0" asset_url="/assets/${v.id}"/>`;
				}
				break;
			} case "sound": {
				xml = `<sound subtype="${v.subtype}" id="${v.id}" enc_asset_id="${v.id}" name="${v.title}" enable="Y" duration="${v.duration}" downloadtype="progressive"/>`;
				break;
			}
		}
		return xml;
	},
	chars(theme) {
		return new Promise(async (res, rej) => {
			switch (theme) {
				case "custom":
					theme = "family";
					break;
				case "action":
				case "animal":
				case "space":
				case "vietnam":
					theme = "cc2";
					break;
			}
			var table = [];
			fs.readdirSync('./chars').forEach(async file => {
        const [ id, ext ] = file.split(".");
        if (ext == "png") return;
        if (theme == await chars.getTheme(id)) table.unshift({ theme: theme, id: id });
			});
			res(table);
		});
	},
};
