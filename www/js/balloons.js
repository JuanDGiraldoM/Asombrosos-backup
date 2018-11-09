var balScore;
var balGameSection, balScoreSection, btnToScore, btnToGame;
var hiddenBalloon;
var balPartialScore = 0;
var balFinalScore=0;
var theBalloon;
var ballColours = ["balMorado.png", "balRosa.png", "balVerde.png", "balAzul.png", "balLila.png", "balNaranja.png", "balRojo.png", "balSalmon.png", "balMenta.png"];
var ballTime = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var ballPos = [-1000, -950]
var balSound;
function startBalloonGame() {
   
    balPartialScore=0;
    balFinalScore=0;
    balScore = document.querySelector('#balloonsScore');
    balFinalScore = document.querySelector('#balFinalScore');
    balGameSection = document.querySelector('#balloonGame');
    balScoreSection = document.querySelector('#balloonsScoreSection');
    balCountVideo = document.querySelector("#balCount");
    balSound = document.querySelector("#balExplotion");
   
    // music.play();
    this.balloons = 50;
    this.balloonsArr = [];
    var height = window.innerHeight;
    var ancho = screen.height;

    for (i = 0; i < this.balloons; i++) {
        var newBalloon = new Balloon();
        newBalloon.ball();
    };

    function Balloon(left, top) {
        this.id = balloonsArr.length;

        this.animate = function () {
            TweenMax.to("#balloon" + this.id, ballTime[Math.floor(Math.random() * ballTime.length)], { ease: Power0.easeOut, top: ballPos[Math.floor(Math.random() * ballPos.length)] });
           
        }

        this.ball = function () {

            var image = document.createElement("img");
            image.id = "balloon" + this.id;
            image.className = "balloon";
            image.src = "assets/img/balloons/" + ballColours[Math.floor(Math.random() * ballColours.length)];
            image.style.left = (Math.floor(Math.random() * 600)) + "px";
            document.getElementById("theBalloon").insertAdjacentElement('beforeend', image);
            balloonsArr.push(this);

            this.animate();
        }
    }

    theBalloon = document.getElementById('theBalloon');
    hiddenBalloon = theBalloon.getElementsByClassName('hidden');
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
        balPartialScore = hiddenBalloon.length;
        balScore.innerHTML = balPartialScore;
        balFinalScore.innerHTML = balPartialScore;
        balSound.pause();
        balSound.currentTime = 0;
        balSound.play();
    }

    setTimeout(endGame, 15000);
}
function endGame(){
    balGameSection.classList.remove('animationIn');
    balGameSection.classList.add('animationOut');
    balScoreSection.style.display = "block";
    balloonGame.style.display = "none";
    balScoreSection.classList.add('animationIn');
    backgroundMusic.pause();
    if(balPartialScore==0){
        victory("Milagro",0);
    }else{
        victory("Milagro",1);
    }
    // setTimeout(finalizeGame(true),3000);
}

