var wordsWinner = false,
  wordsActive = false;

function openWordsGame() {
  var height = window.innerHeight,
    width = window.innerWidth,
    wordsContainer = document.querySelector(".wordsContainer"),
    wordsScore = 0,
    timeFall = 8,
    timeLaunch = 1250;
  wordsContainer.style.visibility = "visible";
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
          explotion.load();
          explotion.play();
          wordsScore += 5;
          word.classList.add("animated", "fadeOut", "faster");
          updateScore();
          validateScore();
        } else if (
          posCircleY >= positionSusy.bottom &&
          !word.className.includes("animated")
        ) {
          word.classList.add("animated", "flash", "faster");
          shakeVibration();
          wordsWinner = false;
          wordsActive = true;
          setTimeout(finalizeWordsGame, 500);
        }
      });
    } else {
      stopCollisionDetection();
    }
  }

  function updateScore() {
    var scoreContainer = document.querySelector("#wordsScore");
    scoreContainer.innerHTML = "<p>Puntaje: " + String(wordsScore) + "</p>";
    scoreContainer.classList.add("animated", "pulse", "faster");
    setTimeout(function() {
      scoreContainer.classList.remove("pulse");
    }, 500);
  }

  function validateScore() {
    if (wordsScore >= 100) {
      wordsWinner = true;
      wordsActive = true;
      finalizeWordsGame();
    }
  }

  function shakeVibration() {
    navigator.vibrate([100, 50, 100]);
  }
}

function finalizeWordsGame() {
  clearInterval(collisionInterval);
  clearInterval(launchInterval);
  clearInterval(speedInterval);
  var canvas = document.querySelector("#words");
  canvas.innerHTML = "";

  if (wordsActive) {
    wordsActive = false;
    if (wordsWinner) {
      victory("Susy", 1);
      setTimeout(function() {
        finalizeGame(true);
      }, 600);
    } else {
      var susyUnlocked = localStorage.getItem("Susy");
      if (susyUnlocked == 0) {
        victory("Susy", 1);
      } else {
        victory("Susy", 0);
      }
      setTimeout(function() {
        finalizeGame(false);
      }, 600);
    }
  }
}
