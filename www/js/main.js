window.onload = init;
var lvlup = false;
function init (){
	var jugarButton,aboutButton,lvl1Button,lvl2Button,lvl3Button,lvl4Button;
	var levelpBackButton,gamep1BackButton,gamep2BackButton,gamep3BackButton,gamep4BackButton;
	var aboutpBackButton, galleriaBackButton,galleriapBackButton, fuperButton, fuperBackButton,creditsBackButton,aboutCreditsButton;
	var btntoPage;
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

	// Navigation
	document.getElementById("loadp").style.display = "block";

	setTimeout(()=>{document.getElementById("loadp").style.display = "none"; document.getElementById("menup").style.display = "block";},2000);

	jugarButton = document.querySelector("#jugarButton");
	jugarButton.addEventListener('click', navigate('menup', 'levelp'));

	aboutButton = document.querySelector("#aboutButton");
	aboutButton.addEventListener('click', navigate('menup', 'aboutp'));

	lvl1Button = document.querySelector("#lvl1Button");
	lvl1Button.addEventListener('click', navigate('levelp', 'gamep1'));

	lvl2Button = document.querySelector("#lvl2Button");
	lvl2Button.addEventListener('click', navigate('levelp', 'gamep2'));

	lvl3Button = document.querySelector("#lvl3Button");
	lvl3Button.addEventListener('click', navigate('levelp', 'gamep3'));

	lvl4Button = document.querySelector("#lvl4Button");
	lvl4Button.addEventListener('click', navigate('levelp', 'gamep4'));
		
	levelpBackButton = document.querySelector("#levelpBackButton");
	levelpBackButton.addEventListener('click', navigate('levelp', 'menup'));

	gamep1BackButton = document.querySelector("#gamep1BackButton");
	gamep1BackButton.addEventListener('click', navigate('gamep1', 'levelp'));

	gamep2BackButton = document.querySelector("#gamep2BackButton");
	gamep2BackButton.addEventListener('click', navigate('gamep2', 'levelp'));

	gamep3BackButton = document.querySelector("#gamep3BackButton");
	gamep3BackButton.addEventListener('click', navigate('gamep3', 'levelp'));

	gamep4BackButton = document.querySelector("#gamep4BackButton");
	gamep4BackButton.addEventListener('click', navigate('gamep4', 'levelp'));

	aboutpBackButton = document.querySelector("#aboutpBackButton");
	aboutpBackButton.addEventListener('click', navigate('aboutp', 'menup'));

	galleriaBackButton = document.querySelector("#galleriapBackButton");
	galleriaBackButton.addEventListener('click', navigate('galleriap', 'menup'));

	galleriapBackButton = document.querySelector("#imgGalleria");
	galleriapBackButton.addEventListener('click', navigate('levelp', 'galleriap'));

	fuperButton=document.querySelector("#btnFuper");
	fuperButton.addEventListener('click',navigate('aboutp','fuperp'));

	fuperBackButton=document.querySelector("#fuperBackButton");
	fuperBackButton.addEventListener('click',navigate('fuperp','aboutp'));

	creditsBackButton=document.querySelector("#creditsBackButton");
	creditsBackButton.addEventListener('click',navigate('creditsp','aboutp'));

	aboutCreditsButton=document.querySelector("#btnCredits");
	aboutCreditsButton.addEventListener('click',navigate('aboutp','creditsp'));

	btntoPage=document.querySelector("#btnToFuper");
	btntoPage.addEventListener('click',function(){
		location.href = "http://fundacionfuper.org/";
	});

}