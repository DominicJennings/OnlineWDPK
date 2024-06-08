const movie = require('./main');
const fs = require('fs');
const asset = require("../asset/main");
const fUtil = require("../misc/file");
// this function splits %20 in usernames and converts them to spaces.
function ur(usr) {
  switch (usr) {
    case "joseph%20the%20animator":
    case "MJ,%20the%20Spirit": {
      const [ beg, mid, end ] = usr.split("%20");
      return `${beg} ${mid} ${end}`;
    } default: return usr;
  }
}
module.exports = function (req, res, url, settings, user) {
	if (req.method != 'GET') return; 
  switch (url.pathname) {
    case '/movieList': {
      Promise.all(movie.list().map(movie.meta)).then(a => {
        res.end(JSON.stringify(a))
      }).catch(e => console.log(e));
      return true;
    } case '/charList': {
      asset.chars(url.query.themeId).then(chars => {
        res.end(JSON.stringify(chars));
      }).catch(e => console.log(e));
      return true;
    } case '/ajax/hiddenMovies/meta': {
      const id = url.query.id;
      const [ prefix, suffix ] = id.split("-");
      res.end(JSON.stringify({hidden: fs.existsSync(fUtil.getFileIndex("hidden-movie-", ".txt", suffix)) ? true : false}));
      return true;
    } case '/ajax/list/staff_movies': {
      async function listStaffMovies() {
        res.end(JSON.stringify(await movie.listStaffMovies()));
      }
      listStaffMovies();
      return true;
    } case '/ajax/list/guest_movies': {
      async function listGuestMovies() {
        res.end(JSON.stringify(await movie.listGuestMovies()));
      }
      listGuestMovies();
      return true;
    }
  }
  const match = req.url.match(/\/videos\/list\/([^/]+)$/);
  if (!match) return;
  const usrMatch = match[1];
  if (fs.existsSync(`./meta/accounts/${settings.ip_address}.json`)) {
    const meta = require(`../meta/accounts/${settings.ip_address}`);
    const usr = ur(usrMatch);
    if (user.name != usr) {
      res.statusCode = 302;
      res.setHeader("Location", "/html/list.html");
      res.end();
    } else {
      res.setHeader("Content-Type", "text/html; charset=utf8");
      res.end(`<html id="html"><head><title>Your Videos</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <!--note to joseph: should we fork this repl to test out the supabase saving system -->
<meta name="description" content="GoWDPK is an experimental instance by Jerry2009, where he just messes around with GoAnimate Wrapper.">
<meta name="keywords" content="wrapper, ga, gowdpk, comedy world, animations, free animation, goanimate revival, how to get comedy world, family guy goanimate, ga, vyond legacy, vyond old lvm, how to get comedy world back on vyond, wrapper no download">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<script src="https://josephanimate2021.github.io/lvm-static/api/jquery/index.js"></script>
<script src="https://replit.com/public/js/repl-auth-v2.js"></script>
<style>
  .videoOfTheMonth {
		font-size: 14px;
		padding: 10px 0;
		background-color: #03013b;
		text-align: center;
	}
  .message {
		font-size: 14px;
		padding: 10px 0;
		background-color: darkorange;
		text-align: center;
	}
  .dropbtn {
    background-color: #3498DB;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover, .dropbtn:focus {
    background-color: #2980B9;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown a:hover {background-color: #ddd;}

  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
    margin: auto;
  }
  .staff-picks-grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
    margin: auto;
  }
  .grid-item {
    padding: 30px;
    font-size: 30px;
    text-align: center;
    border: solid 35px;
    background-color: #999999;
    color: black;
    animation: fadeInAnimation ease 3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
        }
        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
  

  .show {display: block;}
  body {
    font-family:trebuchet MS;
  }
  /* Add a black background color to the top navigation bar */
.topnav {
  overflow: hidden;
  background-color: #e9e9e9;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Style the "active" element to highlight the current page */
.topnav a.active {
  background-color: #2196F3;
  color: white;
}

/* Style the search box inside the navigation bar */
.topnav input[type=text] {
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
}

/* When the screen is less than 600px wide, stack the links and the search field vertically instead of horizontally */
@media screen and (max-width: 600px) {
  .topnav a, .topnav input[type=text] {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }
  .topnav input[type=text] {
    border: 1px solid #ccc;
  }
}
/* jerry, please stop making the upload form visable. it is supposed to be invisable. */  
/* at the time, the search thingy kept becoming invisible along with the upload form, so i was trying to find a way to seperate those two at the time, (which was the reason i put the upload movie form inside a div) -J09 */  
form {
  display: none
}
.search-box {
  display: block;
}
html.dark, html.dark>body {
	background: black;
}
.white {
  color: white;
}
</style>  
</head><body>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">GoWDPK</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li><a href="javascript:;" onclick="document.getElementById('create-modal').style.display = 'block'">Create</a></li>
      <li><a href="javascript:;" onclick="document.getElementById('chr-modal').style.display = 'block'">Character Creator</a></li>
      <li>
        <div class="dropdown">
          <button onclick="document.getElementById('myDropdown').classList.toggle('show');" class="dropbtn">Explore <span class="glyphicon glyphicon-triangle-bottom"></span></button>
        
          <div id="myDropdown" class="dropdown-content">
            <a href="javascript:;" onclick="modalWindow('/html/export.html', 'WDPKRecorder')">WDPKRecorder</a>
            <a href="javascript:;" onclick="modalWindow('https://gowdpk.freeforums.net/', 'Community Forums')">Community</a>
            <a href="javascript:;" onclick="modalWindow('/html/uploader/main.html', 'Wrapper2WDPK Converter')">Wrapper2WDPK Converter</a>
            
          </div>
        </div>
      </li>
      <li><a href="javascript:;" onclick="modalWindow('https://www.youtube.com/@josephanimate', 'josephanimate - YouTube')">Joseph Animate's YouTube Channel</a></li>
      
    </ul>
    <ul class="nav navbar-nav navbar-right" id="options-right"><li class="dropdown">
          <button onclick="document.getElementById('accDropdown').classList.toggle('show');" class="dropbtn">Your Account <span class="glyphicon glyphicon-triangle-bottom"></span></button>
        
          <div id="accDropdown" class="dropdown-content">
            <a href="/videos/list/${usr}">Your Videos</a>
            <a href="/html/settings.html">Settings</a>
            <a href="/html/coins.html">Your Coins</a>
          </div>
        
      </li></ul>
  </div>


  <!-- <div class="videoOfTheMonth">
    <h2>Video of the month:</h2>
    <div>
      <a href="javascript:modalWindow('m-34')"><img src="/movie_thumbs/m-34.png" height=240 width="320" alt="movieofthemonththumb"></a>
    </div>
  </div> -->
<div class="message" id="no-videos"></div>
</nav>
<div class="stats">

</div>
<div class="w3-container">
  <h2>Your Videos</h2>
  <p> Welcome to your GWDPK Dashboard ${usr}!
  This is a list of your videos, if you don't have any ideas on what to make, maybe you should look at the forum's channel: Community Ideas, a channel for your sad and unoriginal soul!</p>
  <form action="/ajax/searchMyMovies?user=${usr}" method="post" class="search-box">
    <div id="search-box"><input class="searchbar" type="text" placeholder="Search via titles or tags" width="50" name="search"></div>
  </form> 
  <p id="search-results"></p>
  <div class="grid-container" id="videos-tray"></div>
  <!-- Modals -->
  <div id="player-modal" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
      <header class="w3-container w3-teal"> 
        <span onclick="hideWindow()" class="w3-button w3-display-topright">×</span>
        <h2 id="video-title"></h2>
      </header>
      <div class="w3-container">
        <div id="video-player"></div>
      </div>
      <footer id="info" class="w3-container w3-teal">
        <center id="video-info"></center>
      </footer>
    </div>
  </div>
  <div id="web-modal" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('web-modal').style.display = 'none'" class="w3-button w3-display-topright">×</span>
        <h2 id="web-title"></h2>
      </header>
      <div class="w3-container">
        <div id="web"></div>
      </div>
      <footer class="w3-container w3-teal" id="site">
      </footer>
    </div>
  </div>
  <div class="w3-modal" id="export_overlay">
    <div class="w3-modal-content">
      <header class="w3-container w3-teal">
          <span onclick="document.getElementById('export_overlay').style.display = 'none'" class="w3-button w3-display-topright">×</span>
          <h2>URL For GoWDPK</h2>
      </header>
      <div class="w3-container">
          <textarea onclick="this.select()" readonly>https://gowdpk.ga/</textarea>
      </div>
      <footer class="w3-container w3-tea">
          <button onclick="document.getElementById('export_overlay').style.display = 'none'">Close</button>
      </footer>
    </div>
  </div>
  <div id="chr-modal" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('chr-modal').style.display='none'" class="w3-button w3-display-topright">×</span>
        <h2>Select A Theme For Your Character</h2>
      </header>
      <div class="w3-container">
        <div class="grid-container">
          <div class="grid-item">
            <a href="/cc_browser?themeId=family"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/custom.jpg" alt="Comedy World"><br>Comedy World</a>
          </div>
          <div class="grid-item">
            <a href="/cc?themeId=cc2"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/action.jpg" alt="Lil' Peepz"><br>Lil' Peepz</a>
          </div><br>
          <div class="grid-item">
            <a href="/cc_browser?themeId=anime"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/anime.jpg" alt="Anime"><br>Anime</a>
          </div>
          <div class="grid-item">
            <a href="/cc_browser?themeId=ninjaanime"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/ninjaanime.jpg" alt="Ninja Anime"><br>Ninja Anime</a>
          </div><br>
          <div class="grid-item">
            <a href="/cc_browser?themeId=spacecitizen"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/spacecitizen.jpg" alt="Space Citizens"><br>Space Citizens</a>
          </div>
          <div class="grid-item">
            <a href="/cc_browser?themeId=chibi"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/chibi.jpg" alt="Chibi Peepz"><br>Chibi Peepz</a>
          </div><br>
          <div class="grid-item">
            <a href="/cc_browser?themeId=ninja"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/ninja.jpg" alt="Chibi Ninjas"><br>Chibi Ninjas</a>
          </div>
        </div>
      </div>
      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('chr-modal').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
      </div>
      <footer class="w3-container w3-teal">
        <center><p>Please note that selecting a theme from the modal windows are currently in beta right now. please expect this to not work correctly.</p></center>
      </footer>
    </div>
  </div>
  <div id="create-modal" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('create-modal').style.display='none'" class="w3-button w3-display-topright">×</span>
        <h2>Select A Theme For Your Video</h2>
      </header>
      <div class="w3-container">
        <div class="grid-container">
          <div class="grid-item">
            <a href="javascript:;" onclick="redirect('custom')"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/custom.jpg" alt="Comedy World"><br>Comedy World</a>
          </div>
          <div class="grid-item">
            <a href="javascript:;" onclick="redirect('action')"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/action.jpg" alt="Lil' Peepz"><br>Lil' Peepz</a>
          </div><br>
          <div class="grid-item">
            <a href="javascript:;" onclick="redirect('anime')"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/anime.jpg" alt="Anime"><br>Anime</a>
          </div>
          <div class="grid-item">
            <a href="javascript:;" onclick="redirect('ninjaanime')"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/ninjaanime.jpg" alt="Ninja Anime"><br>Ninja Anime</a>
          </div><br>
          <div class="grid-item">
            <a href="javascript:;" onclick="redirect('spacecitizen')"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/spacecitizen.jpg" alt="Space Citizens"><br>Space Citizens</a>
          </div>
          <div class="grid-item">
            <a href="javascript:;" onclick="redirect('chibi')"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/chibi.jpg" alt="Chibi Peepz"><br>Chibi Peepz</a>
          </div><br>
          <div class="grid-item">
            <a href="javascript:;" onclick="redirect('ninja')"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/ninja.jpg" alt="Chibi Ninjas"><br>Chibi Ninjas</a>
          </div>
        </div>
      </div>
      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('create-modal').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
      </div>
      <footer class="w3-container w3-teal">
        <center><p>Please note that selecting a theme from the modal windows are currently in beta right now. please expect this to not work correctly.</p></center>
      </footer>
    </div>
  </div>
  <form enctype="multipart/form-data" action="/upload_movie" method="post">
    <input id="movie" type="file" name="import" accept=".zip,.xml">
  </form>
  <script>
    const params = (new URLSearchParams(window.location.search));
    const error = params.get("errorMessage");
    const search = params.get("search_query");
    if (error) {
      document.getElementById('error-text').innerHTML = error;
      document.getElementById('error-modal').style.display = 'block';
    }
    function showError(message = "You're grounded!") {
      document.getElementById('error-text').innerHTML = message;
      document.getElementById('error-modal').style.display = 'block';
    }
    $.getJSON("/ajax/settings/list", (json) => {
      if (json.mode) {
        $("html").addClass("dark");
        if ($("html").hasClass("dark")) {
          $("h2").css("color", "white")
          $("p").css("color", "white")
        }
      }
    });
    function redirect(tray) { 
      location.href = \`/go_full?tray=\${tray}\`;
    }
		var tbody = document.getElementById('videos-tray');
    var json;
		const listReq = new XMLHttpRequest();
		listReq.open('GET', '/ajax/videos/${usr}/list');
		listReq.send();
		function loadVideos() {
      if (listReq.responseText == "[]") document.getElementById('no-videos').innerHTML = 'It does appear that you have not made your first video yet. you can do so by clicking on the Create button.'
			for (const tbl of json) {
        document.getElementById('no-videos').innerHTML = \`You have sucessfully created your first video! if you want, you can share GoWDPK With your friends and family members. we are pretty sure that they might be interested in using this site to create their own cartoons! to do so, <a href="javascript:document.getElementById('export_overlay').style.display = 'block'"">Click here</a>\`
        const date = tbl.date.substr(0, 10) + ' ' + tbl.date.substr(11);
        // movie searching (beta)
        // also tags (beta too, it might help with the search feature for people to easily find it by putting the video's tag.)
        if (search == "") {
          document.getElementById('search-results').innerHTML = \`Please search something.\`;
          return;
        }
        if (!search) tbody.insertAdjacentHTML('beforeend', \`<a class="grid-item" id="\${tbl.id}" href="javascript:;" onclick="modalWindow('\${tbl.id}')"><img src="/movie_thumbs/\${tbl.id}.png"><h5>\${tbl.title}</h5><h5>tags:</h5><h5>\${tbl.tag}</h5><h5>Created by:</h5><h5>\${tbl.user.name}</h5></a>\`);
        else {
          document.getElementById('search-box').innerHTML = \`<input class="searchbar" value="\${search}" type="text" placeholder="Search via titles or tags" name="search">\`;
          document.getElementById('search-results').innerHTML = \`Here are the results to your query: \${search}.\`;
          document.getElementById('no-movies').style.display = 'block';
          if (search.includes(tbl.tag)) tbody.insertAdjacentHTML('beforeend', \`<a class="grid-item" id="\${tbl.id}" href="javascript:;" onclick="modalWindow('\${tbl.id}')"><img src="/movie_thumbs/\${tbl.id}.png"></a><h5>\${tbl.title}</h5></div>\`);
          else if (search.includes(tbl.title)) tbody.insertAdjacentHTML('beforeend', \`<a class="grid-item" id="\${tbl.id}" href="javascript:;" onclick="modalWindow('\${tbl.id}')"><img src="/movie_thumbs/\${tbl.id}.png">""</a><h5>\${tbl.title}</h5></div>\`);
        }
			}
		}
    listReq.onreadystatechange = function (e) {
			if (listReq.readyState != 4) return;
			json = JSON.parse(listReq.responseText);
			loadVideos();
		}
    function modalWindow(id, command) {
      if (!id.startsWith("m")) {
        document.getElementById('web').innerHTML = \`<embed height="420" width="870" src="\${id}"></embed>\`;
        document.getElementById('web-title').innerHTML = command;
        document.getElementById('site').innerHTML = \`Site Not Working? <a href="\${id}">Click Here</a>.\`;
        document.getElementById('web-modal').style.display = 'block';
      } else {
        fetch(\`/meta/\${id}\`).then(data => {
          data.json().then(tbl => {
            if (command == 'disablefooter') document.getElementById('info').style.display = 'none';
            else document.getElementById('info').style.display = 'block';
            var editMode = \`<a href="/go_full?movieId=\${tbl.id}">Edit</a> \`;
            document.getElementById('video-title').innerHTML = \`\${tbl.title}\`;
            document.getElementById('video-player').innerHTML = \`<iframe width="870" height="420" style="border: 0" src="/player?movieId=\${tbl.id}"></iframe>\`;
            $.getJSON(\`/ajax/hiddenMovies/meta?id=\${tbl.id}\`, (movie) => {
                if (movie.hidden) document.getElementById('video-info').innerHTML = \`\${editMode}<a href="/movies/\${tbl.id}.zip">Download</a> <a href="/movies/\${tbl.id}.xml" download="\${tbl.title}.xml">Download (Xml File)</a> <a href="javascript:;" onclick="deleteMovie('\${id}')">Delete</a> <a href="javascript:;" onclick="showMovie('\${id}')">Unhide</a>\`
                else document.getElementById('video-info').innerHTML = \`\${editMode}<a href="/movies/\${tbl.id}.zip">Download</a> <a href="/movies/\${tbl.id}.xml" download="\${tbl.title}.xml">Download (Xml File)</a> <a href="javascript:;" onclick="deleteMovie('\${id}')">Delete</a> <a href="javascript:;" onclick="hideMovie('\${id}')">Hide</a>\`
            });
            document.getElementById('player-modal').style.display='block';
          });
        });
      }
    }
    function hideWindow() {
      document.getElementById('video-player').innerHTML = \`\`;
      document.getElementById('player-modal').style.display='none'
    }
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) openDropdown.classList.remove('show');
        }
      }
    }
    function deleteMovie(mId) {
      const yesorno = confirm(\`Are you sure that you want to delete movie \${mId}?\`);
      if (yesorno) {
        document.getElementById('player-modal').style.display = 'none';
        $.post(\`/ajax/movie/delete?id=\${mId}\`).done(data => {
          if (data.status == "error") alert(\`An error has occured while deleting movie \${mId}.\`);
          else {
            const $elem = $("#" + mId);
					  $elem.fadeOut();
          }
        });
      }
    }
    function hideMovie(mId) {
      const yesorno = confirm(\`Are you sure that you want to hide movie \${mId} from the public?\`);
      if (yesorno) {
        document.getElementById('player-modal').style.display = 'none';
        $.post(\`/ajax/movie/hide?id=\${mId}\`).done(data => {
          if (data.status == "error") alert(\`An error has occured while hidding movie \${mId}.\`);
          else alert(\`Movie \${mId} is now hidden from the public\`);
        });
      }
    }
    function showMovie(mId) {
      const yesorno = confirm(\`Are you sure that you want to show movie \${mId} to the public?\`);
      if (yesorno) {
        document.getElementById('player-modal').style.display = 'none';
        $.post(\`/ajax/movie/show?id=\${mId}\`).done(data => {
          if (data.status == "error") alert(\`An error has occured while unhidding movie \${mId}.\`);
          else alert(\`Movie \${mId} is now shown to the public\`);
        });
      }
    }
    
</script>
</div>
            

</body></html>`);
    }
  } else {
    res.statusCode = 302;
    res.setHeader("Location", "/html/list.html");
    res.end();
  }
  return true;
};