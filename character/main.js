const baseUrl = process.env.CHAR_BASE_URL;
const fUtil = require("../misc/file");
const get = require("../misc/get");
const fs = require("fs");
const themes = {};

function generateId() {
  return Math.random().toString(16).substring(2, 9);
}

function addTheme(id, buffer) {
	const beg = buffer.indexOf(`theme_id="`) + 10;
	const end = buffer.indexOf(`"`, beg);
	const theme = buffer.subarray(beg, end).toString();
	return (themes[id] = theme);
}

module.exports = {
	/**
	 * @param {string} id
	 * @returns {Promise<string>}
	 */
	getTheme(id) {
		return new Promise((res, rej) => {
			if (themes[id]) res(themes[id]);
			this.load(id).then((b) => res(addTheme(id, b))).catch(e => rej(e));
		});
	},
	/**
	 * @param {string} id
	 * @returns {Promise<Buffer>}
	 */
	load(id) {
		return new Promise((res, rej) => {
			try {
        res(fs.readFileSync(`./chars/${id}.xml`));
      } catch (e) {
        // Blank prefix is left here for backwards-compatibility purposes.
        const nId = (id.slice(0, -3) + "000").padStart(9, 0);
				get(baseUrl + `/${nId}.txt`).then(chars => {
          const line = chars.toString("utf8").split("\n").find((v) => v.substring(0, 3) == id.slice(-3));
          if (line) res(Buffer.from(line.substring(3)));
        });
			}
		});
	},
	/**
	 * @param {Buffer} data
	 * @param {string} id
	 * @returns {Promise<string>}
	 */
	save(data, id) {
		return new Promise((res, rej) => {
			if (id) {
        fs.writeFileSync(`./chars/${id}.xml`, data);
        res(id);
      } else {
        const newId = generateId();
        fs.writeFileSync(`./chars/${newId}.xml`, data);
        res(newId);
      }
		});
	},
	/**
	 * @param {Buffer} data
	 * @param {string} id
	 * @returns {Promise<string>}
	 */
	saveThumb(data, id) {
    fs.writeFileSync(`./chars/${id}.png`, data);
	},
  saveHead(data, id) {
    fs.writeFileSync(`./heads/${id}.png`, data);
	},
	/**
	 * @param {string} id
	 * @returns {Promise<Buffer>}
	 */
	loadThumb(id) {
		return new Promise((res, rej) => {
			res(fs.readFileSync(`./chars/${id}.png`));
		});
	},
  loadHead(id) {
		return new Promise((res, rej) => {
			res(fs.readFileSync(`./heads/${id}.png`));
		});
	},
};
