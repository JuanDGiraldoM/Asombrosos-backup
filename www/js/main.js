var lvlup = false;
var countVideo, gameVideo, backgroundMusic, indexGame, unlockVideoSrc;
var tutorialVideo = document.querySelector("#tutorialVideo");
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
    var levelpBackButton,
        antonymsScreenBackButton,
        wordsScreenBackButton,
        balloonsScreenBackButton,
        runnerScreenBackButton;
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

    var videos = document.getElementsByTagName("video");
    for (let i = 0; i < videos.length; i++) {
        videos[i].poster = "assets/img/backgrounds/BackgroundVideo.png";
    }

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
    jugarButton.addEventListener("click", function() {
        backgroundMusic.pause();
        hide("menup");
        show("tutorial");
        tutorialVideo.src = "assets/video/Tutorial1.mp4";
        tutorialVideo.onclick = skipIntro1;
        tutorialVideo.onended = skipIntro1;
        tutorialVideo.play();
    });

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
    lvl4Button.addEventListener("click", function() {
        openGame(4, "assets/video/RayoIntro.mp4", "assets/video/RayoUnlock.mp4");
    });

    levelpBackButton = document.querySelector("#levelpBackButton");
    levelpBackButton.addEventListener("click", navigate("levelp", "aboutp"));

    antonymsScreenBackButton = document.querySelector("#antonymsScreenBackButton");
    antonymsScreenBackButton.addEventListener("click", function() {
        closeGame();
    });
    balloonsScreenBackButton = document.querySelector("#balloonsScreenBackButton");
    balloonsScreenBackButton.addEventListener("click", function() {
        closeGame();
    });

    btnPlayAgain = document.querySelector("#btnPlayAgainDiv");
    btnPlayAgain.addEventListener("click", playAgain);

    btnUnlockBack = document.getElementById("unlockBackButton");
    btnUnlockBack.addEventListener("click", function() {
        hide("gameVideoScreen");
        show("levelp");
        this.style.display = "none";
        btnUnlockGallery.style.display = "none";
    });

    btnUnlockGallery = document.getElementById("unlockGalleryButton");
    btnUnlockGallery.addEventListener("click", function() {
        hide("gameVideoScreen");
        show("galleryp");
        this.style.display = "none";
        btnUnlockBack.style.display = "none";
        getUnlockedCharacters();
    });

    runnerScreenBackButton = document.querySelector("#runnerScreenBackButton");
    runnerScreenBackButton.addEventListener("click", ()=> {
        //navigate("runnerScreen", "levelp");
        console.log("cerro runner");
        closeGame();

    });

    aboutpBackButton = document.querySelector("#aboutpBackButton");
    aboutpBackButton.addEventListener("click", navigate("aboutp", "levelp"));

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
    galleryBackground = document.querySelector("#galleryp");
    var susyCertificate = document.querySelector("#susyCertificate");
    var rayoCertificate = document.querySelector("#rayoCertificate");
    var milagroCertificate = document.querySelector("#milagroCertificate");
    var gatunaCertificate = document.querySelector("#gatunaCertificate");
    var btnSusy = document.querySelector("#btnSusy");
    var btnRayo = document.querySelector("#btnRayo");
    var btnMilagro = document.querySelector("#btnMilagro");
    var btnGatuna = document.querySelector("#btnGatuna");

    btnSusy.addEventListener("click", () => {
        gallery.style.display = "none";
        susyCertificate.style.display = "block";
        susyCertificate.classList.add("animated", "zoomIn", "faster");
        galleryBackground.classList.add("darkness");
    });
    btnRayo.addEventListener("click", () => {
        gallery.style.display = "none";
        rayoCertificate.style.display = "block";
        rayoCertificate.classList.add("animated", "zoomIn", "faster");
        galleryBackground.classList.add("darkness");
    });

    btnMilagro.addEventListener("click", () => {
        gallery.style.display = "none";
        milagroCertificate.style.display = "block";
        milagroCertificate.classList.add("animated", "zoomIn", "faster");
        galleryBackground.classList.add("darkness");
    });

    btnGatuna.addEventListener("click", () => {
        gallery.style.display = "none";
        gatunaCertificate.style.display = "block";
        gatunaCertificate.classList.add("animated", "zoomIn", "faster");
        galleryBackground.classList.add("darkness");
    });

    btntoPage = document.querySelector("#btnToFuper");
    btntoPage.addEventListener("click", function() {
        window.open("http://fundacionfuper.org/", "_blank");
    });

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
    galleryBackground.classList.remove("darkness");
}

function toBackMilagro() {
    milagroCertificate.style.display = "none";
    gallery.style.display = "block";
    galleryBackground.classList.remove("darkness");
}

function toBackRayo() {
    rayoCertificate.style.display = "none";
    gallery.style.display = "block";
    galleryBackground.classList.remove("darkness");
}

function toBackGatuna() {
    gatunaCertificate.style.display = "none";
    gallery.style.display = "block";
    galleryBackground.classList.remove("darkness");
}

//Game functions

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
                show("balloonsScreen");
                startBalloonGame();
                break;
            case 4:
                show("runnerScreen");
                openRunnerGame();
                break;
        }
    };
}

function endVideo() {
    var vid = document.getElementById('gameVideo');
    vid.currentTime = vid.duration;
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
                hide("balloonsScreen");
                break;
            case 4:
                hide("runnerScreen");
                closeRunnerGame();
                break;
        }
        show("gameVideoScreen");
        gameVideo.src = unlockVideoSrc;
        gameVideo.style.display = "block";
        gameVideo.load();
        gameVideo.play();
        document.getElementById("unlockBackButton").style.display = "block";
        var btnGallery = document.getElementById("unlockGalleryButton");
        btnGallery.style.display = "block";
    } else {
        switch (indexGame) {
            case 1:
                hide("antonymsScreen");
                break;
            case 2:
                hide("wordsScreen");
                break;
            case 3:
                hide("balloonsScreen");
                break;
            case 4:
                hide("runnerScreen");
                closeRunnerGame();
                break;
        }
        document.getElementById("playAgain").style.display = "block";
        document.getElementById("againVideo").play();
        getUnlockedCharacters();
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
        case 3:
            endBalloonsGame();
            hide("balloonsScreen");
            show("levelp");
            break;
        case 4:
            closeRunnerGame();
            hide("runnerScreen");
            show("levelp");
            break;
    }
    getUnlockedCharacters();
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
                show("balloonsScreen");
                startBalloonGame();
                break;
            case 4:
                show("runnerScreen");
                openRunnerGame();
                break;
        }
    };
}

function victory(character, unlocked) {
    localStorage.setItem(character, unlocked);
}

function getUnlockedCharacters() {
    if (localStorage.getItem("Milagro") == 1) {
        document.querySelector("#btnMilagro").style.visibility = "visible";
    }
    if (localStorage.getItem("Susy") == 1) {
        document.querySelector("#btnSusy").style.visibility = "visible";
    }
    if (localStorage.getItem("Gatuna") == 1) {
        document.querySelector("#btnGatuna").style.visibility = "visible";
    }
    if (localStorage.getItem("Rayo") == 1) {
        document.querySelector("#btnRayo").style.visibility = "visible";
    }
    gameVideo.pause();
}

function skipIntro1() {
    tutorialVideo.src = "assets/video/Tutorial2.mp4";
    tutorialVideo.play();
    tutorialVideo.onclick = toMenu;
    tutorialVideo.onended = toMenu;
}

function toMenu() {
    backgroundMusic.play();
    tutorialVideo.pause();
    hide("tutorial");
    show("levelp");
}

function showGallery(){
    switch (indexGame) {
        case 3:
            hide("balloonsScreen");
            show("galleryp");
            break;
    }

    getUnlockedCharacters();
}
