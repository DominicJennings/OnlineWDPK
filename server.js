const env = Object.assign(process.env, require("./env"), require("./config"));
const { getUserInfo } = require("@replit/repl-auth");
const fs = require('fs');
const loadPost = require('./misc/post_body');
const asset = require('./asset/main');
const http = require("http");
const wve = require("./waveform");
const chr = require("./character/redirect");
const pmc = require("./character/premade");
const chl = require("./character/load");
const chs = require("./character/save");
const cht = require("./character/thmb");
const mvu = require("./movie/upload");
const qkv = require("./movie/redirect");
const asu = require("./asset/upload");
const stl = require("./static/load");
const stp = require("./static/page");
const asl = require("./asset/load");
const asL = require("./asset/list");
const ast = require("./asset/thmb");
const mvl = require("./movie/load");
const mvL = require("./movie/list");
const mvm = require("./movie/meta");
const mvs = require("./movie/save");
const mvt = require("./movie/thmb");
const thL = require("./theme/list");
const thl = require("./theme/load");
const tsv = require("./tts/voices");
const tsl = require("./tts/load");
const url = require("url");

const functions = [mvL, qkv, wve, pmc, asl, chl, thl, thL, chs, cht, asL, tsl, chr, ast, mvm, mvl, mvs, mvt, tsv, asu, mvu, stp, stl];

module.exports = http.createServer((req, res) => {
  var user = getUserInfo(req);
  if (!user) {
    if (fs.existsSync(`./meta/accounts/${req.headers['x-forwarded-for']}.json`)) {
      user = require(`./meta/accounts/${req.headers['x-forwarded-for']}`);
    }
  } else if (!fs.existsSync(`./meta/accounts/${req.headers['x-forwarded-for']}.json`)) {
    // sets the user varible back to the way it was before to prevent users from opening their videolist while logged out
    user = getUserInfo(req);
  }
  const parsedUrl = url.parse(req.url, true);
  const settings = asset.settings(user ? user.id : "", req.headers['x-forwarded-for']);
	try {
		const found = functions.find((f) => f(req, res, parsedUrl, settings, user));
		if (!found) res.statusCode = 404;
    console.log(req.method, parsedUrl.path, '-', res.statusCode);
    // this is supposed to be an error handler for server.js. Please leave that alone.
	} catch (x) {
		res.statusCode = 500;
    console.log(x);
    console.log(req.method, parsedUrl.path, '-', res.statusCode);
    res.end('This website has ran into a server error. if this error keeps happening, then you can blame Revolution909 for messing up shit.');
  }
}).listen(env.PORT || env.SERVER_PORT, console.log("GoWDPK Has Started Sucessfully"));
