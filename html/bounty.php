<html id="html"><head><title>User Videos</title>
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
</head><body onload="checkLoginStatus('get-user-info')">
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">GoWDPK</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="/">Home</a></li>
      <li><a href="javascript:;" onclick="checkLoginStatus('create-video')">Create</a></li>
      <li><a href="javascript:;" onclick="checkLoginStatus('create-char')">Character Creator</a></li>
      <li>
        <div class="dropdown">
          <button onclick="document.getElementById('myDropdown').classList.toggle('show');" class="dropbtn">Explore <span class="glyphicon glyphicon-triangle-bottom"></span></button>
        
          <div id="myDropdown" class="dropdown-content">
            <a href="javascript:;" onclick="modalWindow('./export.html', 'WDPKRecorder')">WDPKRecorder</a>
            <a href="javascript:;" onclick="modalWindow('https://gowdpk.freeforums.net/', 'Community Forums')">Community</a>
            <a href="javascript:;" onclick="modalWindow('./uploader/main.html', 'Wrapper2WDPK Converter')">Wrapper2WDPK Converter</a>
            
          </div>
        </div>
      </li>
      <li><a href="javascript:;" onclick="modalWindow('https://www.youtube.com/@josephanimate', 'josephanimate - YouTube')">Joseph Animate's YouTube Channel</a></li>
      
    </ul>
    <ul class="nav navbar-nav navbar-right" id="options-right">
      <li><a href="javascript:;" onclick="document.getElementById('login-modal').style.display='block'"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
<p>Want someone to make YOUR idea? Introucing Bounties! When a person successfully creates your idea, you can pay them the designated money for your bounty!</p>

<!-- this is button img url. https://web.archive.org/web/20160204171339/http://lightspeed.goanimate.com/static/1891aa8b1d18feb6/go/img/user/btn_browse_gobucks.gif -->
