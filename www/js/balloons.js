window.onload = init;
var score;
var gameSection, scoreSection, btnToScore;
var balloon1, balloon2, balloon3, balloon4, ballon5, balloon6, balloon7, balloon8, balloon9;
var hidenBalloon;
var partialScore = 0;
var finalScore = 0;
var theBalloon;

function init() {
    score = document.getElementById('balloonsScore');
    gameSection = document.getElementById('balloonGame');
    scoreSection = document.getElementById('balloonsScoreSection');
    btnToScore = document.getElementById('toScore');
    btnToScore.addEventListener('click', changeToScore);
    gameSection.addEventListener('animationend', dissapear);
    scoreSection.addEventListener('animationend', dissapear);
    var i = 0;
    
    var ancho = screen.height;
    for (i = 0; i < 2; i++) {

        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon1' src='img/balMorado.png' style='right:" + (Math.floor(Math.random() * ancho / 100 * 25) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon1", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon2' src='img/balRosa.png'style='right:" + (Math.floor(Math.random() * ancho / 100 * 35) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon2", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon3' src='img/balVerde.png'style='right:" + (Math.floor(Math.random() * ancho / 100 * 45) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon3", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon4' src='img/balAzul.png'style='right:" + (Math.floor(Math.random() * ancho / 100 * 55) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon4", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon5' src='img/balLila.png'style='left:" + (Math.floor(Math.random() * ancho / 100 * 65) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon5", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon6' src='img/balNaranja.png'style='left:" + (Math.floor(Math.random() * ancho / 100 * 75) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon6", 1 + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon7' src='img/balRojo.png'style='left:" + (Math.floor(Math.random() * ancho / 100 * 85) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon7", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon8' src='img/balSalmon.png'style='left:" + (Math.floor(Math.random() * ancho / 100 * 95) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon8", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });
        document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon9' src='img/balMenta.png'style='left:" + (Math.floor(Math.random() * ancho / 100 * 105) + (Math.floor(Math.random() * ancho))) + "px '/>");
        TweenMax.to("#balloon9", i + ((Math.floor(Math.random() * ancho)) * 0.01 + 20), { y: -1000 });


    }
    theBalloon=document.getElementById('theBalloon');
    hidenBalloon = theBalloon.getElementsByClassName('hidden');
    //TweenMax.to(".balloon", 10, { y: -1000});
    var balloons = document.querySelector("#theBalloon");
    var manager = new Hammer.Manager(balloons);
    var Tap = new Hammer.Tap({
        taps: 1
    });
    manager.add(Tap);
    manager.on('tap', tap);
    function tap(e) {
        e.target.classList.toggle('hidden');
        // console.log(hidenBalloon.length);
        score.innerHTML=hidenBalloon.length;
    }
    
    function changeToScore(event) {
        gameSection.classList.remove('animationIn');
        gameSection.classList.add('animationOut');
        scoreSection.style.display = "block";
        scoreSection.classList.add('animationIn');
    }

    function dissapear(event) {
        var element = event.target;
        if (element.classList.contains('animationOut')) {
            element.style.display = "none";
            element.classList.remove('animationOut');
            element.classList.remove('animationIn');
        }
    }

    
        
}
