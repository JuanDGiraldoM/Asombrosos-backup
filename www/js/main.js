var lvlup = false;
var countVideo, gameVideo, backgroundMusic, indexGame, unlockVideoSrc;

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
        btnUnlockBack,
        btnUnlockGallery;
    // unlockBackBtn,
    // fromUnlockToG;
    var btntoPage;
    gameVideo = document.getElementById("gameVideo");
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
    var splashScreen = document.getElementById("splashScreen");
    splashScreen.play();
    splashScreen.onended = function() {
        document.getElementById("loadp").style.display = "none";
        document.getElementById("menup").style.display = "block";
        backgroundMusic.volume = 0.1;
        backgroundMusic.play();
    };

    jugarButton = document.querySelector("#jugarButton");
    jugarButton.addEventListener("click", navigate("menup", "levelp"));

    aboutButton = document.querySelector("#aboutButton");
    aboutButton.addEventListener("click", navigate("menup", "aboutp"));

    lvl1Button = document.querySelector("#lvl1Button");
    lvl1Button.addEventListener("click", function() {
        openGame(1, "assets/video/GatunaIntro.mp4", "assets/video/GatunaUnlock.mp4");
    });

    lvl2Button = document.querySelector("#lvl2Button");
    lvl2Button.addEventListener("click", function() {
        openGame(2, "assets/video/SusyIntro.mp4", "assets/video/SusyUnlock.mp4");
    });

    wordsScreenBackButton = document.querySelector("#wordsScreenBackButton");
    wordsScreenBackButton.addEventListener("click", function() {
        closeGame();
    });

    lvl3Button = document.querySelector("#lvl3Button");
    lvl3Button.addEventListener("click", function() {
        openGame(3, "assets/video/MilagroIntro.mp4", "assets/video/MilagroUnlock.mp4");
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

    btnUnlockBack = document.getElementById("unlockBackButton");
    btnUnlockBack.addEventListener("click", function(){
        hide("gameVideoScreen");
        show("levelp");
        this.style.display='none';
        btnUnlockGallery.style.display='none';
    });

    btnUnlockGallery = document.getElementById("unlockGalleryButton");
    btnUnlockGallery.addEventListener("click", function(){
        hide("gameVideoScreen");
        show("galleryp");
        this.style.display='none';
        btnUnlockBack.style.display='none';
        getUnlockedCharacters();
    });

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
    gallerypBackButton.addEventListener("click", function() {
        hide("levelp");
        show("galleryp");
        getUnlockedCharacters();
    });

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

function openGame(index, introVideoSrc, unlockVidSrc) {
    indexGame = index;
    unlockVideoSrc = unlockVidSrc;
    backgroundMusic.pause();
    gameVideo.src = introVideoSrc;
    hide("levelp");
    show("gameVideoScreen");
    gameVideo.style.display = "block";
    gameVideo.load();
    gameVideo.play();
    gameVideo.onended = playGame;
}

function playGame() {
    gameVideo.onended = null;
    gameVideo.pause();
    gameVideo.style.display = "none";
    hide("gameVideoScreen");
    show("countVideoScreen");
    countVideo.play();
    countVideo.onended = function() {
        hide("countVideoScreen");
        backgroundMusic.play();
        backgroundMusic.volume = 0.5;
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
            case 4:
                show("runnerScreenGame");
                openRunnerGame();
                break;
        }
    };
}

function finalizeGame(isWinner) {
    backgroundMusic.pause();
    if (isWinner) {
        switch (indexGame) {
            case 1:
                hide("antonymsScreen");
                break;
            case 2:
                hide("wordsScreen");
                break;
            case 3:
                hide("ballonsScreen");
                break;
        }
        show("gameVideoScreen");
        gameVideo.src = unlockVideoSrc;
        gameVideo.style.display = "block";
        gameVideo.load();
        gameVideo.play();
        var btnBack=document.getElementById('unlockBackButton');
        var btnGallery=document.getElementById('unlockGalleryButton');
        btnBack.style.display='block';
        btnGallery.style.display='block';
    } else {
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
}

function closeGame() {
    backgroundMusic.volume = 0.1;
    gameVideo.pause();

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

function victory(character, unlocked) {
    localStorage.setItem(character, unlocked);
}
function getUnlockedCharacters(){
    var milagroUnlocked = localStorage.getItem("Milagro");
        var susyUnlocked = localStorage.getItem("Susy");
        var rayoUnlocked = localStorage.getItem("Rayo");
        var gatunaUnlocked = localStorage.getItem("Gatuna");
        if (milagroUnlocked == 1) {
            document.querySelector("#btnMilagro").style.visibility = "visible";
        }
        if (susyUnlocked == 1) {
            document.querySelector("#btnSusy").style.visibility = "visible";
        }
        if (gatunaUnlocked == 1) {
            document.querySelector("#btnGatuna").style.visibility = "visible";
        }
        if (rayoUnlocked == 1) {
            document.querySelector("#btnRayo").style.visibility = "visible";
        }
}

function finalizeGameBalloon(isWinner) {
    backgroundMusic.pause();
    show("gameVideoScreen");
    gameVideo.src = unlockVideoSrc;
    gameVideo.style.display = "block";
    gameVideo.load();
    gameVideo.play();
    var btnBack=document.getElementById('unlockBackButton');
    var btnGallery=document.getElementById('unlockGalleryButton');
    btnBack.style.display='block';
    btnGallery.style.display='block';
}