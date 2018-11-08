var height = window.innerHeight,
    width = window.innerWidth;

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
        init();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent("deviceready");
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {}
};

app.initialize();

function init() {
    // introVideo = document.querySelector("#introVideo");
    container = document.querySelector(".container");
    wordScreen = document.querySelector("#wordsScreen");
    winner = true;
    active = true;
    score = 0;
    timeFall = 8;
    timeLaunch = 1250;
    openGame();
    // introVideo.style.visibility = "visible";
    // introVideo.play();
    // introVideo.onended = skipIntroVideo;
}

function skipIntroVideo() {
    countVideo = document.querySelector("#countVideo");
    introVideo.parentNode.removeChild(introVideo);
    countVideo.style.visibility = "visible";
    countVideo.play();
    countVideo.onended = skipCountVideo;
}

function skipCountVideo() {
    countVideo.parentNode.removeChild(countVideo);
    openGame();
}

function openGame() {
    musicaFondo.play();
    container.style.visibility = "visible";
    animateWords();
    updateScore();
    animateSusy();
    collisionInterval = setInterval(collisionDetection, 10);
    speedInterval = setInterval(function() {
        timeFall /= 1.5;
        timeLaunch /= 1.3;
        clearInterval(launchInterval);
        animateWords();
    }, 5000);
    // setTimeout(finalizeGame, 15000);

    function animateSusy() {
        var susy = document.querySelector("#susy"),
            range = width - susy.width,
            transform,
            finalX;

        var mc = new Hammer.Manager(susy);
        mc.add(new Hammer.Pan());
        mc.on("panmove", onPan);

        mc.on("hammer.input", function(ev) {
            if (ev.isFinal) {
                resetElement(true);
            }
        });

        function resetElement(bool) {
            let positionSusy = susy.getBoundingClientRect();
            finalX = bool ? positionSusy.left : range / 2;
            transform = {
                translate: { x: finalX, y: 0 }
            };
            updateElementTransform();
        }

        function updateElementTransform() {
            let deltaX = transform.translate.x >= 0 ? transform.translate.x : 0;
            deltaX = deltaX <= range ? deltaX : range;
            var value = ["translate3d(" + deltaX + "px, 0px, 0)"];
            value = value.join(" ");
            susy.style.transform = value;
        }

        function onPan(ev) {
            transform.translate = {
                x: finalX + ev.deltaX,
                y: 0
            };
            updateElementTransform();
        }
        resetElement(false);
    }

    function animateWords() {
        var images = [
                "alegre.png",
                "alegria.png",
                "amable.png",
                "amigable.png",
                "amorosa.png",
                "companerismo.png",
                "comprometida.png",
                "generosa.png",
                "honesta.png",
                "positiva.png",
                "tolerante.png",
                "valiente.png"
            ],
            canvas = document.querySelector("#words"),
            range;

        launchInterval = setInterval(function() {
            var image = addWord();
            launchWord(image);
        }, timeLaunch);

        function addWord() {
            var image = document.createElement("img");
            var index = parseInt(Math.random() * images.length);
            image.id = "word" + index;
            image.src = "assets/img/words/" + images[index];
            image.className = "word";
            canvas.appendChild(image);
            return image;
        }

        function launchWord(image) {
            range = width - image.width;
            animateWord(image);
        }

        function animateWord(image) {
            image.style.left = Math.random() * range + "px";
            TweenMax.to(String("#" + image.id), timeFall, { y: height });
        }
    }

    function collisionDetection() {
        var words = document.querySelectorAll(".word");

        if (words) {
            words.forEach(word => {
                var positionCircle = word.getBoundingClientRect(),
                    positionSusy = susy.getBoundingClientRect(),
                    posCircleX = positionCircle.left + positionCircle.width / 2,
                    posCircleY = positionCircle.top + positionCircle.height;

                if (
                    !word.className.includes("animated") &&
                    posCircleY >= positionSusy.top &&
                    posCircleY <= positionSusy.top + (height * 1) / 8 &&
                    posCircleX >= positionSusy.left &&
                    posCircleX <= positionSusy.right
                ) {
                    explosion.pause();
                    explosion.currentTime = 0;
                    explosion.play();
                    score += 5;
                    word.className = "word animated fadeOut faster";
                    updateScore();
                    validateScore();
                } else if (posCircleY >= positionSusy.bottom && !word.className.includes("animated")) {
                    word.className = "word animated flash faster";
                    winner = false;
                    setTimeout(finalizeGame, 500);
                }
            });
        } else {
            stopCollisionDetection();
        }
    }

    function updateScore() {
        var scoreContainer = document.querySelector("#score");
        scoreContainer.innerHTML = "<p>Puntaje: " + String(score) + "</p>";
        scoreContainer.className = "animated pulse faster";
        setTimeout(function() {
            scoreContainer.className = "";
        }, 500);
    }

    function validateScore() {
        if (score >= 100) {
            finalizeGame();
        }
    }
}

function finalizeGame() {
    if (active) {
        active = false;
        clearInterval(collisionInterval);
        clearInterval(launchInterval);
        clearInterval(speedInterval);

        var retryImg,
            buttonPlay,
            video,
            canvas = document.querySelector("#words");
        canvas.innerHTML = "";
        // container.style.display = "none";

        if (winner) {
            // video = document.createElement("video");
            // video.src = "assets/video/desbloqueo susy.mp4";
            // wordScreen.appendChild(video);
            // video.style.visibility = "visible";
            // video.play();
            var scoreContainer = document.querySelector("#score");
            scoreContainer.innerHTML = "<p>Has ganado</p>";
            musicaFondo.pause();
        } else {
            var scoreContainer = document.querySelector("#score");
            scoreContainer.innerHTML = "<p>Has fallado</p>";
            musicaFondo.pause();
            // retryImg = document.querySelector(".retryImg");
            // buttonPlay = document.querySelector(".playButton");
            // retryImg.style.visibility = "visible";
            // musicaFondo.pause();
            // setTimeout(function() {
            //     buttonPlay.style.left = (width - buttonPlay.width) / 2 + "px";
            //     buttonPlay.style.top = (height - buttonPlay.height) / 2 + "px";
            //     buttonPlay.style.visibility = "visible";
            //     buttonPlay.className = "playButton animated bounceIn";
            // }, 1000);
        }
    }
}
