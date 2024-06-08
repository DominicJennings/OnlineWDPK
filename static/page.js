const fUtil = require("../misc/file");
const fs = require('fs');
const { meta } = require("../movie/main");
const asset = require("../asset/main");
function toAttrString(table) {
  return typeof table == "object"
    ? Object.keys(table)
      .filter((key) => table[key] !== null)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`)
      .join("&")
    : table.replace(/"/g, '\\"');
}
function toParamString(table) {
  return Object.keys(table)
    .map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`)
    .join(" ");
}
function toObjectString(attrs, params) {
  return `<object id="obj" ${Object.keys(attrs)
    .map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`)
    .join(" ")}>${toParamString(params)}</object>`;
}
function getHtml(chars) {
  for (const table of chars) {
    return table.html;
  }
}
/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function(req, res, url, settings, user) {
  if (req.method != "GET") return;
  const query = url.query;
  var attrs, params, title;
  let presave = query.movieId && query.movieId.startsWith("m") ? query.movieId : `m-${fUtil.getNextFileId("movie-", ".xml")}`;
  switch (url.pathname) {
    // the webpages themselves
    case "/cc": {
      title = "Character Creator";
      attrs = {
        data: process.env.SWF_URL + "/cc.swf", // data: 'cc.swf',
        type: "application/x-shockwave-flash",
        id: "char_creator",
        width: "100%",
        height: "100%",
      };
      params = {
        flashvars: {
          apiserver: "/",
          storePath: process.env.STORE_URL + "/<store>",
          clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
          original_asset_id: query["id"] || null,
          themeId: "family",
          ut: 60,
          bs: "default",
          appCode: "go",
          page: "",
          siteId: "go",
          m_mode: "school",
          isLogin: "Y",
          isEmbed: 1,
          ctc: "go",
          tlang: "en_US",
          userId: 2152"
        },
        allowScriptAccess: "always",
        movie: process.env.SWF_URL + "/cc.swf", // 'http://localhost/cc.swf'
      };
      break;
    }

    case "/cc_browser": {
      title = "CC Browser";
      attrs = {
        data: process.env.SWF_URL + "/cc_browser.swf", // data: 'cc_browser.swf',
        type: "application/x-shockwave-flash",
        id: "char_creator",
        width: "100%",
        height: "100%",
      };
      params = {
        flashvars: {
          apiserver: "/",
          storePath: process.env.STORE_URL + "/<store>",
          clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
          original_asset_id: query["id"] || null,
          themeId: "family",
          ut: 60,
          appCode: "go",
          page: "",
          siteId: "go",
          m_mode: "school",
          isLogin: "Y",
          isEmbed: 1,
          ctc: "go",
          tlang: "en_US",
          lid: 13,
          userId: 2152"
        },
        allowScriptAccess: "always",
        movie: process.env.SWF_URL + "/cc_browser.swf", // 'http://localhost/cc_browser.swf'
      };
      break;
    }
    case "/videomaker/quickvideo/everydaylife": {
      asset.chars("family").then(crs => {
        let table = [];
        for (const chars of crs) {
          if (chars.id != 'c-0' && chars.id != 'c-1') table.push(`<div class="item" data-cid="${chars.id}" data-name="Untitled" data-voice="joey" data-thumb="/char_heads/${chars.id}.png"><span><img src="/char_thumbs/${chars.id}.png" alt=""></span></div>`);
        }
        res.end(`<html><head><meta charset="utf-8">
<title>Comedy World Template | Slices of Daily Life | GoAnimate for Schools</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<meta name="description" content="With GoAnimate Quick App you can make your own video with just a few clicks and some typing on your keyboard. It's dead simple and fun!">

<meta name="google-site-verification" content="K_niiTfCVi72gwvxK00O4NjsVybMutMUnc-ZnN6HUuA">
<link href="/quickvideo/files/school/css/buttons.css.gz.css" rel="stylesheet" type="text/css">
<link href="/quickvideo/files/school/css/script2cartoon/everydaylife.css.gz.css" rel="stylesheet" type="text/css">
<link href="/quickvideo/files/school/css/script2cartoon/school_golite.css.gz.css" rel="stylesheet" type="text/css">
<link href="/quickvideo/files/go/css/script2cartoon/voiceselectionwidget.css.gz.css" rel="stylesheet" type="text/css">
<link href="/quickvideo/font.css" rel="stylesheet" type="text/css">
<!--[if lt IE 9]>
<link href="/quickvideo/files/go/css/script2cartoon/ie.css.gz.css" rel="stylesheet" type="text/css">
<![endif]-->

<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery-1.4.4.min.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery.blockUI.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery.scrollTo.min.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery.jplayer.min.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery.tmpl.min.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/school/js/lite.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/voiceselectionwidget.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/Gettext.js.gz.js"></script>
<script type="text/javascript" src="/goserver.json"></script>
<script type="text/javascript">
var srv_tz_os = -4;
var view_name = "school";
var user_cookie_name = "u_info";
var golite_theme = "everydaylife";
var publish_setting = 'private';

var I18N_LANG = 'en_US';
var GT = new Gettext({'locale_data': json_locale_data});
</script>
</head>
<body id="school">
<script type="text/javascript">
GoLite.settings.player = {
    swf: "https://josephanimate2021.github.io/animation/cce25167cb1d3404/player.swf",
    height: 384,
    width: 550
}
GoLite.settings.thumbnailChooser = {
    swf: "https://josephanimate2021.github.io/animation/cce25167cb1d3404/thumbnailChooser.swf",
    height: 170,
    width: 295
}

VoiceRecorder.defaultSettings.swf = "/quickvideo/files/go/img/script2cartoon/common/dialog/MyMicRecorder.swf";
jQuery.extend(VoiceRecorder.defaultSettings.flashvars, {
    apiserver: "/",
    clientThemePath: "/quickvideo/files/static/<client_theme>",
    u_info_school: "OjI6eThLWkNlQzFaNm12ekJUdUNrNmpSQURJdDltalRQWmhrdDlnWE5xVklubXVXejJGblhMQjZOTm1vbGVUNzlhYW5yblAwOFR0Yjk0WUZ0NUFaOWhBUE9hVE4wdWE4cGhNck9BQXB3bTMrVGV6MDVOK3hkd1ZjPQ=="
});

// scroll to target step
function stepTo(step) {
    var settings = {
        duration: 1500,
        offset: {top: 10}
    };
    // auto focus dialog input
    if (step == '#step3') {
        settings.onAfter = function() { jQuery('#dialogs .focus .dialog_input').focus(); };
    }
    jQuery.scrollTo(step, settings);
}
</script>
<div id="bg"></div>
<div id="container">
<div id="nav_links" style="display: block;">
    <div class="inside">
        <ul>
            <li class="home" title="Back to Home"><a href="/create" onclick="return confirm('You will lose your work if you leave this page. Are you sure?');">Home</a></li>
            <li class="seperate">&nbsp;</li>
            <li class="intro"><a onclick="stepTo('#intro')">0</a></li>
            <li class="step1"><a onclick="stepTo('#step1');">1</a></li>
            <li class="step2"><a onclick="stepTo('#step2');">2</a></li>
            <li class="step3 on"><a onclick="stepTo('#step3');">3</a></li>
            <li class="step4"><a onclick="GoLite.preview();stepTo('#step4');">4</a></li>
            <li class="seperate">&nbsp;</li>
            <li class="next" title="Next step"><a>Next</a></li>
            <li class="prev" title="Previous step"><a>Previous</a></li>
        </ul>
        <div class="clear"></div>
    </div>
</div>


<div id="intro" class="section">
    <div class="inside">
        <h1 class="hide">Slices of Daily Life</h1>
        <p>GoAnimate brings you a collection of scenes from daily life for you to re-enact and make up comical, satirical or even dramatic stories.</p>
        <p>The drill? 1. Select a template / 2. Choose characters / 3. Pull a script out of your best life observations / 4. Watch your masterpiece!</p>
    </div>

    <a class="btn_next" href="#step1" onclick="stepTo('#step1'); return false;">Next</a>
</div>

<div id="seperator0"></div>

<div id="step1" class="section">
    <h2>1. Choose a Setting</h2>

    <a class="previous_step" href="#intro" onclick="stepTo('#intro'); return false;">Back</a>

    <div class="inside">
        <div id="template_name">A Scary Occurence In The Forest</div>
        <div id="template_desc">One of your characters is walking in the forest until all of the sudden it gets scared by your other character. how will they do? change the dialogs in the characters to find out.</div>
        <div id="template_name">Shoppin n' Payin'
        </div>
        <div id="template_desc">Your characters go into a shop to buy some clothes, will they argue, or become friends? You decide!</div>
        <div id="templates" class="item_selector">
            <a class="select_button prev" href="#">&lt;</a>
            <div class="items">Scene Selections are currently in beta right now.</div>
            <a class="select_button next" href="#">&gt;</a>
        </div>
    </div>

    <a class="btn_next" href="#step2" onclick="stepTo('#step2'); return false;">Next</a>
    <div class="upgrade" style="display: none;">
        <a href="javascript:popUpgrade();" class="buttonbase buttonblue dark" style="margin:0 auto;float:none;display:block;">
<div class="buttontitle">Upgrade Now</div>
</a>
    </div>
</div>

<div id="seperator1"></div>

<div id="step2" class="section">
    <h2>2. Select Your Actors</h2>

    <a class="previous_step" href="#step1" onclick="stepTo('#step1'); return false;">Back</a>

    	<div class="inside">
		<div class="character">
			<div id="character1_title" class="title"><img src="/quickvideo/files/go/img/script2cartoon/everydaylife/step02/thumbs/bg03_a.jpg" alt=""></div>
			<div id="character1" class="item_selector character_selector">
				<a class="select_button prev" href="#">&lt;</a>
				<div class="items" id="chars">
					<div class="item selected" data-cid="c-0" data-name="Untitled" data-voice="joey" data-thumb="/char_heads/c-0.png"><span><img src="/char_thumbs/c-0.png" alt=""></span></div>
					<div class="item" data-cid="c-1" data-name="Untitled" data-voice="joey" data-thumb="/char_heads/c-1.png"><span><img src="/char_thumbs/c-1.png" alt=""></span></div>
          ${table}
				</div>
				<a class="select_button next" href="#">&gt;</a>
			</div>
			<div class="name"></div>
		</div>

		<div class="character">
			<div id="character2_title" class="title"><img src="/quickvideo/files/go/img/script2cartoon/everydaylife/step02/thumbs/bg03_b.jpg" alt=""></div>
			<div id="character2" class="item_selector character_selector">
				<a class="select_button prev" href="#">&lt;</a>
				<div class="items" id="chars2">
					<div class="item" data-cid="c-0" data-name="Untitled" data-voice="joey" data-thumb="/char_heads/c-0.png"><span><img src="/char_thumbs/c-0.png" alt=""></span></div>
					<div class="item selected" data-cid="c-1" data-name="Untitled" data-voice="joey" data-thumb="/char_heads/c-1.png"><span><img src="/char_thumbs/c-1.png" alt=""></span></div>
          ${table}
				</div>
				<a class="select_button next" href="#">&gt;</a>
			</div>
			<div class="name"></div>
			<div class="customlink">
				<a class="isplus" href="javascript:GoLite.showSelectCCOverlay(1)">Use your own character</a>
				<a class="isbasic" href="javascript:customCharSignup()">Use your own character (GoPlus only)</a>
			</div>
		</div>
	</div>


    <div class="snippets" style="display: none">
        <strong class="plus-char-txt">GoPlus Character</strong>
        <div class="plus-cover"><div><strong>GoPlus Template</strong> Upgrade to GoPlus to go to the next step.</div></div>
        <div class="item" data-cid="" data-name="" data-voice="amy" data-thumb=""><span><img alt=""></span></div>
        <div class="selectccoverlay lightbox" style="display:none">
    <div class="lightbox_wrapper">
        <h2>1. Select your character:</h2>

<style type="text/css">
.selectccoverlay h2 { margin-left: 66px; margin-bottom: 0em; font-size: 18px; }
.selectccoverlay .ccbrowsercontainer { width: 545px; height: 210px; padding: 5px 0px; margin-left: 33px; }
.selectccoverlay .voiceselectorwidget { margin-left: 92px; }
.selectccoverlay .ccbrowsercontainer .leftarrow, .rightarrow { position: relative; margin-left: auto; margin-right: auto; top: 72px; width: 11px; height: 28px; }
.selectccoverlay .ccbrowsercontainer .leftarrow { background: url('/quickvideo/files/go/img/script2cartoon/voiceselectionwidget/btn_arrow_l.png') no-repeat 0px 0px; cursor: pointer; }
.selectccoverlay .ccbrowsercontainer .disabled .leftarrow { background: none; cursor: default; }
.selectccoverlay .ccbrowsercontainer .disabled .leftarrow:hover { background: none; cursor: default; }
.selectccoverlay .ccbrowsercontainer .leftarrow:hover { background: url('/quickvideo/files/go/img/script2cartoon/voiceselectionwidget/btn_arrow_l.png') no-repeat 0px -28px; }
.selectccoverlay .ccbrowsercontainer .rightarrow { background: url('/quickvideo/files/go/img/script2cartoon/voiceselectionwidget/btn_arrow_r.png') no-repeat 0px 0px; cursor: pointer; }
.selectccoverlay .ccbrowsercontainer .disabled .rightarrow { background: none; cursor: default; }
.selectccoverlay .ccbrowsercontainer .disabled .rightarrow:hover { background: none; cursor: default; }
.selectccoverlay .ccbrowsercontainer .rightarrow:hover { background: url('/quickvideo/files/go/img/script2cartoon/voiceselectionwidget/btn_arrow_r.png') no-repeat 0px -28px; }
.selectccoverlay .ccbrowsercontainer .leftarrowcontainer { float: left; height: 175px; width: 25px; margin-right: 10px; }
.selectccoverlay .ccbrowsercontainer .rightarrowcontainer { float: right; height: 175px; width: 25px; margin-left: 5px; }
.selectccoverlay .ccbrowsercontainer .selectedcc { border-width: 3px; border-style: solid; border-color: #999999 !important; }
.selectccoverlay .ccbrowsercontainer .cc { overflow: hidden; position: relative; border-radius: 5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; background-color: #dddddd; width: 85px; height: 85px; float: left; margin-right: 5px; margin-bottom: 5px; border-width: 3px; border-color: #dddddd; border-style: solid; }
.selectccoverlay .ccbrowsercontainer .cc.enabled { cursor: pointer; }
.selectccoverlay .ccbrowsercontainer .cc.enabled:hover { background-color: #eeeeee; border-color: #eeeeee; }
.selectccoverlay .ccbrowsercontainer .cc img { position: absolute; }
.selectccoverlay .pagenumdisplay { text-align: center; margin-bottom: 1em; clear: both; font-size: 14px; font-weight: bold; color: #aaaaaa; }
.selectccoverlay a.bottomcancel { float: left; text-align: center; margin: 30px auto; display: block; color: #666666; font-size: 16px; font-weight: bold; text-decoration: none; }
.selectccoverlay a.bottomcancel:hover { color: #777777; text-decoration: none; }
</style>

        <div class="ccbrowsercontainer">
            <div class="leftarrowcontainer"><div class="leftarrow"></div></div>
            <div class="rightarrowcontainer"><div class="rightarrow"></div></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="cc"></div>
            <div class="pagenumdisplay"></div>
        </div>

        <h2>2. Select a voice for your character:</h2>
        		<script type="text/javascript">
var VoiceCatalog = (function() {
    var lang_model = {"en":{"desc":"English","options":[{"id":"joey","desc":"Joey","vendor":"Polly","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_joey.mp3","lang":"en","country":"US","plus":false},{"id":"kendra","desc":"Kendra","vendor":"Polly","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_kendra.mp3","lang":"en","country":"US","plus":false},{"id":"kimberly","desc":"Kimberly","vendor":"Polly","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_kimberly.mp3","lang":"en","country":"US","plus":false},{"id":"salli","desc":"Salli","vendor":"Polly","sex":"F","demo":"","lang":"en","country":"US","plus":false},{"id":"ivy","desc":"Ivy","vendor":"Polly","sex":"F","demo":"","lang":"en","country":"US","plus":false},{"id":"amy","desc":"Amy","vendor":"Polly","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_amy.mp3","lang":"en","country":"GB","plus":false},{"id":"brian","desc":"Brian","vendor":"Polly","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_brian.mp3","lang":"en","country":"GB","plus":false},{"id":"emma","desc":"Emma","vendor":"Polly","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_emma.mp3","lang":"en","country":"GB","plus":false},{"id":"joanna","desc":"Joanna","vendor":"Polly","sex":"F","demo":"","lang":"en","country":"US","plus":false},{"id":"justin","desc":"Justin","vendor":"Polly","sex":"M","demo":"","lang":"en","country":"US","plus":false},{"id":"russell","desc":"Russell","vendor":"Polly","sex":"M","demo":"","lang":"en","country":"AU","plus":false},{"id":"nicole","desc":"Nicole","vendor":"Polly","sex":"F","demo":"","lang":"en","country":"AU","plus":false},{"id":"geraint","desc":"Geraint","vendor":"Polly","sex":"M","demo":"","lang":"en","country":"GB","plus":false},{"id":"raveena","desc":"Raveena","vendor":"Polly","sex":"F","demo":"","lang":"en","country":"IN","plus":false},{"id":"oc_allison","desc":"Allison","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_allison.mp3","lang":"en","country":"US","plus":false},{"id":"oc_ashley","desc":"Ashley","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_ashley.mp3","lang":"en","country":"US","plus":false},{"id":"oc_dave","desc":"Dave","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_dave.mp3","lang":"en","country":"US","plus":false},{"id":"oc_james","desc":"James","vendor":"Oddcast","sex":"M","demo":"","lang":"en","country":"US","plus":false},{"id":"oc_jill","desc":"Jill","vendor":"Oddcast","sex":"F","demo":"","lang":"en","country":"US","plus":false},{"id":"oc_julie","desc":"Julie","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_julie.mp3","lang":"en","country":"US","plus":false},{"id":"oc_kate","desc":"Kate","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_kate.mp3","lang":"en","country":"US","plus":false},{"id":"oc_paul","desc":"Paul","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_paul.mp3","lang":"en","country":"US","plus":false},{"id":"oc_samantha","desc":"Samantha","vendor":"Oddcast","sex":"F","demo":"","lang":"en","country":"US","plus":false},{"id":"oc_steven","desc":"Steven","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_steven.mp3","lang":"en","country":"US","plus":false},{"id":"oc_susan","desc":"Susan","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_susan.mp3","lang":"en","country":"US","plus":false},{"id":"oc_tom","desc":"Tom","vendor":"Oddcast","sex":"M","demo":"","lang":"en","country":"US","plus":false},{"id":"oc_bridget","desc":"Bridget","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_bridget.mp3","lang":"en","country":"GB","plus":false},{"id":"oc_catherine","desc":"Catherine","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_catherine.mp3","lang":"en","country":"GB","plus":false},{"id":"oc_daniel","desc":"Daniel","vendor":"Oddcast","sex":"M","demo":"","lang":"en","country":"GB","plus":false},{"id":"oc_elizabeth","desc":"Elizabeth","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_elizabeth.mp3","lang":"en","country":"GB","plus":false},{"id":"oc_fiona","desc":"Fiona (Scottish)","vendor":"Oddcast","sex":"F","demo":"","lang":"en","country":"GB","plus":false},{"id":"oc_hugh","desc":"Hugh","vendor":"Oddcast","sex":"M","demo":"","lang":"en","country":"GB","plus":false},{"id":"oc_serena","desc":"Serena","vendor":"Oddcast","sex":"F","demo":"","lang":"en","country":"GB","plus":false},{"id":"oc_simon","desc":"Simon","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_simon.mp3","lang":"en","country":"GB","plus":false},{"id":"oc_alan","desc":"Alan","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_alan.mp3","lang":"en","country":"AU","plus":false},{"id":"oc_grace","desc":"Grace","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_grace.mp3","lang":"en","country":"AU","plus":false},{"id":"oc_karen","desc":"Karen","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_karen.mp3","lang":"en","country":"AU","plus":false},{"id":"oc_lee","desc":"Lee","vendor":"Oddcast","sex":"M","demo":"","lang":"en","country":"AU","plus":false},{"id":"oc_moira","desc":"Moira","vendor":"Oddcast","sex":"F","demo":"","lang":"en","country":"IE","plus":false},{"id":"oc_tessa","desc":"Tessa","vendor":"Oddcast","sex":"F","demo":"","lang":"en","country":"ZA","plus":false},{"id":"oc_sangeeta","desc":"Sangeeta","vendor":"Oddcast","sex":"F","demo":"","lang":"en","country":"IN","plus":false},{"id":"oc_veena","desc":"Veena","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_veena.mp3","lang":"en","country":"IN","plus":false}]},"es":{"desc":"Spanish","options":[{"id":"miguel","desc":"Miguel","vendor":"Polly","sex":"M","demo":"\/quickvideo\/files/go\/voicedemo\/voicedemo_miguel.mp3","lang":"es","country":"US","plus":false},{"id":"penelope","desc":"Pen\u00e9lope","vendor":"Polly","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_penelope.mp3","lang":"es","country":"US","plus":false},{"id":"enrique","desc":"Enrique","vendor":"Polly","sex":"M","demo":"","lang":"es","country":"ES","plus":false},{"id":"conchita","desc":"Conchita","vendor":"Polly","sex":"F","demo":"","lang":"es","country":"ES","plus":false},{"id":"oc_carmen","desc":"Carmen","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_carmen.mp3","lang":"es","country":"ES","plus":false},{"id":"oc_duardo","desc":"Duardo","vendor":"Oddcast","sex":"M","demo":"","lang":"es","country":"ES","plus":false},{"id":"oc_jorge","desc":"Jorge","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_jorge.mp3","lang":"es","country":"ES","plus":false},{"id":"oc_juan","desc":"Juan","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_juan.mp3","lang":"es","country":"ES","plus":false},{"id":"oc_leonor","desc":"Leonor","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_leonor.mp3","lang":"es","country":"ES","plus":false},{"id":"oc_monica","desc":"Monica","vendor":"Oddcast","sex":"F","demo":"","lang":"es","country":"ES","plus":false},{"id":"oc_violeta","desc":"Violeta","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_violeta.mp3","lang":"es","country":"ES","plus":false},{"id":"oc_ximena","desc":"Ximena","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_ximena.mp3","lang":"es","country":"ES","plus":false},{"id":"oc_carlos","desc":"Carlos","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_carlos.mp3","lang":"es","country":"US","plus":false},{"id":"oc_soledad","desc":"Soledad","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_soledad.mp3","lang":"es","country":"US","plus":false},{"id":"oc_esperanza","desc":"Esperanza","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_esperanza.mp3","lang":"es","country":"MX","plus":false},{"id":"oc_francisco","desc":"Francisco","vendor":"Oddcast","sex":"M","demo":"","lang":"es","country":"MX","plus":false},{"id":"oc_javier","desc":"Javier","vendor":"Oddcast","sex":"M","demo":"","lang":"es","country":"MX","plus":false},{"id":"oc_paulina","desc":"Paulina","vendor":"Oddcast","sex":"F","demo":"","lang":"es","country":"MX","plus":false},{"id":"oc_diego","desc":"Diego","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_diego.mp3","lang":"es","country":"AR","plus":false},{"id":"oc_francisca","desc":"Francisca","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_francisca.mp3","lang":"es","country":"CL","plus":false}]},"pt":{"desc":"Portuguese","options":[{"id":"ines","desc":"In\u00eas","vendor":"Polly","sex":"F","demo":"","lang":"pt","country":"PT","plus":false},{"id":"cristiano","desc":"Cristiano","vendor":"Polly","sex":"M","demo":"","lang":"pt","country":"PT","plus":false},{"id":"vitoria","desc":"Vit\u00f3ria","vendor":"Polly","sex":"F","demo":"","lang":"pt","country":"BR","plus":false},{"id":"ricardo","desc":"Ricardo","vendor":"Polly","sex":"M","demo":"","lang":"pt","country":"BR","plus":false},{"id":"oc_amalia","desc":"Amalia","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_amalia.mp3","lang":"pt","country":"PT","plus":false},{"id":"oc_eusebio","desc":"Eusebio","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_eusebio.mp3","lang":"pt","country":"PT","plus":false},{"id":"oc_joana","desc":"Joana","vendor":"Oddcast","sex":"F","demo":"","lang":"pt","country":"PT","plus":false},{"id":"oc_felipe","desc":"Felipe","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_felipe.mp3","lang":"pt","country":"BR","plus":false},{"id":"oc_fernanda","desc":"Fernanda","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_fernanda.mp3","lang":"pt","country":"BR","plus":false},{"id":"oc_gabriela","desc":"Gabriela","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_gabriela.mp3","lang":"pt","country":"BR","plus":false},{"id":"oc_raquel","desc":"Raquel","vendor":"Oddcast","sex":"F","demo":"","lang":"pt","country":"BR","plus":false}]},"default":{"desc":"More","options":[{"id":"mads","desc":"Mads","vendor":"Polly","sex":"M","demo":"","lang":"da","country":"DK","plus":false},{"id":"naja","desc":"Naja","vendor":"Polly","sex":"F","demo":"","lang":"da","country":"DK","plus":false},{"id":"mizuki","desc":"Mizuki","vendor":"Polly","sex":"F","demo":"","lang":"ja","country":"JP","plus":false},{"id":"filiz","desc":"Filiz","vendor":"Polly","sex":"F","demo":"","lang":"tr","country":"TR","plus":false},{"id":"astrid","desc":"Astrid","vendor":"Polly","sex":"F","demo":"","lang":"sv","country":"SE","plus":false},{"id":"maxim","desc":"Maxim","vendor":"Polly","sex":"M","demo":"","lang":"ru","country":"RU","plus":false},{"id":"tatyana","desc":"Tatyana","vendor":"Polly","sex":"F","demo":"","lang":"ru","country":"RU","plus":false},{"id":"carmen","desc":"Carmen","vendor":"Polly","sex":"F","demo":"","lang":"ro","country":"RO","plus":false},{"id":"maja","desc":"Maja","vendor":"Polly","sex":"F","demo":"","lang":"pl","country":"PL","plus":false},{"id":"jan","desc":"Jan","vendor":"Polly","sex":"M","demo":"","lang":"pl","country":"PL","plus":false},{"id":"ewa","desc":"Ewa","vendor":"Polly","sex":"F","demo":"","lang":"pl","country":"PL","plus":false},{"id":"jacek","desc":"Jacek","vendor":"Polly","sex":"M","demo":"","lang":"pl","country":"PL","plus":false},{"id":"ruben","desc":"Ruben","vendor":"Polly","sex":"M","demo":"","lang":"nl","country":"NL","plus":false},{"id":"lotte","desc":"Lotte","vendor":"Polly","sex":"F","demo":"","lang":"nl","country":"NL","plus":false},{"id":"liv","desc":"Liv","vendor":"Polly","sex":"F","demo":"","lang":"no","country":false,"plus":false},{"id":"giorgio","desc":"Giorgio","vendor":"Polly","sex":"M","demo":"","lang":"it","country":"IT","plus":false},{"id":"carla","desc":"Carla","vendor":"Polly","sex":"F","demo":"","lang":"it","country":"IT","plus":false},{"id":"karl","desc":"Karl","vendor":"Polly","sex":"M","demo":"","lang":"is","country":"IS","plus":false},{"id":"dora","desc":"D\u00f3ra","vendor":"Polly","sex":"F","demo":"","lang":"is","country":"IS","plus":false},{"id":"mathieu","desc":"Mathieu","vendor":"Polly","sex":"M","demo":"","lang":"fr","country":"FR","plus":false},{"id":"celine","desc":"C\u00e9line","vendor":"Polly","sex":"F","demo":"","lang":"fr","country":"FR","plus":false},{"id":"chantal","desc":"Chantal","vendor":"Polly","sex":"F","demo":"","lang":"fr","country":"CA","plus":false},{"id":"gwyneth","desc":"Gwyneth","vendor":"Polly","sex":"F","demo":"","lang":"cy","country":false,"plus":false},{"id":"hans","desc":"Hans","vendor":"Polly","sex":"M","demo":"","lang":"de","country":"DE","plus":false},{"id":"marlene","desc":"Marlene","vendor":"Polly","sex":"F","demo":"","lang":"de","country":"DE","plus":false},{"id":"oc_laila","desc":"Laila","vendor":"Oddcast","sex":"F","demo":"","lang":"ar","country":"SA","plus":false},{"id":"oc_maged","desc":"Maged","vendor":"Oddcast","sex":"M","demo":"","lang":"ar","country":"SA","plus":false},{"id":"oc_tarik","desc":"Tarik","vendor":"Oddcast","sex":"M","demo":"","lang":"ar","country":"SA","plus":false},{"id":"oc_empar","desc":"Empar (Valencian)","vendor":"Oddcast","sex":"F","demo":"","lang":"ca","country":false,"plus":false},{"id":"oc_jordi","desc":"Jordi","vendor":"Oddcast","sex":"M","demo":"","lang":"ca","country":false,"plus":false},{"id":"oc_montserrat","desc":"Montserrat","vendor":"Oddcast","sex":"F","demo":"","lang":"ca","country":false,"plus":false},{"id":"oc_nuria","desc":"Nuria","vendor":"Oddcast","sex":"F","demo":"","lang":"ca","country":false,"plus":false},{"id":"oc_hui","desc":"Hui","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_hui.mp3","lang":"zh","country":"CN","plus":false},{"id":"oc_liang","desc":"Liang","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_liang.mp3","lang":"zh","country":"CN","plus":false},{"id":"oc_lily","desc":"Lily","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_lily.mp3","lang":"zh","country":"CN","plus":false},{"id":"oc_linlin","desc":"Linlin","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_linlin.mp3","lang":"zh","country":"CN","plus":false},{"id":"oc_lisheng","desc":"Lisheng","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_lisheng.mp3","lang":"zh","country":"CN","plus":false},{"id":"oc_mei_ling","desc":"Mei-Ling","vendor":"Oddcast","sex":"F","demo":"","lang":"zh","country":"CN","plus":false},{"id":"oc_ting_ting","desc":"Ting-Ting","vendor":"Oddcast","sex":"F","demo":"","lang":"zh","country":"CN","plus":false},{"id":"oc_ya_ling","desc":"Ya-Ling","vendor":"Oddcast","sex":"F","demo":"","lang":"zh","country":"CN","plus":false},{"id":"oc_sin_ji","desc":"Sin-Ji (Cantonese)","vendor":"Oddcast","sex":"F","demo":"","lang":"zh","country":"CN","plus":false},{"id":"oc_zuzana","desc":"Zuzana","vendor":"Oddcast","sex":"F","demo":"","lang":"cs","country":"CZ","plus":false},{"id":"oc_frida","desc":"Frida","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_frida.mp3","lang":"da","country":"DK","plus":false},{"id":"oc_ida","desc":"Ida","vendor":"Oddcast","sex":"F","demo":"","lang":"da","country":"DK","plus":false},{"id":"oc_magnus","desc":"Magnus","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_magnus.mp3","lang":"da","country":"DK","plus":false},{"id":"oc_claire","desc":"Claire","vendor":"Oddcast","sex":"F","demo":"","lang":"nl","country":"NL","plus":false},{"id":"oc_laura","desc":"Laura","vendor":"Oddcast","sex":"F","demo":"","lang":"nl","country":"NL","plus":false},{"id":"oc_saskia","desc":"Saskia","vendor":"Oddcast","sex":"F","demo":"","lang":"nl","country":"NL","plus":false},{"id":"oc_willem","desc":"Willem","vendor":"Oddcast","sex":"M","demo":"","lang":"nl","country":"NL","plus":false},{"id":"oc_xander","desc":"Xander","vendor":"Oddcast","sex":"M","demo":"","lang":"nl","country":"NL","plus":false},{"id":"oc_ellen","desc":"Ellen (Dutch)","vendor":"Oddcast","sex":"F","demo":"","lang":"nl","country":"BE","plus":false},{"id":"oc_ludoviko","desc":"Ludoviko (Esperanto)","vendor":"Oddcast","sex":"M","demo":"","lang":"eo","country":false,"plus":false},{"id":"oc_marko","desc":"Marko","vendor":"Oddcast","sex":"M","demo":"","lang":"fi","country":"FI","plus":false},{"id":"oc_mikko","desc":"Mikko","vendor":"Oddcast","sex":"M","demo":"","lang":"fi","country":"FI","plus":false},{"id":"oc_milla","desc":"Milla","vendor":"Oddcast","sex":"F","demo":"","lang":"fi","country":"FI","plus":false},{"id":"oc_bernard","desc":"Bernard","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_bernard.mp3","lang":"fr","country":"FR","plus":false},{"id":"oc_charlotte","desc":"Charlotte","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_charlotte.mp3","lang":"fr","country":"FR","plus":false},{"id":"oc_florence","desc":"Florence","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_florence.mp3","lang":"fr","country":"FR","plus":false},{"id":"oc_jolie","desc":"Jolie","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_jolie.mp3","lang":"fr","country":"FR","plus":false},{"id":"oc_olivier","desc":"Olivier","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_olivier.mp3","lang":"fr","country":"FR","plus":false},{"id":"oc_sebastien","desc":"Sebastien","vendor":"Oddcast","sex":"M","demo":"","lang":"fr","country":"FR","plus":false},{"id":"oc_thomas","desc":"Thomas","vendor":"Oddcast","sex":"M","demo":"","lang":"fr","country":"FR","plus":false},{"id":"oc_virginie","desc":"Virginie","vendor":"Oddcast","sex":"F","demo":"","lang":"fr","country":"FR","plus":false},{"id":"oc_chloe","desc":"Chloe (French)","vendor":"Oddcast","sex":"F","demo":"","lang":"fr","country":"CA","plus":false},{"id":"oc_felix","desc":"Felix (French)","vendor":"Oddcast","sex":"M","demo":"","lang":"fr","country":"CA","plus":false},{"id":"oc_julie_fr","desc":"Julie (French)","vendor":"Oddcast","sex":"F","demo":"","lang":"fr","country":"CA","plus":false},{"id":"oc_carmela","desc":"Carmela (Galician)","vendor":"Oddcast","sex":"F","demo":"","lang":"gl","country":false,"plus":false},{"id":"oc_anna","desc":"Anna","vendor":"Oddcast","sex":"F","demo":"","lang":"de","country":"DE","plus":false},{"id":"oc_katrin","desc":"Katrin","vendor":"Oddcast","sex":"F","demo":"","lang":"de","country":"DE","plus":false},{"id":"oc_stefan","desc":"Stefan","vendor":"Oddcast","sex":"M","demo":"","lang":"de","country":"DE","plus":false},{"id":"oc_steffi","desc":"Steffi","vendor":"Oddcast","sex":"F","demo":"","lang":"de","country":"DE","plus":false},{"id":"oc_yannick","desc":"Yannick","vendor":"Oddcast","sex":"M","demo":"","lang":"de","country":"DE","plus":false},{"id":"oc_afroditi","desc":"Afroditi","vendor":"Oddcast","sex":"F","demo":"","lang":"el","country":"GR","plus":false},{"id":"oc_alexandros","desc":"Alexandros","vendor":"Oddcast","sex":"M","demo":"","lang":"el","country":"GR","plus":false},{"id":"oc_nikos","desc":"Nikos","vendor":"Oddcast","sex":"M","demo":"","lang":"el","country":"GR","plus":false},{"id":"oc_lekha","desc":"Lekha","vendor":"Oddcast","sex":"F","demo":"","lang":"hi","country":"IN","plus":false},{"id":"oc_eszter","desc":"Eszter","vendor":"Oddcast","sex":"F","demo":"","lang":"hu","country":"HU","plus":false},{"id":"oc_ragga","desc":"Ragga","vendor":"Oddcast","sex":"F","demo":"","lang":"is","country":"IS","plus":false},{"id":"oc_damayanti","desc":"Damayanti","vendor":"Oddcast","sex":"F","demo":"","lang":"id","country":"ID","plus":false},{"id":"oc_federica","desc":"Federica","vendor":"Oddcast","sex":"F","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_giulia","desc":"Giulia","vendor":"Oddcast","sex":"F","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_luca","desc":"Luca","vendor":"Oddcast","sex":"M","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_marcello","desc":"Marcello","vendor":"Oddcast","sex":"M","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_matteo","desc":"Matteo","vendor":"Oddcast","sex":"M","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_paola","desc":"Paola","vendor":"Oddcast","sex":"F","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_paolo","desc":"Paolo","vendor":"Oddcast","sex":"M","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_roberto","desc":"Roberto","vendor":"Oddcast","sex":"M","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_silvana","desc":"Silvana","vendor":"Oddcast","sex":"F","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_silvia","desc":"Silvia","vendor":"Oddcast","sex":"F","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_valentina","desc":"Valentina","vendor":"Oddcast","sex":"F","demo":"","lang":"it","country":"IT","plus":false},{"id":"oc_kyoko","desc":"Kyoko","vendor":"Oddcast","sex":"F","demo":"","lang":"ja","country":"JP","plus":false},{"id":"oc_misaki","desc":"Misaki","vendor":"Oddcast","sex":"F","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_misaki.mp3","lang":"ja","country":"JP","plus":false},{"id":"oc_show","desc":"Show","vendor":"Oddcast","sex":"M","demo":"\/quickvideo\/files\/go\/voicedemo\/voicedemo_oc_show.mp3","lang":"ja","country":"JP","plus":false},{"id":"oc_junwoo","desc":"Junwoo","vendor":"Oddcast","sex":"M","demo":"","lang":"ko","country":"KR","plus":false},{"id":"oc_narae","desc":"Narae","vendor":"Oddcast","sex":"F","demo":"","lang":"ko","country":"KR","plus":false},{"id":"oc_yumi","desc":"Yumi","vendor":"Oddcast","sex":"F","demo":"","lang":"ko","country":"KR","plus":false},{"id":"oc_henrik","desc":"Henrik","vendor":"Oddcast","sex":"M","demo":"","lang":"no","country":false,"plus":false},{"id":"oc_stine","desc":"Stine","vendor":"Oddcast","sex":"F","demo":"","lang":"no","country":false,"plus":false},{"id":"oc_vilde","desc":"Vilde","vendor":"Oddcast","sex":"F","demo":"","lang":"no","country":false,"plus":false},{"id":"oc_agata","desc":"Agata","vendor":"Oddcast","sex":"F","demo":"","lang":"pl","country":"PL","plus":false},{"id":"oc_krzysztof","desc":"Krzysztof","vendor":"Oddcast","sex":"M","demo":"","lang":"pl","country":"PL","plus":false},{"id":"oc_zosia","desc":"Zosia","vendor":"Oddcast","sex":"F","demo":"","lang":"pl","country":"PL","plus":false},{"id":"oc_ioana","desc":"Ioana","vendor":"Oddcast","sex":"F","demo":"","lang":"ro","country":"RO","plus":false},{"id":"oc_Simona","desc":"Simona","vendor":"Oddcast","sex":"F","demo":"","lang":"ro","country":"RO","plus":false},{"id":"oc_olga","desc":"Olga","vendor":"Oddcast","sex":"F","demo":"","lang":"ru","country":"RU","plus":false},{"id":"oc_milena","desc":"Milena","vendor":"Oddcast","sex":"F","demo":"","lang":"ru","country":"RU","plus":false},{"id":"oc_dmitri","desc":"Dmitri","vendor":"Oddcast","sex":"M","demo":"","lang":"ru","country":"RU","plus":false},{"id":"oc_alva","desc":"Alva","vendor":"Oddcast","sex":"M","demo":"","lang":"sv","country":"SE","plus":false},{"id":"oc_annika","desc":"Annika","vendor":"Oddcast","sex":"F","demo":"","lang":"sv","country":"SE","plus":false},{"id":"oc_oskar","desc":"Oskar","vendor":"Oddcast","sex":"M","demo":"","lang":"sv","country":"SE","plus":false},{"id":"oc_sven","desc":"Sven","vendor":"Oddcast","sex":"M","demo":"","lang":"sv","country":"SE","plus":false},{"id":"oc_narisa","desc":"Narisa","vendor":"Oddcast","sex":"F","demo":"","lang":"th","country":"TH","plus":false},{"id":"oc_aylin","desc":"Aylin","vendor":"Oddcast","sex":"F","demo":"","lang":"tr","country":"TR","plus":false},{"id":"oc_kerem","desc":"Kerem","vendor":"Oddcast","sex":"M","demo":"","lang":"tr","country":"TR","plus":false},{"id":"oc_selin","desc":"Selin","vendor":"Oddcast","sex":"F","demo":"","lang":"tr","country":"TR","plus":false},{"id":"oc_zeynep","desc":"Zeynep","vendor":"Oddcast","sex":"F","demo":"","lang":"tr","country":"TR","plus":false}]}};

    return {
        getModel: function() {
            return lang_model;
        },
        lookupVoiceInfo: function(voice_id) {
            for (var langId in lang_model) {
                var voice_count = lang_model[langId]['options'].length;
                for (var i = 0; i < voice_count; i++) {
                    if (lang_model[langId]['options'][i].id == voice_id) {
                        return {
                            desc: lang_model[langId]['options'][i].desc,
                            sex: lang_model[langId]['options'][i].sex,
                            plus: lang_model[langId]['options'][i].plus,
                            locale: { id: langId, lang: lang_model[langId]['options'][i].lang, country: lang_model[langId]['options'][i].country, desc: lang_model[langId].desc }
                        };
                    }
                }
            }
            return null;
        },
        getDefaultVoice: function() {
            for (var langId in lang_model) {
                var voice_count = lang_model[langId]['options'].length;
                for (var i = 0; i < voice_count; i++) {
                    if (typeof lang_model[langId]['options'][i].id === 'string') {
                        return lang_model[langId]['options'][i].id;
                    }
                }
            }
            return null;
        }
    };
})();
</script>
<div class="voiceselectorwidget">
    <div class="voiceselector">
    </div>
    <!-- Templates -->
    <div class="templates" style="display: none">
        <!-- Voice list -->
        <div class="categorytab">
            <div class="flag" title="Language"></div>
            <div class="masteroptionscontainer">
                <div class="optionscontainer">
                </div>
            </div>
        </div>
        <!-- Voice option -->
        <div class="option">
            <div class="cflag"></div>
            <div class="sex"></div>
            <span class="desc"></span>
                            <span class="plus"> (Premium account only)</span>
                        <div class="playercontrol">
                <div class="button play"></div>
            </div>
        </div>
    </div>
    <div class="jplayer"></div>
</div>
        <div style="overflow: auto; padding-left: 135px;">
            <a href="javascript:;" class="buttonbase buttonorange" id="voiceselect_confirm" style="margin:15px auto;float:left;display:block;">
<div class="buttontitle">Confirm</div>
</a>
            <a href="javascript:;" class="buttonbase buttonblue dark" id="voiceselect_plusupgrade" style="margin:15px auto;float:left;display:none;">
<div class="buttontitle">Upgrade Now</div>
</a>
            <a href="#" onclick="jQuery.unblockUI();return false;" class="bottomcancel"><div style="width: 180px">Cancel</div></a>
        </div>
        <a onclick="jQuery.unblockUI()" class="close_btn">×</a>
    </div>
</div>
        <div class="selectvoiceoverlay lightbox" style="display:none">
    <div class="lightbox_wrapper">

<style type="text/css">
.selectvoiceoverlay { width: 550px; }
.selectvoiceoverlay h2 { text-align: center; color: black; margin-bottom: 0px; font-size: 18px; line-height: 20px; }
.selectvoiceoverlay h3 { text-align: center; color: #999999; font-style: oblique; margin-top: 0px; margin-bottom: 2em; font-weight: normal; font-size: 13px; line-height: 20px; }
.selectvoiceoverlay .voiceselectorwidget { margin-left: auto; margin-right: auto; }
.selectvoiceoverlay a.bottomcancel { float: left; text-align: center; margin: 30px auto; display: block; color: #666666; font-size: 16px; font-weight: bold; text-decoration: none; }
.selectvoiceoverlay a.bottomcancel:hover { color: #777777; text-decoration: none; }
</style>

        <h2>Select a voice for your character</h2>
        <h3>This change applies to the whole video</h3>
        <script type="text/javascript">
</script>
<div class="voiceselectorwidget">
    <div class="voiceselector">
    </div>
    <!-- Templates -->
    <div class="templates" style="display: none">
        <!-- Voice list -->
        <div class="categorytab">
            <div class="flag" title="Language"></div>
            <div class="masteroptionscontainer">
                <div class="optionscontainer">
                </div>
            </div>
        </div>
        <!-- Voice option -->
        <div class="option">
            <div class="cflag"></div>
            <div class="sex"></div>
            <span class="desc"></span>
                            <span class="plus"> (Premium account only)</span>
                        <div class="playercontrol">
                <div class="button play"></div>
            </div>
        </div>
    </div>
    <div class="jplayer"></div>
</div>
        <div style="overflow: auto; padding-left: 85px;">
            <a href="javascript:;" class="buttonbase buttonorange" id="voiceselectonly_confirm" style="margin:15px auto;float:left;display:block;">
<div class="buttontitle">Confirm</div>
</a>
                            <a href="/public_features" class="buttonbase buttonpurple3 dark" id="voiceselectonly_plusupgrade" style="margin:15px auto;float:left;display:none;">
<div class="buttontitle">Get a quote</div>
</a>
                        <a href="#" onclick="jQuery.unblockUI();return false;" class="bottomcancel"><div style="width: 180px">Cancel</div></a>
        </div>
        <a onclick="jQuery.unblockUI()" class="close_btn">×</a>
    </div>
</div>
    </div>

<script id="dialogTmpl" type="text/x-jquery-tmpl">
    <div class="dialog">
        <div class="num"></div>
        <div class="char_thumb">
            <img src="\${thumbURL}" alt="" />
            <a class="switch">Switch</a>
            <div class="tips">Switch Actor</div>
        </div>
        <div class="box">
            <div class="dialog_input_wrapper">
                <textarea class="dialog_input" name="text"></textarea>
                <span class="label">Type in or Record Your dialog</span>
            </div>
            <div class="counter" style="display:none;"></div>
            <div class="voice_recorder"></div>
            <div class="dialog_options">
                <a class="dialog_switch">Actor<span class="tips">Switch Actor</span></a>
                {{if hasFacial}}
                <a class="dialog_facial">Emotion<span class="tips">Switch Emotion</span></a>
                {{/if}}
                <div class="langarea">
                    <div class="lang"></div>
                    <div class="gender"></div>
                    Voice                    <div class="tips">Switch Voice</div>
                </div>
            </div>
            <div class="dialog_input_control">
                <a class="dialog_tts on" data-method="tts"><div class="icon"></div><span class="tips">Text to Speech</span></a>
                <a class="dialog_mic" data-method="mic"><div class="icon"></div><span class="tips">Voice Recording</span></a>
            </div>
            <div class="dialog_control">
                <a title="Delete" class="dialog_delete">Delete</a>
                <a title="Insert Line" class="dialog_insert">Insert Line</a>
            </div>
        </div>
    </div>
</script>

    <a class="btn_next" href="#step3" onclick="stepTo('#step3'); return false;">Next</a>
    <div class="upgrade" style="display: none;">
        <a href="javascript:popUpgrade();" class="buttonbase buttonblue dark" style="margin:0 auto;float:none;display:block;">
<div class="buttontitle">Upgrade Now</div>
</a>
    </div>
</div>

<div id="seperator2"></div>

<div id="step3" class="section">
    <h2><span>3. Type in or Record Your dialog</span></h2>

    <a class="previous_step" href="#step2" onclick="stepTo('#step2'); return false;">Back</a>

    <div id="dialog_wrapper">
    <div id="dialogs">
        <div class="dialog focus" data-charid="0" data-facial="default">
            <div class="num">1</div>
            <div class="char_thumb">
                <img src="/char_heads/c-0.png" alt="">
                <a class="switch">Switch</a>
                <div class="tips">Switch Actor</div>
            </div>
            <div class="box">
                <div class="dialog_input_wrapper">
                    <textarea class="dialog_input" name="text"></textarea>
                    <span class="label" style="opacity: 1;">Type in or Record Your dialog</span>
                </div>
                <div class="counter" style="display: none;">180 characters remaining</div>
                <div class="voice_recorder"></div>
                <div class="dialog_options">
                    <a class="dialog_switch">Actor<span class="tips">Switch Actor</span></a>
                    <a class="dialog_facial">Emotion<span class="tips">Switch Emotion</span></a>
                    <div class="langarea">
                        <div class="lang US"></div>
                        <div class="gender M"></div>
                        Voice                        <div class="tips">Switch Voice</div>
                    </div>
                </div>
                <div class="dialog_input_control">
                    <a class="dialog_tts on" data-method="tts"><div class="icon"></div><span class="tips">Text to Speech</span></a>
                    <a class="dialog_mic" data-method="mic"><div class="icon"></div><span class="tips">Voice Recording</span></a>
                </div>
                <div class="dialog_control">
                    <a title="Delete" class="dialog_delete">Delete</a>
                    <a title="Insert Line" class="dialog_insert">Insert Line</a>
                </div>
            </div>
        </div>
        <div class="dialog fake" data-charid="1">
            <div class="char_thumb">
                <img src="/char_heads/c-1.png" alt="">
            </div>
            <div class="box">
                <div class="dialog_input_wrapper">
                    <div class="langarea">
                    </div>
                    <textarea id="fake_dialog_input" class="dialog_input" name="text"></textarea>
                </div>
                <label for="fake_dialog_input" class="dialog_input_message">
                    <span class="basic" style="display: none;">Add as many as 10 dialog lines for free.<br>Upgrade to GoPlus to add up to 20.</span>
                    <span class="plus">Add up to 20 dialog lines</span>
                </label>
            </div>
        </div>
    </div>
    </div>

    <div class="footer">
        <div class="bottom"></div>
        <a class="btn_next" onclick="GoLite.preview();stepTo('#step4');">Preview</a>

        <div class="upgrade" style="display: none;">
            <a href="javascript:popUpgrade();" class="buttonbase buttonblue dark" style="margin:0 auto;float:none;display:block;">
<div class="buttontitle">Upgrade Now</div>
</a>
        </div>
    </div>

    <div id="facial_expression" class="lightbox" style="display:none">
        <div class="lightbox_wrapper">
            <h2>Choose a facial expression:</h2>
            <div id="expression">
                Expressions:
                <ul id="expression_list">
                    <li><a data-facial="default" class="default selected">Default</a></li>
                    <li><a data-facial="happy" class="happy">Happy</a></li>
                    <li><a data-facial="angry" class="angry">Angry</a></li>
                    <li><a data-facial="sad" class="sad">Sad</a></li>
                    <li><a data-facial="cry" class="cry">Cry</a></li>
                </ul>
            </div>

            <a id="facial_expression_submit" href="javascript:;">Confirm</a>
            <a onclick="jQuery.unblockUI();" class="close_btn">×</a>
        </div>
    </div>

<script type="text/javascript">
facialExpression.init({
"default" : "Default",
"happy": "Happy",
"angry": "Angry",
"sad": "Sad",
"cry": "Cry"
});
</script>

    <div id="dialog_input_change_confirm" class="lightbox confirmbox" style="display:none">
        <div class="lightbox_wrapper">
            <p>Switch Voice Input</p>
            <p>The current line of dialog will reset if you switch to a different voice input.</p>
            <div class="confirm_buttons">
                <a class="action-btn alert" onclick="jQuery.unblockUI();">Proceed</a>
                <a class="action-btn disabled" onclick="jQuery.unblockUI();">Cancel</a>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
jQuery('#dialogs .dialog').scriptDialog();
</script>

<div id="seperator3"></div>

<div id="step4" class="section">
    <h2>4. Preview Your Video</h2>

    <a class="previous_step" href="#step3" onclick="stepTo('#step3'); return false;">Back</a>

    <div class="inside">
        <div class="upgrade" style="display:none">
            <h3>Upgrade to GoPlus to enable preview and save your video.</h3>

            <a href="javascript:popUpgrade();" class="buttonbase buttonblue dark" id="btn_upgrade" style="margin:15px auto;float:none;display:block;">
<div class="buttontitle">Upgrade Now</div>
</a>
        </div>
        <div class="generate">
            <a class="btn_preview" href="#" onclick="GoLite.preview(); return false;">Generate Preview</a>
            <p>You made all the changes you wanted to your video?<br>
            Let's see how it looks like then!</p>
        </div>
        <div class="loading"></div>
        <div class="preview" style="display:none">
            <div id="player_container">
                You can't use GoAnimate because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
            </div>
            <a id="btn_save" href="#" onclick="jQuery(document).trigger('GoLite.stateChange', ['save']); return false;">Save Now</a>
        </div>

        <div class="save" style="display:none">
            <div class="thumbnail">
                Choose your thumbnail
                <div id="thumb_chooser_container">
                    You can't use GoAnimate because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
                </div>
            </div>

            <div class="title">
                <label for="movie_title">TITLE:</label>
                <input type="text" id="movie_title" name="movie_title" value="" maxlength="140" placeholder="Enter your title here">
            </div>

            <div class="description">
                <label for="movie_description">DESCRIPTION:</label>
                <textarea id="movie_description" name="movie_description" placeholder="Enter your description (optional)"></textarea>
            </div>


            <div class="clear"></div>
            <div class="group_message" style="color:#999999;font-size:19px;padding-top:10px;text-align:center;">When you are finished with your video, you can post it to a group from the video page.</div>
            <div class="buttons">
                <a id="btn_publish" href="#" style="font-size:21px;" onclick="GoLite.save(); return false;">Save and Go To Video Page</a>
            </div>
            <div class="clear"></div>

            <a id="back_preview" href="#" onclick="jQuery(document).trigger('GoLite.stateChange', ['preview']); return false;">&lt; Back to Preview</a>
        </div>
    </div>
</div>

<script type="text/javascript">
GoLite.init(2);
jQuery('div.character .customlink').addClass('isplus');
</script>

<div id="footer">
</div>

</div>

<div id="publishing" class="lightbox" style="display:none">
    <div class="lightbox_wrapper">Publishing ...</div>
</div>


<div id="upgrade" class="lightbox" style="display:none">
    <div class="lightbox_wrapper">
        <h2>Make animated videos exactly the way you want!</h2>
        <p>Complete the transaction in the browser window that just opened and confirm below to enable the upgrade.</p>
        <div>
            <a href="javascript:;" class="buttonbase buttonorange" id="upgrade_confirm" style="margin:15px auto;float:none;display:block;">
<div class="buttontitle">Confirm</div>
</a>
        </div>
        <a class="close_btn">×</a>
    </div>
</div>
<script type="text/javascript">
jQuery('#upgrade_confirm, #upgrade .close_btn').click(function(e) {
    e.preventDefault();
    jQuery.unblockUI();
});
</script>

<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery.swfobject.min.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery.waypoints.min.js.gz.js"></script>
<script type="text/javascript" src="/quickvideo/files/go/js/jquery/jquery.placeholder.min.js.gz.js"></script>
<script type="text/javascript">
jQuery.flash.expressInstall = "/quickvideo/files/libs/expressInstall.swf";

(function($) {
$(document).ready(function() {

    var next = 'step1', prev = '';

    $('#nav_links .next').click(function(e) {
        e.preventDefault();

        next && stepTo('#' + next);
    });
    $('#nav_links .prev').click(function(e) {
        e.preventDefault();

        prev && stepTo('#' + prev);
    });

    $('.section').waypoint({offset: '50%'});

    $('body').delegate('.section', 'waypoint.reached', function(e, direction) {
        var $this = $(this);
        var id = $this.attr('id');

        if (direction == 'up') {
            if (id == 'step1') {
                next = 'step1';
                prev = '';
                id = 'intro';
            } else if (id == 'step2') {
                next = 'step2';
                prev = 'intro';
                id = 'step1';
            } else if (id == 'step3') {
                next = 'step3';
                prev = 'step1';
                id = 'step2';
            } else if (id == 'step4') {
                next = 'step4';
                prev = 'step2';
                id = 'step3';
            }
        } else {
            if (id == 'step1') {
                next = 'step2';
                prev = 'intro';
            } else if (id == 'step2') {
                next = 'step3';
                prev = 'step1';
            } else if (id == 'step3') {
                next = 'step4';
                prev = 'step2';
            } else if (id == 'step4') {
                next = '';
                prev = 'step3';
            }
        }

        $('#nav_links').find('li').removeClass('on').end()
        .find('.' + id).addClass('on');
    });

    if ($('#login_bar').length) {
        $('#seperator0').waypoint(function(e) {
            $('#login_bar').slideDown();
        }, {offset: 'bottom-in-view', triggerOnce: true});

        $(document).bind('user.signup user.login', function(e) {
            GoLite.updateUserState(function(userState) {
                $(document).trigger('GoLite.stateChange', ['']);
                $('#login_bar').slideUp();
                showNotice('You are now logged in to GoAnimate');
            });
        });
    }

    jQuery('#movie_title, #movie_description').placeholder();
});
$(window).load(function() {$('#nav_links').fadeIn();});
})(jQuery);
</script>

<script type="text/javascript">
    var customCCHeadsBaseUrl = '/char_heads/';
    var customCCThumbsBaseUrl = '/char_thumbs/';


    var goliteEditorMode = 'new';

</script>`)
      });
      break;
    }
    case "/go_full": {
      title = "Video Editor";
      attrs = {
        data: process.env.SWF_URL + "/go_full.swf",
        type: "application/x-shockwave-flash",
        width: "100%",
        height: "100%",
      };
      params = {
        flashvars: {
          apiserver: "/",
          storePath: process.env.STORE_URL + "/<store>",
          isEmbed: 1,
          ctc: "go",
          ut: 30,
          bs: "default",
          appCode: "go",
          page: "",
          siteId: "go",
          lid: 13,
          isLogin: "Y",
          retut: 0,
          clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
          themeId: "custom",
          tray: "custom",		
          tlang: "en_US",
          presaveId: presave,
          isWide: settings.wide,
          collab: 0,
          userId: 2152,
          nextUrl: "/go/videoList",
          username: user ? user.name : ""


        },
        allowScriptAccess: "always",
      };
      break;
    }

    case "/player": {
      meta(query.movieId).then(m =>  {
        title = "Player";
        attrs = {
          data: process.env.SWF_URL + "/player.swf",
          type: "application/x-shockwave-flash",
          width: "100%",
          height: "100%",
        };
        params = {
          flashvars: {
            movieOwner: m.user.name,
            movieOwnerId: m.user.id,
            movieId: m.id,
            movieLid: "10",
            movieTitle: m.title,
            movieDesc: m.desc,
            userId: 2152,
            username: user ? user.name : "",
            uemail: "",
            ut: 30,
            numContact: "",
            apiserver: "https://gowdpk.ga/",
            duration: m.durationString,
            playcount: "0",
            thumbnailURL: `https://gowdpk.ga/movie_thumbs/${m.id}.png?large=1`,
            copyable: "0",
            isPublished: m.published,
            ctc: "go",
            tlang: "en_US",
            is_private_shared: m.pShared,
            autostart: "0",
            appCode: "go",
            is_slideshow: "0",
            originalId: "0zEt_fo4L-5k",
            is_emessage: "0",
            storePath: process.env.STORE_URL + "/<store>",
            clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
            animationPath: process.env.SWF_URL + "/",
            isEmbed: "1",
            refuser: null,
            utm_source: null,
            uid: null,
            isTemplate: "0",
            showButtons: "1",
            chain_mids: "",
            averageRating: 5,
            ratingCount: "48",
            fb_app_url: "https://gowdpk.ga/",
            ad: 0,
            endStyle: 0,
            isWide: settings.wide,
            pwm: 1,
            s3base: "https://gowdpk.ga/movie_thumbs/"
          },
          allowScriptAccess: "always",
          allowFullScreen: "true",
        };
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        Object.assign(params.flashvars, query);
        res.end(`<html><head><title>Video Player - GoWDPK</title></head><body style="margin:0px">${toObjectString(attrs, params)}</body>`);
      })
      break;
    }

    // ajax api
    case "/ajax/settings/list": {
      res.end(JSON.stringify(settings));
      break;
    }
      case "/ajax/previewText2Video": {
      res.end(JSON.stringify(settings));
      break;
    }
    case "/ajax/userInfo": {
      // delete password to prevent hacking somehow.
      if (fs.existsSync(`./meta/accounts/password_generated_${settings.ip_address}.txt`)) {
        fs.unlinkSync(`./meta/accounts/password_generated_${settings.ip_address}.txt`);
      }
      if (user) res.end(JSON.stringify(user));
      else {
        if (fs.existsSync(`./meta/accounts/${settings.ip_address}.json`)) {
          const meta = require(`../meta/accounts/${settings.ip_address}`);
          res.end(JSON.stringify(meta));
        } else res.end("null");
      }
      break;
    }
    case "/ajax/getParams": {
      const type = url.query.type;
      var source;
      switch (type) {
        case "animationPath": {
          source = process.env.SWF_URL;
          break;
        } case "storePath": {
          source = process.env.STORE_URL;
          break;
        } case "clientThemePath": {
          source = process.env.CLIENT_URL;
          break;
        } case "object": {
          const subtype = url.query.subtype;
          switch (subtype) {
            case "previewPlayer": {
              attrs = {
                data: process.env.SWF_URL + "/player.swf",
                type: "application/x-shockwave-flash",
                width: "870",
                height: "420",
              };
              params = {
                flashvars: {
                  apiserver: "/",
                  storePath: process.env.STORE_URL + "/<store>",
                  ut: 30,
                  autostart: 1,
                  isWide: settings.wide,
                  clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
                  isInitFromExternal: 1,
                  movieId: presave,
                  startFrame: url.query.startFrame
                },
                allowScriptAccess: "always",
                allowFullScreen: "true",
              };
              source = toObjectString(attrs, params);
              break;
            }
          }
          break;
        }
      }
      res.end(JSON.stringify({ data: source }));
      break;
    }
    case "/logout/staff_account": {
      fs.unlinkSync(`./meta/accounts/${settings.ip_address}.json`);
      if (!fs.existsSync(`./meta/accounts/${settings.ip_address}.json`)) {
        res.statusCode = 302;
        res.setHeader('Location', '/html/list.html');
        res.end();
      } else {
        // repeat the cycle until the account is deleted (may be annoying for some)
        res.statusCode = 302;
        res.setHeader('Location', '/logout/staff_account');
        res.end();
      }
      break;
    }
    case "/remix": {
      if (!user) {
        res.statusCode = 302;
        res.setHeader("Location", `/html/list.html?errorMessage=You need to be signed into your account in order to remix a video.`);
        res.end();
      } else {
        const mId = query.movieId;
        if (!mId.startsWith("m")) return;
        const i = mId.indexOf("-");
        const suffix = mId.substr(i + 1);
        const oldMoviePath = fUtil.getFileIndex('movie-', '.xml', suffix);
        const newMovieId = fUtil.getNextFileId('movie-', '.xml');
        const newMoviePath = fUtil.getFileIndex('movie-', '.xml', newMovieId);
        const buffer = fs.readFileSync(oldMoviePath);
        fs.writeFileSync(newMoviePath, buffer);
        fs.writeFileSync(fUtil.getFileIndex('user-', '.json', newMovieId), JSON.stringify(user));
        res.statusCode = 302;
        res.setHeader("Location", `/go_full?movieId=m-${newMovieId}`);
        res.end();
      }
      break;
    }
    default:
      return;
  }
  if (!url.pathname.startsWith("/ajax") && !url.pathname.startsWith("/videomaker/quickvideo") && !url.pathname.startsWith("/logout") && url.pathname != "/remix" && url.pathname != "/player") {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");
    Object.assign(params.flashvars, query);
    switch (url.pathname) {
      case "/go_full": {
        res.end(`<!-- DOCTYPE html breaks it for some reason. -->
<html>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<title>Video Editor</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<script src="https://josephanimate2021.github.io/lvm-static/api/jquery/index.js"></script>
<script>
${!user ? `alert("yeah sorry but we can't let you access every single feature within this lvm since you need a account. but uh, you can still use the lvm. so yeah, to get the real experience just make an acc and log in or use staff accounts. thanks: -rev909. p.s: please don't nit pick me for what this project has in it, it's a hobby that i enjoy and i won't let stupid dumbasses nitpick me for every small thing, so mind your business please.")` : ""}
////
//// This JS contains important Video Studio stuff
////
	
///
/// Variables
///
var previewPlayerTempData = "",
    movieDataXmlStr = null,
    filmXmlStr = null,
    previewStartFrame = 0;
///
/// Previewer
///
function get(type) {
	fetch(\`/ajax/getParams?type=\${type}\`).then(data => {
		data.json().then(info => {
			return info.data;
		}).catch(e => console.log(e));
	}).catch(e => console.log(e));
}
function initPreviewPlayer(dataXmlStr, startFrame) {
	previewStartFrame = startFrame;
	// New variable to be used by loadPreviewer()
	movieDataXmlStr = dataXmlStr;
	// Movie XML
	filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
	if (typeof startFrame == 'undefined') {
		startFrame = 1;
	} else {
		startFrame = Math.max(1, parseInt(startFrame));
	}
	// setup preview popup
	fetch(\`/ajax/getParams?type=object&subtype=previewPlayer&startFrame=\${previewStartFrame}\`).then(data => {
		data.json().then(object => {
			document.getElementById('playerdiv').innerHTML = object.data;
			document.getElementById('player-modal').style.display = 'block';
			// Load the Video Previewer
			loadPreviewer();
		}).catch(e => console.log(e));
	}).catch(e => console.log(e));
}
function loadPreviewer() {
	// I think this is in case of an error??
	if (movieDataXmlStr === null) return;
	// I don't know
	savePreviewData(movieDataXmlStr);
}
function savePreviewData(a) {
	// Set temp data variable
	previewPlayerTempData = a
}
function retrievePreviewPlayerData() {
	// Store in separate variable
	var recentPreviewPlayerTempData = previewPlayerTempData;
	// Clear original variable
	previewPlayerTempData = "";
	// Return recent temp data
	return recentPreviewPlayerTempData;
}
///
/// Other stuff
///
function exitStudio() {
	window.location = "/";
}
// interactive tutorial
const tutorialReload = (new URLSearchParams(window.location.search)).get("tutorial");
interactiveTutorial = {
	neverDisplay: function() {
    return tutorialReload ? false : ${settings.tutorial ? false : true}
	}
}
// Hide Video Previewer popup
function hidePreviewer() {
	document.getElementById("obj")[0].onExternalPreviewPlayerCancel();
	document.getElementById('player-modal').style.display = 'none';
}
function publishStudio() {
	document.getElementById("obj")[0].onExternalPreviewPlayerPublish();
	document.getElementById('player-modal').style.display = 'none';
}
function showImporter() {
	document.getElementById('import-modal').style.display = 'block';
}
</script>
<body style="margin:0px">
${toObjectString(attrs, params)}

<div class="w3-container">
  <div id="player-modal" class="w3-modal">
    <div class="w3-modal-content">
      <header class="w3-container w3-teal"> 
        <span onclick="hidePreviewer()" class="w3-button w3-display-topright">&times;</span>
        <h2>Preview Video</h2>
      </header>
      <div class="w3-container" id="playerdiv">
      </div>
      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <center>
          <button onclick="hidePreviewer()" type="button" style="text-transform: uppercase" class="w3-button w3-teal">Back to editing</button>
          <button onclick="publishStudio()" type="button" style="text-transform: uppercase" class="w3-button w3-orange">Save now</button>
        </center>
      </div>
    </div>
  </div>
  <div id="import-modal" class="w3-modal">
    <div class="w3-modal-content w3-animate-left w3-card-4">
      <header class="w3-container w3-teal"> 
        <span onclick="hideImporter()" 
        class="w3-button w3-display-topright">&times;</span>
        <h2>Import An Asset</h2>
      </header>
      <div class="w3-container">
        <form id="uploadbanner" enctype="multipart/form-data" method="post" action="/ajax/saveUserProp" target="dummy">
				  <input id="fileupload" name="import" type="file" accept=".mp3,.wav,.png,.jpg" required>
				  <h3 id="import-as">Import As:</h3><br>
          <p>---------------</p>
          <h4>Image Importing</h4>
				  <input type="radio" value="prop-placeable" name="subtype"> Prop
				  <br />
          <input type="radio" value="prop-holdable" name="subtype"> Holdable Prop
				  <br />
          <input type="radio" value="prop-wearable" name="subtype"> Wearable Prop
				  <br />
          <input type="radio" value="prop-headable" name="subtype"> Headable Prop
				  <br />
				  <input type="radio" value="bg" name="subtype"> Background
				  <br />
          <p>---------------</p><br>
          <h4>Sound Importing</h4>
           <input type="radio" value="soundeffect" name="subtype"> Sound Effect
				  <br />
				  <input type="radio" value="bgmusic" name="subtype"> Music
				  <br />
          <input type="radio" value="voiceover" name="subtype"> Voice Over
				  <br />
				  <input type="submit" value="Import" onclick='importDone()' id="submit"/>
			</form>
      </div>
      <footer class="w3-container w3-teal">
        <p>Importing is currently in beta right now. please expect this to not work correctly. Currently, you can only import backgrounds right now. any others will just crash the website.</p>
      </footer>
    </div>
  </div>
</div>
            
</body>
<iframe style='display:none'name='dummy'></iframe>
</html>`);
        break;
      }
      default: res.end(`<html><head><title>${title} - GoWDPK</title><script>${!user ? `alert("yeah sorry but we can't let you access every single feature within this lvm since you need a account. but uh, you can still use the lvm. so yeah, to get the real experience just make an acc and log in or use staff accounts. thanks: -rev909. p.s: please don't nit pick me for what this project has in it, it's a hobby that i enjoy and i won't let stupid dumbasses nitpick me for every small thing, so mind your business please.")` : ""}
      function characterSaved(){location.href = \"/\"}</script></head><body style="margin:0px">${toObjectString(attrs, params)}</body></html>`);
    }
  }
  return true;
};
