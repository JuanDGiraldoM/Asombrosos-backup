var lvlup = false;
var countVideo, introVideo, backgroundMusic, indexGame;

var app = {
    initialize: function() {
        document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
        init();
    },
    onDeviceReady: function() {
        this.receivedEvent("deviceready");
    },
    receivedEvent: function(id) {}
};
app.initialize();

function init() {
    var jugarButton, aboutButton, lvl1Button, lvl2Button, lvl3Button, lvl4Button;
    var levelpBackButton, antonymsScreenBackButton, wordsScreenBackButton, ballonsScreenBackButton, gamep4BackButton;
    var aboutpBackButton,
        galleryBackButton,
        gallerypBackButton,
        fuperButton,
        fuperBackButton,
        creditsBackButton,
        aboutCreditsButton,
        backButtonplayAgain,
        btnPlayAgain,
        unlockBackBtn,
        fromUnlockToG;
    var btntoPage;
    countVideo = document.getElementById("countVideo");
    backgroundMusic = document.getElementById("backgroundMusic");

    var navigate = function(actual, next) {
        return function() {
            hide(actual);
            show(next);
        };
    };

    // Navigation
    document.getElementById("loadp").style.display = "block";

    setTimeout(() => {
        document.getElementById("loadp").style.display = "none";
        document.getElementById("menup").style.display = "block";
    }, 2000);

    jugarButton = document.querySelector("#jugarButton");
    jugarButton.addEventListener("click", navigate("menup", "levelp"));

    aboutButton = document.querySelector("#aboutButton");
    aboutButton.addEventListener("click", navigate("menup", "aboutp"));

    lvl1Button = document.querySelector("#lvl1Button");
    lvl1Button.addEventListener("click", function() {
        indexGame = 1;
        openGame();
    });

    lvl2Button = document.querySelector("#lvl2Button");
    lvl2Button.addEventListener("click", function() {
        indexGame = 2;
        openGame();
    });

    wordsScreenBackButton = document.querySelector("#wordsScreenBackButton");
    wordsScreenBackButton.addEventListener("click", function() {
        closeGame();
    });

    lvl3Button = document.querySelector("#lvl3Button");
    lvl3Button.addEventListener("click", function() {
        indexGame = 3;
        openGame();
    });

    lvl4Button = document.querySelector("#lvl4Button");
    lvl4Button.addEventListener("click", navigate("levelp", "gamep4"));

    levelpBackButton = document.querySelector("#levelpBackButton");
    levelpBackButton.addEventListener("click", navigate("levelp", "menup"));

    antonymsScreenBackButton = document.querySelector("#antonymsScreenBackButton");
    antonymsScreenBackButton.addEventListener("click", function() {
        closeGame();
    });

    btnPlayAgain = document.querySelector("#btnPlayAgainDiv");
    btnPlayAgain.addEventListener("click", playAgain);

    unlockBackBtn = document.getElementById("unlockBackButton");
    unlockBackBtn.addEventListener("click", navigate("unlockScreen", "levelp"));

    fromUnlockToG = document.getElementById("unlockGalleryButton");
    fromUnlockToG.addEventListener("click", navigate("unlockScreen", "galleryp"));

    ballonsScreenBackButton = document.querySelector("#ballonsScreenBackButton");
    ballonsScreenBackButton.addEventListener("click", navigate("ballonsScreen", "levelp"));

    gamep4BackButton = document.querySelector("#gamep4BackButton");
    gamep4BackButton.addEventListener("click", navigate("gamep4", "levelp"));

    aboutpBackButton = document.querySelector("#aboutpBackButton");
    aboutpBackButton.addEventListener("click", navigate("aboutp", "menup"));

    backButtonplayAgain = document.querySelector("#playAgainBackButton");
    backButtonplayAgain.addEventListener("click", navigate("playAgain", "levelp"));

    galleryBackButton = document.querySelector("#gallerypBackButton");
    galleryBackButton.addEventListener("click", navigate("galleryp", "levelp"));

    gallerypBackButton = document.querySelector("#imggallery");
    gallerypBackButton.addEventListener("click", navigate("levelp", "galleryp"));

    fuperButton = document.querySelector("#btnFuper");
    fuperButton.addEventListener("click", navigate("aboutp", "fuperp"));

    fuperBackButton = document.querySelector("#fuperBackButton");
    fuperBackButton.addEventListener("click", navigate("fuperp", "aboutp"));

    creditsBackButton = document.querySelector("#creditsBackButton");
    creditsBackButton.addEventListener("click", navigate("creditsp", "aboutp"));

    aboutCreditsButton = document.querySelector("#btnCredits");
    aboutCreditsButton.addEventListener("click", navigate("aboutp", "creditsp"));

    gallery = document.querySelector(".gallery");
    susyCertificate = document.querySelector("#susyCertificate");
    rayoCertificate = document.querySelector("#rayoCertificate");
    milagroCertificate = document.querySelector("#milagroCertificate");
    gatunaCertificate = document.querySelector("#gatunaCertificate");
    btnSusy = document.querySelector("#btnSusy");
    btnRayo = document.querySelector("#btnRayo");
    btnMilagro = document.querySelector("#btnMilagro");
    btnGatuna = document.querySelector("#btnGatuna");

    btnSusy.addEventListener("click", () => {
        gallery.style.display = "none";
        susyCertificate.style.display = "block";
    });
    btnRayo.addEventListener("click", () => {
        gallery.style.display = "none";
        rayoCertificate.style.display = "block";
    });

    btnMilagro.addEventListener("click", () => {
        gallery.style.display = "none";
        milagroCertificate.style.display = "block";
    });

    btnGatuna.addEventListener("click", () => {
        gallery.style.display = "none";
        gatunaCertificate.style.display = "block";
    });

    btntoPage = document.querySelector("#btnToFuper");
    btntoPage.addEventListener("click", function() {
        location.href = "http://fundacionfuper.org/";
    });
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

// Gallery

function toBackSusy() {
    susyCertificate.style.display = "none";
    gallery.style.display = "block";
}

function toBackMilagro() {
    milagroCertificate.style.display = "none";
    gallery.style.display = "block";
}

function toBackRayo() {
    rayoCertificate.style.display = "none";
    gallery.style.display = "block";
}

function toBackGatuna() {
    gatunaCertificate.style.display = "none";
    gallery.style.display = "block";
}

//Game functions

function openGame() {
    switch (indexGame) {
        case 1:
            introVideo = document.getElementById("gatunaIntroVideo");
            break;
        case 2:
            introVideo = document.getElementById("susyIntroVideo");
            break;
        case 3:
            introVideo = document.getElementById("milagroIntroVideo");
            break;
    }
    hide("levelp");
    show("gameVideoScreen");
    introVideo.style.display = "block";
    introVideo.currentTime = 0;
    introVideo.play();
    introVideo.onended = playGame;
}

function playGame() {
    introVideo.pause();
    introVideo.style.display = "none";
    hide("gameVideoScreen");
    show("countVideoScreen");
    countVideo.play();
    countVideo.onended = function() {
        hide("countVideoScreen");
        backgroundMusic.play();

        switch (indexGame) {
            case 1:
                show("antonymsScreen");
                openAntonymsGame();
                break;
            case 2:
                show("wordsScreen");
                openWordsGame();
                break;
            case 3:
                show("ballonsScreen");
                startBalloonGame();
                break;
        }
    };
}

function finalizeGame(isWinner) {
    backgroundMusic.pause();

    switch (indexGame) {
        case 2:
            // finalizeWordsGame();
            break;
    }
}

function closeGame() {
    backgroundMusic.pause();
    introVideo.pause();

    switch (indexGame) {
        case 1:
            hide("antonymsScreen");
            show("levelp");
            break;
        case 2:
            finalizeWordsGame();
            hide("wordsScreen");
            show("levelp");
            break;
    }
}

function lostGame() {
    backgroundMusic.pause();

    switch (indexGame) {
        case 1:
            hide("antonymsScreen");
            break;
        case 2:
            hide("wordsScreen");
            break;
        case 2:
            hide("balloonGameBackground");
            break;
    }
    var playAgainScreen = document.getElementById("playAgain");
    playAgainScreen.style.display = "block";
    var playAgain = document.getElementById("againVideo");
    playAgain.play();
}

function playAgain() {
    hide("playAgain");
    show("countVideoScreen");
    countVideo.play();
    countVideo.onended = function() {
        hide("countVideoScreen");
        backgroundMusic.play();

        switch (indexGame) {
            case 1:
                show("antonymsScreen");
                openAntonymsGame();
                break;
            case 2:
                show("wordsScreen");
                openWordsGame();
                break;
            case 3:
                show("ballonsScreen");
                startBalloonGame();
                break;
        }
    };
}

function Win() {
    backgroundMusic.pause();
    switch (indexGame) {
        case 1:
            hide("antonymsScreen");
            show("unlockScreen");
            introVideo = document.getElementById("gatunaUnlockVideo");
            break;
        case 2:
            show("wordsScreen");
            openWordsGame();
            break;
        case 3:
            show("ballonsScreen");
            startBalloonGame();
            break;
    }

    introVideo.style.display = "block";
    introVideo.currentTime = 0;
    introVideo.play();
}
