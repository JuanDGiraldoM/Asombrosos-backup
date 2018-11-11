var balScore;
var balGameSection, balScoreSection, btnToScore, btnToGame;
var hiddenBalloon;
var balPartialScore = 0;
var balFinalScore = 0;
var theBalloon;
var ballColours = [
    "balMorado.png",
    "balRosa.png",
    "balVerde.png",
    "balAzul.png",
    "balLila.png",
    "balNaranja.png",
    "balRojo.png",
    "balSalmon.png",
    "balMenta.png"
];
var ballTime = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var ballPos = [-1000, -950];
var balSound;

function startBalloonGame() {
    balPartialScore = 0;
    balFinalScore = 0;
    balScore = document.querySelector("#balloonsScore");
    balFinalScore = document.querySelector("#balFinalScore");
    balGameSection = document.getElementById("balloonGame");
    balScoreSection = document.getElementById("balloonsScoreSection");
    balCountVideo = document.querySelector("#balCount");
    balSound = document.querySelector("#balExplotion");
    theBalloon = document.getElementById("theBalloon");
    hiddenBalloon = theBalloon.getElementsByClassName("hidden");
    balGameSection.style.display="block";
    theBalloon.classList.toggle("bottomBalloon");
    balGameSection.classList.remove("animationOut");
    balScoreSection.classList.remove("animationIn");
    balScoreSection.style.display="none";
    theBalloon.style.display="block";
    
    this.balloons = 10;
    this.balloonsArr = [];
    var height = window.innerHeight;
    var ancho = screen.height;

    for (i = 0; i < this.balloons; i++) {
        var newBalloon = new Balloon();
        newBalloon.ball();
    }

    function Balloon(left, top) {
        this.id = balloonsArr.length;

        this.animate = function() {
            var tweenAnimation=TweenMax.to("#balloon" + this.id, ballTime[Math.floor(Math.random() * ballTime.length)], {
                ease: Power0.easeOut,
                top: ballPos[Math.floor(Math.random() * ballPos.length)]
            });
            tweenAnimation.restart();
        };

        this.ball = function() {
            var image = document.createElement("img");
            image.id = "balloon" + this.id;
            image.className = "balloon";
            image.src = "assets/img/balloons/" + ballColours[Math.floor(Math.random() * ballColours.length)];
            image.style.left = Math.floor(Math.random() * 600) + "px";
            document.getElementById("theBalloon").insertAdjacentElement("beforeend", image);
            balloonsArr.push(this);

            this.animate();
        };
    }

    
    var manager = new Hammer.Manager(theBalloon);
    var Tap = new Hammer.Tap({
        taps: 1
    });

    manager.add(Tap);
    manager.on("tap", tap);
    function tap(e) {
        // balSound.load();
        // balSound.play();
        e.target.classList.toggle("hidden");
        balPartialScore = hiddenBalloon.length;
        balScore.innerHTML = "<p>Puntaje: " + String(balPartialScore) + "</p>";
        balFinalScore.innerHTML = balPartialScore;
    }
    setTimeout(endBalloonsGame, 15000);
}

function endBalloonsGame() {
    theBalloon.style.display="none";
    balGameSection.classList.remove("animationIn");
    balGameSection.classList.add("animationOut");
    balScoreSection.style.display = "block";
    balloonGame.style.display = "none";
    balScoreSection.classList.add("animationIn");
    backgroundMusic.pause();
    var milagroUnlocked = localStorage.getItem("Milagro");
    if (balPartialScore == 0 && milagroUnlocked == 0) {
        victory("Milagro", 0);

    } else {
        victory("Milagro", 1);
        // finalizeGame(true);
        // setTimeout(finalizeGame(true),3000);
    }
<<<<<<< HEAD
   
=======
    setTimeout(videoVictoryGame, 5000);
>>>>>>> a4bbf084c44f8ce68fb7cb8741424bb9e4f1f098
}

function videoVictoryGame() {
    balScoreSection.classList.remove("animationIn");
    balScoreSection.classList.add("animationOut");
    balScoreSection.classList.add("animationIn");
    backgroundMusic.pause();
    finalizeGame(true);
}