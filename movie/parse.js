const themeFolder = process.env.THEME_FOLDER;
const asset = require('../asset/main.js');
const char = require('../character/main');
const mp3Duration = require("mp3-duration");
const source = process.env.CLIENT_URL;
const header = process.env.XML_HEADER;
const get = require('../misc/get');
const fUtil = require("../misc/file");
const nodezip = require("node-zip");
const jszip = require("jszip");
const store = process.env.STORE_URL;
const xmldoc = require('xmldoc');
const fs = require('fs');

function name2Font(font) {
	switch (font) {
		case "Blambot Casual": return "FontFileCasual";
		case "BadaBoom BB": return "FontFileBoom";
		case "Entrails BB": return "FontFileEntrails";
		case "Tokyo Robot Intl BB": return "FontFileTokyo";
		case "Accidental Presidency": return "FontFileAccidental";
		case "BodoniXT": return "FontFileBodoniXT";
		case "Budmo Jiggler": return "FontFileBJiggler";
		case "Budmo Jigglish": return "FontFileBJigglish";
		case "Existence Light": return "FontFileExistence";
		case "HeartlandRegular": return "FontFileHeartland";
		case "Honey Script": return "FontFileHoney";
		case "I hate Comic Sans": return "FontFileIHate";
		case "Impact Label": return "FontFileImpactLabel";
		case "loco tv": return "FontFileLocotv";
		case "Mail Ray Stuff": return "FontFileMailRay";
		case "Mia\'s Scribblings ~": return "FontFileMia";
		case "Shanghai": return "FontFileShanghai";
		case "Comic Book": return "FontFileComicBook";
		case "Wood Stamp": return "FontFileWoodStamp";
		case "Brawler": return "FontFileBrawler";
		case "Coming Soon": return "FontFileCSoon";
		case "Glegoo": return "FontFileGlegoo";
		case "Lilita One": return "FontFileLOne";
		case "Telex Regular": return "FontFileTelex";
		case "Claire Hand": return "FontFileClaireHand";
		case "Oswald": return "FontFileOswald";
		case "Poiret One": return "FontFilePoiretOne";
		case "Raleway": return "FontFileRaleway";
		case "Bangers": return "FontFileBangers";
		case "Creepster": return "FontFileCreepster";
		case "BlackoutMidnight": return "FontFileBlackoutMidnight";
		case "BlackoutSunrise": return "FontFileBlackoutSunrise";
		case "Junction": return "FontFileJunction";
		case "LeagueGothic": return "FontFileLeagueGothic";
		case "LeagueSpartan": return "FontFileLeagueSpartan";
		case "OstrichSansMedium": return "FontFileOstrichSansMedium";
		case "Prociono": return "FontFileProciono";
		case "Lato": return "FontFileLato";
		case "Alegreya Sans SC": return "FontFileAlegreyaSansSC";
		case "Barrio": return "FontFileBarrio";
		case "Bungee Inline": return "FontFileBungeeInline";
		case "Bungee Shade": return "FontFileBungeeShade";
		case "Gochi Hand": return "FontFileGochiHand";
		case "IM Fell English SC": return "FontFileIMFellEnglishSC";
		case "Josefin": return "FontFileJosefin";
		case "Kaushan": return "FontFileKaushan";
		case "Lobster": return "FontFileLobster";
		case "Montserrat": return "FontFileMontserrat";
		case "Mouse Memoirs": return "FontFileMouseMemoirs";
		case "Patrick Hand": return "FontFilePatrickHand";
		case "Permanent Marker": return "FontFilePermanentMarker";
		case "Satisfy": return "FontFileSatisfy";
		case "Sriracha": return "FontFileSriracha";
		case "Teko": return "FontFileTeko";
		case "Vidaloka": return "FontFileVidaloka";
		case '': return '';
		case null: return '';
		default: return `FontFile${font}`;
	}
}
function buffer2Duration(buffer) {
  mp3Duration(buffer, (e, d) => {
    if (e) {
      console.log(e);
      return null;
    } else return d * 1e3;
  });
}
function stream2Buffer(readStream) {
	return new Promise((res, rej) => {
		let buffers = [];
		readStream.on("data", (c) => buffers.push(c));
		readStream.on("end", () => res(Buffer.concat(buffers)));
	});
}
module.exports = {
	/**
	 * @summary Parses a movie using jszip
	 * @param {Buffer} xmlBuffer 
	 * @param {string} mId
	 * @returns {Promise<Buffer>}
	 */
	async pack(xmlBuffer, thumbBuffer, largeBuffer) {
    if (xmlBuffer.length == 0) throw null;
		var zip = nodezip.create();
		var themes = { common: true };
		var ugcString = `${header}<theme id="ugc" name="ugc">`;

		fUtil.addToZip(zip, "movie.xml", xmlBuffer);
		var xml = new xmldoc.XmlDocument(xmlBuffer);

		var elements = xml.children;
		for (var eK in elements) {
			var element = elements[eK];
			switch (element.name) {

				case "sound": {
					const file = element.childNamed("sfile").val;
          const pieces = file.split(".");
          const themeId = pieces[0];
	
          // add the extension to the last key
          const ext = pieces.pop();
          pieces[pieces.length - 1] += "." + ext;
          // add the type to the filename
          pieces.splice(1, 0, pieces.name);
	
          const filename = pieces.join(".");
          if (themeId == "ugc") {
            const id = pieces[2];
            try {
              const [ string, f ] = id.split("-");
              const [ subtype, ext ] = f.split(".");
              const buffer = fs.readFileSync(`./sounds/${id}`);
              // add asset meta
					    ugcString += `<sound subtype="${subtype}" id="${id}" enc_asset_id="${id}" name="${fs.readFileSync(`./meta/sound/titles/${id.slice(0, -4)}.txt`, 'utf8')}" enable="Y" duration="${buffer2Duration(buffer)}" downloadtype="progressive"/>`;
					    // and add the file
					    fUtil.addToZip(zip, filename, buffer);
				    } catch (e) {
					    console.error(`WARNING: ${id}:`, e);
					    return;
				    }
			    } else {
				    const filepath = `${store}/${pieces.join("/")}`;
	
				    // add the file to the zip
				    fUtil.addToZip(zip, filename, await get(filepath));
			    }
	
			    themes[themeId] = true;
					break;
				}

				case "scene": {
					for (var pK in element.children) {
						var piece = element.children[pK];
						switch (piece.name) {
							case "durationSetting":
							case "trans":
								break;
							case "bg":
							case "effect":
							case "prop": {
								var val = piece.childNamed("file").val;
								var pieces = val.split(".");

								if (pieces[0] == "ugc") {
									const aId = pieces[2];
                  const [ id, ext ] = aId.split(".");
                  try {
                    const buffer = asset.load(id, pieces.name);
	
                    // add asset meta
                    ugcString += asset.meta2Xml(asset.meta(id, pieces.name, ext));
                    // and add the file
                    fUtil.addToZip(zip, pieces.join("."), buffer);
	
                    // add video thumbnails
                    if (type == "prop" && subtype == "video") {
                      pieces[2] = pieces[2].slice(0, -3) + "png";
                      const filename = pieces.join(".")
                      const buffer = asset.load(pieces[2], pieces.name);
                      fUtil.addToZip(zip, filename, buffer);
                    }
                  } catch (e) {
                    console.error(`WARNING: ${id}:`, e);
                    continue;
                  }
								} else {
									var ext = pieces.pop();
									pieces.splice(1, 0, piece.name);
									pieces[pieces.length - 1] += `.${ext}`;

									var fileName = pieces.join(".");
									if (!zip[fileName]) {
										var buff = await get(`${store}/${pieces.join("/")}`);
										fUtil.addToZip(zip, fileName, buff);
										themes[pieces[0]] = true;
									}
								}
								break;
							}
							case "char": {
								var val = piece.childNamed("action").val;
								var pieces = val.split(".");

								var theme, fileName, buffer;
								switch (pieces[pieces.length - 1]) {
									case "xml": {
										theme = pieces[0];
										var id = pieces[1];

										try {
											buffer = await char.load(id);
											var charTheme = await char.getTheme(id);
											fileName = `${theme}.char.${id}.xml`;
											if (theme == "ugc") ugcString += `<char id="${id}"cc_theme_id="${charTheme}"><tags/></char>`;
										} catch (e) {
											console.log(e);
										}
										break;
									}
									case "swf": {
										theme = pieces[0];
										var ch = pieces[1];
										var model = pieces[2];
										var url = `${store}/${theme}/char/${ch}/${model}.swf`;
										fileName = `${theme}.char.${ch}.${model}.swf`;
										buffer = await get(url);
										break;
									}
								}

								for (let ptK in piece.children) {
									var part = piece.children[ptK];
									if (!part.children) continue;

									var urlF, fileF;
									switch (part.name) {
										case "head":
											urlF = "char";
											fileF = "prop";
											break;
										case "prop":
											urlF = "prop";
											fileF = "prop";
											break;
										default:
											continue;
									}

									var file = part.childNamed("file");
									var slicesP = file.val.split(".");
									slicesP.pop(), slicesP.splice(1, 0, urlF);
									var urlP = `${store}/${slicesP.join("/")}.swf`;

									slicesP.splice(1, 1, fileF);
									var fileP = `${slicesP.join(".")}.swf`;
									if (!zip[fileP]) {
										fUtil.addToZip(zip, fileP, await get(urlP));
									}
								}

								if (buffer) {
									themes[theme] = true;
									fUtil.addToZip(zip, fileName, buffer);
								}
								break;
							}
							case "bubbleAsset": {
								var bubble = piece.childNamed("bubble");
								var text = bubble.childNamed("text");
								var font = `${name2Font(text.attr.font)}.swf`;
								var fontSrc = `${source}/go/font/${font}`;
								if (!zip[font]) {
									fUtil.addToZip(zip, font, await get(fontSrc));
								}
								break;
							}
						}
					}
					break;
				}
			}
		}

		if (themes.family) {
			delete themes.family;
			themes.custom = true;
		}

		if (themes.cc2) {
			delete themes.cc2;
			themes.action = true;
		}

		var themeKs = Object.keys(themes);
		themeKs.forEach((t) => {
			if (t == "ugc") return;
			var file = fs.readFileSync(`${themeFolder}/${t}.xml`);
			fUtil.addToZip(zip, `${t}.xml`, file);
		});

		fUtil.addToZip(
			zip,
			"themelist.xml",
			Buffer.from(`${header}<themes>${themeKs.map((t) => `<theme>${t}</theme>`).join("")}</themes>`)
		);
		fUtil.addToZip(zip, "ugc.xml", Buffer.from(ugcString + `</theme>`));
    if (thumbBuffer) fUtil.addToZip(zip, "thumbnail.png", thumbBuffer);
    if (largeBuffer) fUtil.addToZip(zip, "movie.png", largeBuffer);
		return await zip.zip();
	},
	/**
	 * @summary Unpacks a movie using jszip
	 * @param {{[aId:string]:Buffer}} buffers
	 * @param {Buffer} thumb
	 * @param {string} movieId
	 * @returns {Promise<Buffer>}
	 */
	async unpackSingle(movieZip, path, thumb, large) {
    try {
      const jszipInstance = new jszip();
      const result = await jszipInstance.loadAsync(movieZip);
      const keys = Object.keys(result.files);
      for (let key of keys) {
        const item = result.files[key];
        fs.writeFileSync(path, Buffer.from(await item.async("arraybuffer")) + `<thumb>${thumb}</thumb><large>${large}</large>`);
      }
    } catch (e) {
      console.log(e);
    }
	},
  /**
	 * Unpacks a movie zip containing mutiple files
	 * @param {Buffer} body 
	 * @returns {Promise<Buffer>}
	 */
	async unpackMutiple(body) {
		const zip = nodezip.unzip(body);
		const readStream = zip["movie.xml"].toReadStream();
		const buffer = await stream2Buffer(readStream);
    if (!zip["thumbnail.png"]) {
      return {xmlBuffer: buffer, thumbBuffer: await get(process.env.THUMB_BASE_URL + `/278841975.jpg`)};
    }
		const readStream2 = zip["thumbnail.png"].toReadStream();
		let thumbBuffer = await stream2Buffer(readStream2);
    if (zip["movie.png"]) {
      const readStream3 = zip["movie.png"].toReadStream();
      let largeBuffer = await stream2Buffer(readStream3);
      return { xmlBuffer: buffer, thumbBuffer: thumbBuffer, largeBuffer: largeBuffer };
    }
    return { xmlBuffer: buffer, thumbBuffer: thumbBuffer };
	},
	/**
	 * 
	 * @param {Buffer} xml 
	 * @param {number} id 
	 */
	unpackXml(xml, id) {
    try {
		  const thumbBeg = xml.lastIndexOf('<thumb>');
		  const thumbEnd = xml.lastIndexOf('</thumb>');
      const largeBeg = xml.lastIndexOf('<thumb>');
		  const largeEnd = xml.lastIndexOf('</thumb>');
		  if (thumbBeg > -1 && thumbEnd > -1) {
			  const sub = Buffer.from(xml.subarray(thumbBeg + 7, thumbEnd).toString(), 'base64');
			  fs.writeFileSync(fUtil.getFileIndex('thumb-', '.png', id), sub);
		  }
      if (largeBeg > -1 && largeEnd > -1) {
			  const sub = Buffer.from(xml.subarray(largeBeg + 7, largeEnd).toString(), 'base64');
			  fs.writeFileSync(fUtil.getFileIndex('movie-', '.png', id), sub);
		  }
		  fs.writeFileSync(fUtil.getFileIndex('movie-', '.xml', id), xml);
    } catch (e) {
      console.log(e);
    }
	},
	unpackCharXml(xml, id) {
		fs.writeFileSync(fUtil.getFileIndex('char-', '.xml', id), xml);
	},
}