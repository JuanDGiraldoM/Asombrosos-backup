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
var balScores = document.querySelector("#balloonsScore");
function startBalloonGame() {
    resetGame();

    this.balloons = 50;
    this.balloonsArr = [];

    for (i = 0; i < this.balloons; i++) {
        var newBalloon = new Balloon();
        newBalloon.ball();
    }

    function Balloon(left, top) {
        this.id = balloonsArr.length;

        this.animate = function() {
            var tweenAnimation = TweenMax.to(
                "#balloon" + this.id,
                ballTime[Math.floor(Math.random() * ballTime.length)],
                {
                    ease: Power0.easeOut,
                    top: ballPos[Math.floor(Math.random() * ballPos.length)]
                }
            );
            //tweenAnimation.restart();
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

            image.addEventListener("click", tap);
        };
    }

    function tap(e) {
        balSound.load();
        balSound.play();
        e.target.classList.toggle("hidden");
        balPartialScore = hiddenBalloon.length;
        setScore(balPartialScore);
        balFinalScore.innerHTML = balPartialScore;
    }
    gameTime=setTimeout(endBalloonsGame, 15000);
}
var showGalleryTime;
var bl_videoVic;
function endBalloonsGame() {
    clearInterval(gameTime);
    theBalloon.innerHTML = "";
    theBalloon.style.display = "none";
    balGameSection.classList.remove("animationIn");
    balGameSection.classList.add("animationOut");
    balScoreSection.style.display = "block";
    balloonGame.style.display = "none";
    balScoreSection.classList.add("animationIn");
    backgroundMusic.pause();
    var milagroUnlocked = localStorage.getItem("Milagro");
    if (balPartialScore > 0 && milagroUnlocked == true) {
        showGalleryTime = setTimeout(showGallery,7000);
        victory("Milagro", 1);
    } else if (balPartialScore != 0 || (balPartialScore != 0 && milagroUnlocked == false)) {
        bl_videoVic=setTimeout(videoVictoryGame, 5000);
        victory("Milagro", 1);
    } else if (balPartialScore == 0 && milagroUnlocked == true) {
        showGalleryTime = setTimeout(showGallery,7000);
        victory("Milagro", 1);
    } else if (balPartialScore == 0 && milagroUnlocked == false) {
        showGalleryTime = setTimeout(showGallery,7000);
        showGalleryTime = victory("Milagro", 0);
        
    }
    theBalloon.classList.remove("bottomBalloon");
    balScore.style.visibility = "hidden";
        
}

function balloonsCloseGame(){
    clearTimeout(showGalleryTime);
    clearTimeout(bl_videoVic);
    clearTimeout(gameTime);
    victory("Milagro", 1);
    theBalloon.innerHTML = "";
    theBalloon.style.display = "none";
    balloonGame.style.display = "none";
    theBalloon.classList.remove("bottomBalloon");
    balScore.style.visibility = "hidden";

}

function videoVictoryGame() {
    backgroundMusic.pause();
    finalizeGame(true);
    
}
function setScore(partialScore) {
    balScores.innerHTML = "<p>Puntaje: " + String(partialScore) + "</p>";
    balScores.className = "animated pulse faster";
    setTimeout(function() {
        balScores.className = "";
    }, 500);
    partialScore = 0;
}
function resetGame() {
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
    balGameSection.style.display = "block";
    theBalloon.classList.toggle("bottomBalloon");
    balGameSection.classList.remove("animationOut");
    balScoreSection.classList.remove("animationIn");
    balScoreSection.style.display = "none";
    theBalloon.style.display = "block";
    balScore.style.visibility = "visible";
    balScores.innerHTML = "<p>Puntaje: 0</p>";
    balFinalScore.innerHTML=0;
    clearInterval(showGalleryTime);
}
