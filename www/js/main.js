var lvlup = false;
var countVideo, gameVideo, backgroundMusic, indexGame, unlockVideoSrc;
var tutorialVideo = document.querySelector("#tutorialVideo");
var app = {
  initialize: function() {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
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
  var gallerypSoundOffButton;
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
  muteResources(localStorage.getItem("Muted") === "1");

  // Navigation
  document.getElementById("loadp").style.display = "block";
  var splashScreen = document.getElementById("splashScreen");
  splashScreen.play();
  splashScreen.onended = function() {
    document.getElementById("loadp").style.display = "none";
    document.getElementById("menup").style.display = "block";
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
  };

  if (!localStorage.getItem("Muted")) {
    localStorage.setItem("Muted", 0);
  }
  gallerypSoundOffButton = document.querySelector("#bToggleSound");
  gallerypSoundOffButton.src =
    localStorage.getItem("Muted") === "1"
      ? "assets/img/buttons/SoundOff.png"
      : "assets/img/buttons/SoundOn.png";

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
    openGame(
      1,
      "assets/video/GatunaIntro.mp4",
      "assets/video/GatunaUnlock.mp4"
    );
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
    openGame(
      3,
      "assets/video/MilagroIntro.mp4",
      "assets/video/MilagroUnlock.mp4"
    );
  });

  lvl4Button = document.querySelector("#lvl4Button");
  lvl4Button.addEventListener("click", function() {
    openGame(4, "assets/video/RayoIntro.mp4", "assets/video/RayoUnlock.mp4");
  });

  levelpBackButton = document.querySelector("#levelpBackButton");
  levelpBackButton.addEventListener("click", navigate("levelp", "aboutp"));

  antonymsScreenBackButton = document.querySelector(
    "#antonymsScreenBackButton"
  );
  antonymsScreenBackButton.addEventListener("click", function() {
    closeGame();
  });
  balloonsScreenBackButton = document.querySelector(
    "#balloonsScreenBackButton"
  );
  balloonsScreenBackButton.addEventListener("click", function() {
    balloonsCloseGame();
    closeGame();
  });

  btnPlayAgain = document.querySelector("#btnPlayAgainDiv");
  btnPlayAgain.addEventListener("click", playAgain);

  btnUnlockBack = document.getElementById("unlockBackButton");
  btnUnlockBack.addEventListener("click", function() {
    gameVideo.pause();
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
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
  runnerScreenBackButton.addEventListener("click", () => {
    closeGame();
  });

  aboutpBackButton = document.querySelector("#aboutpBackButton");
  aboutpBackButton.addEventListener("click", navigate("aboutp", "levelp"));

  backButtonplayAgain = document.querySelector("#playAgainBackButton");
  backButtonplayAgain.addEventListener(
    "click",
    navigate("playAgain", "levelp")
  );

  galleryBackButton = document.querySelector("#gallerypBackButton");
  galleryBackButton.addEventListener("click", () => {
    toBackCert();
    hide("galleryp");
    show("levelp");
  });

  gallerypBackButton = document.querySelector("#imggallery");
  gallerypBackButton.addEventListener("click", function() {
    hide("levelp");
    show("galleryp");
    getUnlockedCharacters();
  });

  gallerypSoundOffButton.addEventListener("click", () => {
    var muted;
    if (localStorage.getItem("Muted") === "1") {
      localStorage.setItem("Muted", 0);
      backgroundMusic.play();
      gallerypSoundOffButton.src = "assets/img/buttons/SoundOn.png";
      muted = false;
    } else {
      localStorage.setItem("Muted", 1);
      gallerypSoundOffButton.src = "assets/img/buttons/SoundOff.png";
      muted = true;
    }
    muteResources(muted);
  });

  fuperButton = document.querySelector("#btnFuper");
  fuperButton.addEventListener("click", navigate("aboutp", "fuperp"));

  fuperBackButton = document.querySelector("#fuperBackButton");
  fuperBackButton.addEventListener("click", navigate("fuperp", "aboutp"));

  creditsBackButton = document.querySelector("#creditsBackButton");
  creditsBackButton.addEventListener("click", navigate("creditsp", "aboutp"));

  creditsScreen = document.querySelector("#creditsp");
  creditsNextButton = document.querySelector("#creditsNext");
  creditsBackButton = document.querySelector("#creditsBack");

  creditsNextButton.addEventListener("click", () => {
    creditsScreen.style.backgroundImage =
      "url('assets/img/credits/Credits2.png')";
    creditsNextButton.style.visibility = "hidden";
    creditsBackButton.style.visibility = "visible";
  });

  creditsBackButton.addEventListener("click", () => {
    creditsScreen.style.backgroundImage =
      "url('assets/img/credits/Credits1.png')";
    creditsNextButton.style.visibility = "visible";
    creditsBackButton.style.visibility = "hidden";
  });

  aboutCreditsButton = document.querySelector("#btnCredits");
  aboutCreditsButton.addEventListener("click", navigate("aboutp", "creditsp"));

  gallery = document.querySelector(".gallery");
  galleryBackground = document.querySelector("#galleryp");
  certificates = [
    document.querySelector("#gatunaCertificate"),
    document.querySelector("#susyCertificate"),
    document.querySelector("#milagroCertificate"),
    document.querySelector("#rayoCertificate")
  ];

  certButtons = [
    document.querySelector("#btnGatuna"),
    document.querySelector("#btnSusy"),
    document.querySelector("#btnMilagro"),
    document.querySelector("#btnRayo")
  ];

  btntoPage = document.querySelector("#btnToFuper");
  btntoPage.addEventListener("click", function() {
    window.open("http://fundacionfuper.org/", "_blank");
  });

  function muteResources(muted) {
    var videos = document.getElementsByTagName("video");
    for (let i = 0; i < videos.length; i++) {
      videos[i].muted = muted;
    }
    var audios = document.getElementsByTagName("audio");
    for (let i = 0; i < audios.length; i++) {
      audios[i].muted = muted;
    }
  }

  function openGame(index, introVideoSrc, unlockVidSrc) {
    indexGame = index;
    unlockVideoSrc = unlockVidSrc;
    backgroundMusic.pause();
    gameVideo.src = introVideoSrc;
    hide("levelp");
    show("gameVideoScreen");
    gameVideo.onclick = playGame;
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

function showCert(indexCharacter) {
  gallery.style.display = "none";
  certificates[indexCharacter - 1].style.display = "block";
  certificates[indexCharacter - 1].classList.add(
    "animated",
    "zoomIn",
    "faster"
  );
  galleryBackground.classList.add("darkness");
}

function toBackCert() {
  certificates.forEach(certificate => {
    if (certificate.className.includes("zoomIn")) {
      certificate.classList.add("zoomOut");
      gallery.style.display = "block";
      galleryBackground.classList.remove("darkness");
      setTimeout(() => {
        certificate.classList.remove("zoomOut", "zoomIn");
        certificate.style.display = "none";
      }, 500);
    }
  });
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
    backgroundMusic.volume = 1;
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
    gameVideo.onclick = null;
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
  backgroundMusic.volume = 0.5;
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
      //endBalloonsGame();
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

function showGallery() {
  switch (indexGame) {
    case 3:
      hide("balloonsScreen");
      show("galleryp");
      break;
  }

  getUnlockedCharacters();
}
