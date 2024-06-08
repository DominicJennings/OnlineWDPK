<!DOCTYPE html>
<html>
<title>Your Videos</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <!--note to joseph: should we fork this repl to test out the supabase saving system -->
<meta name="description" content="GoWDPK is an experimental instance by Jerry2009, where he just messes around with GoAnimate Wrapper."/>
<meta name="keywords" content="wrapper, ga, gowdpk, comedy world, animations, free animation, goanimate revival, how to get comedy world, family guy goanimate, ga, vyond legacy, vyond old lvm, how to get comedy world back on vyond, wrapper no download"/>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<style>
  .videoOfTheMonth {
		font-size: 14px;
		padding: 10px 0;
		background-color: #03013b;
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
  }
  .grid-item {
    padding: 20px;
    font-size: 30px;
    text-align: center;
  }

  .show {display: block;}
</style>  
<body>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">GoWDPK</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li><a href="javascript:;" onclick="document.getElementById('create-modal').style.display='block'"">Make A Video</a></li>
      <li><a href="javascript:;" onclick="document.getElementById('chr-modal').style.display='block'">Make A Character</a></li>
      <li>
        <div class="dropdown">
          <button onclick="document.getElementById('myDropdown').classList.toggle('show');" class="dropbtn">Misc</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="/html/export.html">Screen Recorder</a>
          </div>
        </div>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="javascript:;" onclick="document.getElementById('signup-modal').style.display='block'"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="javascript:;" onclick="document.getElementById('login-modal').style.display='block'"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</div>
</div>
  <div class="videoOfTheMonth">
    <h2>Video of the month:</h2>
    <div>
      <a href="javascript:modalWindow('m-34')"><img src="/movie_thumbs/m-34.png" height=240 width="320" alt="movieofthemonththumb"></a>
    </div>
  </div>
</nav>
<div class="w3-container">
  <h4>Welcome!</h4>
  <h6 id="username"></h6>
  <h2>Your Videos</h2>
  <div class="grid-container" id="videos-tray"></div>
  <p id="no-movies" style="display:none">>You currently have no movies at the moment.</p>
  <!-- Modals -->
  <div id="player-modal" class="w3-modal">
    <div class="w3-modal-content">
      <header class="w3-container w3-teal"> 
        <span onclick="hideWindow()" class="w3-button w3-display-topright">&times;</span>
        <h2 id="video-title"></h2>
      </header>
      <div class="w3-container">
        <div id="video-player"></div>
      </div>
      <footer class="w3-container w3-teal">
        <center id="video-info"></center>
      </footer>
    </div>
  </div>
  <div id="chr-modal" class="w3-modal">
    <div class="w3-modal-content">
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('chr-modal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
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
            <a href="/cc_browser?themeId=business"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/business.jpg" alt="Business Friendly"><br>Business Friendly</a>
          </div>
          <div class="grid-item">
            <a href="/cc_browser?themeId=anime"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/anime.jpg" alt="Anime"><br>Anime</a>
          </div><br>
          <div class="grid-item">
            <a href="/cc_browser?themeId=ninjaanime"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/ninjaanime.jpg" alt="Ninja Anime"><br>Ninja Anime</a>
          </div>
          <div class="grid-item">
            <a href="/cc_browser?themeId=spacecitizen"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/spacecitizen.jpg" alt="Space Citizens"><br>Space Citizens</a>
          </div><br>
          <div class="grid-item">
            <a href="/cc_browser?themeId=chibi"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/chibi.jpg" alt="Chibi Peepz"><br>Chibi Peepz</a>
          </div>
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
    <div class="w3-modal-content">
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('create-modal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
        <h2>Select A Theme For Your Video</h2>
      </header>
      <div class="w3-container">
        <div class="grid-container">
          <div class="grid-item">
            <a href="/go_full?tray=custom"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/custom.jpg" alt="Comedy World"><br>Comedy World</a>
          </div>
          <div class="grid-item">
            <a href="/go_full?tray=action"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/action.jpg" alt="Lil' Peepz"><br>Lil' Peepz</a>
          </div><br>
          <div class="grid-item">
            <a href="/go_full?tray=business"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/business.jpg" alt="Business Friendly"><br>Business Friendly</a>
          </div>
          <div class="grid-item">
            <a href="/go_full?tray=anime"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/anime.jpg" alt="Anime"><br>Anime</a>
          </div><br>
          <div class="grid-item">
            <a href="/go_full?tray=ninjaanime"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/ninjaanime.jpg" alt="Ninja Anime"><br>Ninja Anime</a>
          </div>
          <div class="grid-item">
            <a href="/go_full?tray=spacecitizen"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/spacecitizen.jpg" alt="Space Citizens"><br>Space Citizens</a>
          </div><br>
          <div class="grid-item">
            <a href="/go_full?tray=chibi"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/chibi.jpg" alt="Chibi Peepz"><br>Chibi Peepz</a>
          </div>
          <div class="grid-item">
            <a href="/go_full?tray=ninja"><img src="https://raw.githubusercontent.com/Wrapper-Offline/Wrapper-Offline/main/server/pages/img/themes/ninja.jpg" alt="Chibi Ninjas"><br>Chibi Ninjas</a>
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
  <div id="login-modal" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

    <div class="w3-center"><br>
      <span onclick="document.getElementById('login-modal').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
      <img alt="Log In" style="width:30%" class="w3-circle w3-margin-top">
    </div>

    <form class="w3-container">
      <div class="w3-section">
        <label><b>Username</b></label>
        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Username" name="usrname" required>
        <label><b>Password</b></label>
        <input class="w3-input w3-border" type="password" placeholder="Enter Password" name="psw" required>
        <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Login</button>
      </div>
    </form>
    </div>
  </div>
    </form>

    </div>
  </div>
  <script>
		var tbody = document.getElementById('videos-tray');
    var json;
		const listReq = new XMLHttpRequest();
		listReq.open('GET', '/movieList');
		listReq.send();
    var C = 0;
		function loadVideos() {
			for (const tbl of json) {
        if (!tbl) document.getElementById('no-movies').style.display = 'block';
        const date = tbl.date.substr(0, 10) + ' ' + tbl.date.substr(11);
				tbody.insertAdjacentHTML('beforeend', `<div class="grid-item"><a href="javascript:;" onclick="modalWindow('${tbl.id}')"><img src="/movie_thumbs/${tbl.id}.png"></a><h5>${tbl.title}</h5></div>`);
			}
		}
    listReq.onreadystatechange = function (e) {
			if (listReq.readyState != 4) return;
			json = JSON.parse(listReq.responseText);
			loadVideos();
		}
    function modalWindow(id) {
      fetch(`/meta/${id}`).then(data => {
        data.json().then(tbl => {
          var editMode = '';
          if (tbl.id != 'm-34' && tbl.id != 'm-40') editMode = `<a href="/go_full?movieId=${tbl.id}">Edit</a> `;
          document.getElementById('video-title').innerHTML = `${tbl.title}`;
          document.getElementById('video-player').innerHTML = `<iframe width="870" height="420" style="border: 0" src="/player?movieId=${tbl.id}"></iframe>`;
          document.getElementById('video-info').innerHTML = `${editMode}<a href="/movies/${tbl.id}.zip">Download</a>`
          document.getElementById('player-modal').style.display='block';
        });
      });
    }
    function hideWindow() {
      document.getElementById('video-player').innerHTML = ``;
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
</script>
</div>
            
</body>
</html>