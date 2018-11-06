/*
	menup
	levelp
	gamep
	creditp
*/
window.onload = init;
var lvlup = false;
function init (){

	function show (id) {
		document.getElementById(id).style.display = "block";
	}

	function hide (id) {
		document.getElementById(id).style.display = "none";
	}

	var navigate = function(actual, next) {
		return function () {
			hide(actual);
			show(next);
		}
	}

		// Nav 
	document.getElementById("loadp").style.display = "block";

	//var time = document.getElementById("time");
	setTimeout(()=>{document.getElementById("loadp").style.display = "none"; document.getElementById("menup").style.display = "block";},2000);

	var jugarButton = document.getElementById("jugarButton");
	jugarButton.addEventListener('click', navigate('menup', 'levelp'));

	var aboutButton = document.getElementById("aboutButton");
	aboutButton.addEventListener('click', navigate('menup', 'aboutp'));

	var lvl1Button = document.getElementById("lvl1Button");
	lvl1Button.addEventListener('click', navigate('levelp', 'gamep1'));

	var lvl2Button = document.getElementById("lvl2Button");
	lvl2Button.addEventListener('click', navigate('levelp', 'gamep2'));

	var lvl3Button = document.getElementById("lvl3Button");
	lvl3Button.addEventListener('click', navigate('levelp', 'gamep3'));

	var lvl4Button = document.getElementById("lvl4Button");
	lvl4Button.addEventListener('click', navigate('levelp', 'gamep4'));
		
	var levelpBackButton = document.getElementById("levelpBackButton");
	levelpBackButton.addEventListener('click', navigate('levelp', 'menup'));

	var gamep1BackButton = document.getElementById("gamep1BackButton");
	gamep1BackButton.addEventListener('click', navigate('gamep1', 'levelp'));

	var gamep2BackButton = document.getElementById("gamep2BackButton");
	gamep2BackButton.addEventListener('click', navigate('gamep2', 'levelp'));

	var gamep3BackButton = document.getElementById("gamep3BackButton");
	gamep3BackButton.addEventListener('click', navigate('gamep3', 'levelp'));

	var gamep4BackButton = document.getElementById("gamep4BackButton");
	gamep4BackButton.addEventListener('click', navigate('gamep4', 'levelp'));

	var aboutpBackButton = document.getElementById("aboutpBackButton");
	aboutpBackButton.addEventListener('click', navigate('aboutp', 'menup'));
}