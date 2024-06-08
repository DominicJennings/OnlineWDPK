const fUtil = require("../misc/file");
const parse = require("./parse");
const fs = require("fs");
const get = require("../misc/get");
function p(type, ext, suffix) {
  return fUtil.getFileIndex(`${type}-`, `.${ext}`, suffix)
}
function ur(usr) {
  switch (usr) {
    case "joseph%20the%20animator":
    case "MJ,%20the%20Spirit": {
      const [ beg, mid, end ] = usr.split("%20");
      return `${beg} ${mid} ${end}`;
    } case "Guest%20User": {
      const [ beg, mid ] = usr.split("%20");
      return `${beg} ${mid}`;
    } default: return usr;
  }
}
module.exports = {
	/**
	 *
	 * @param {Buffer} movieZip
	 * @param {string} nëwId
	 * @param {string} oldId
	 * @returns {Promise<string>}
	 */
	save(movieZip, thumb, large, mId, user) {
    if (!user) user = {
      name: "Guest User",
      id: "9856859"
    };
		// Saves the thumbnail of the respective video.
		if (thumb && mId.startsWith("m-")) {
			const n = Number.parseInt(mId.substr(2));
			const thumbFile = fUtil.getFileIndex("thumb-", ".png", n);
      const largeThumb = fUtil.getFileIndex("movie-", ".png", n);
			fs.writeFileSync(thumbFile, thumb);
      fs.writeFileSync(largeThumb, large);
		}

		return new Promise(async (res, rej) => {
			var i = mId.indexOf("-");
			var prefix = mId.substr(0, i);
			var suffix = mId.substr(i + 1);
			switch (prefix) {
				case "m": {
					var path = p("movie", "xml", suffix);
          await parse.unpackSingle(movieZip, path, thumb, large);
          fs.writeFileSync(p("user", "json", suffix), JSON.stringify(user));
          res(mId);
          break;
				}
			}
		});
	},
  getStockThumb(tray) {
    return new Promise((res, rej) => {
      get(`https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/${tray}.jpg`).then(buffer => {
        res(buffer)
      }).catch(e => {
        get(`https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/${tray}.png`).then(buff => {
          res(buff)
        }).catch(e => rej(e));
      });
    });
  },
	async loadZip(mId) {
    const [ prefix, suffix ] = mId.split("-");
    var filepath, thumbpath;
    switch (prefix) {
      case "m": {
        filepath = fUtil.getFileIndex("movie-", ".xml", suffix);
        thumbpath = fUtil.getFileIndex("thumb-", ".png", suffix);
        largepath = fUtil.getFileIndex("movie-", ".png", suffix);
        break;
      }
    }
    return await parse.pack(fs.readFileSync(filepath), fs.readFileSync(thumbpath), fs.existsSync(largepath) ? fs.readFileSync(largepath) : false);
	},
	loadXml(movieId) {
		return new Promise(async (res, rej) => {
			const i = movieId.indexOf("-");
			const prefix = movieId.substr(0, i);
			const suffix = movieId.substr(i + 1);
			switch (prefix) {
				case "m": {
					const fn = fUtil.getFileIndex("movie-", ".xml", suffix);
					if (fs.existsSync(fn)) res(fs.readFileSync(fn));
					else rej();
					break;
				}
				default:
					rej();
			}
		});
	},
	loadThumb(movieId, large = false) {
		return new Promise((res, rej) => {
      try {
        const n = Number.parseInt(movieId.substr(2));
        var fn;
        if (large) fn = fUtil.getFileIndex("movie-", ".png", n);
        else fn = fUtil.getFileIndex("thumb-", ".png", n);
        res(fs.readFileSync(fn));
      } catch (e) {
        rej(e);
      }
		});
	},
  list(u = false) {
    if (!u) {
      const array = [];
      const last = fUtil.getLastFileIndex("movie-", ".xml");
      for (let c = last; c >= 0; c--) {
        const movie = fs.existsSync(fUtil.getFileIndex("movie-", ".xml", c));
        const thumb = fs.existsSync(fUtil.getFileIndex("thumb-", ".png", c));
        if (movie && thumb) array.push(`m-${c}`);
      }
      return array;
    } else {
      const array = [];
      const user = ur(u);
      const id = fUtil.getValidFileIndicies("movie-", ".xml");
      for (const ids of id) {
        const uJson = fUtil.getFileIndex("user-", ".json", ids);
        const usr = require('.' + uJson);
        const movie = fs.existsSync(fUtil.getFileIndex("movie-", ".xml", ids));
        const thumb = fs.existsSync(fUtil.getFileIndex("thumb-", ".png", ids));
        if (movie && thumb && usr.name == user) array.push(`m-${ids}`);
      }
      return array;
    }
	},
  async listStaffMovies() {
    const array = [];
    const id = fUtil.getValidFileIndicies("movie-", ".xml");
    for (const ids of id) {
      const movie = fs.existsSync(fUtil.getFileIndex("movie-", ".xml", ids));
      const thumb = fs.existsSync(fUtil.getFileIndex("thumb-", ".png", ids));
      const info = await this.meta(`m-${ids}`);
      if (movie && thumb && !info.user.name.startsWith("Guest") && !info.user.roles) array.push(info);
    }
    return array;
  },
  async listGuestMovies() {
    const array = [];
    const id = fUtil.getValidFileIndicies("movie-", ".xml");
    for (const ids of id) {
      const movie = fs.existsSync(fUtil.getFileIndex("movie-", ".xml", ids));
      const thumb = fs.existsSync(fUtil.getFileIndex("thumb-", ".png", ids));
      const info = await this.meta(`m-${ids}`);
      if (movie && thumb && info.user.name.startsWith("Guest")) array.push(info);
    }
    return array;
  },
	meta(movieId) {
		return new Promise(async (res, rej) => {
      try {
        const [ prefix, suffix ] = movieId.split("-");
        const fn = p("movie", "xml", suffix);
        const user = require('.' + p("user", "json", suffix));
        const buffer = fs.readFileSync(fn);
        const begTitle = buffer.indexOf("<title>") + 16;
        const endTitle = buffer.indexOf("]]></title>");
        const title = buffer.slice(begTitle, endTitle).toString();
        const begTag = buffer.indexOf("<tag>") + 14;
        const endTag = buffer.indexOf("]]></tag>");
        const tag = buffer.slice(begTag, endTag).toString();
        const begPublish = buffer.indexOf('published="') + 11;
        const endPublish = buffer.indexOf('"', begPublish);
        const published = Number.parseFloat(buffer.slice(begPublish, endPublish).toString());
        const begPshare = buffer.indexOf('pshare="') + 8;
        const endPshare = buffer.indexOf('"', begPshare);
        const pshare = Number.parseFloat(buffer.slice(begPshare, endPshare).toString());
        const begDuration = buffer.indexOf('duration="') + 10;
        const endDuration = buffer.indexOf('"', begDuration);
        const duration = Number.parseFloat(buffer.slice(begDuration, endDuration));
        const min = ("" + ~~(duration / 60)).padStart(2, "0");
        const sec = ("" + ~~(duration % 60)).padStart(2, "0");
        const durationStr = `${min}:${sec}`;
        var draft = false; 
        var private = false;
        if (published == "0") draft = true;
        if (pshare == "1") {
          private = true;
          draft = false;
        }
        res({
          date: fs.statSync(fn).mtime,
          durationString: durationStr,
          title: title || "Untitled Video",
          id: movieId,
          tag: tag || "none",
          hidden: fs.existsSync(p("hidden-movie", "txt", suffix)),
          draft: draft,
          published: published,
          pShared: pshare,
          private: private,
          user
        });
      } catch (e) {
        rej(e);
      }
		});
	},
};
