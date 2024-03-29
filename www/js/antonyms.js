var ma_currentImg;
var MA_COUNT;
var MA_COUNTFINAL = 4;
var MA_PAIRS = 4;
var cards = [1, 2, 3, 4, 5, 6, 7, 8];
var cardsPairs = [
  [1, 2],
  [2, 1],
  [3, 4],
  [4, 3],
  [5, 6],
  [6, 5],
  [7, 8],
  [8, 7]
];
var initialImg;
var lastImg;
var changeCard;
var cardHeight;
var cardWidth;
var cardsArray;
var ma_fn;

function openAntonymsGame() {
  var canvas = document.getElementById("cardsContainer");

  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  TweenMax.killAll();
  ma_currentImg = undefined;
  MA_COUNT = 0;
  MA_PAIRS = 4;
  renderCards();
  setCardsDimensions();
  //setTimeout(maCountEnd,20000);

  if (ma_fn) {
    clearTimeout(ma_fn);
  }

  ma_fn = setTimeout(function() {
    maCountEnd();
  }, 20000);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function verifyMatch(e) {
  cardHeight = e.target.height;
  cardWidth = e.target.width;

  if (!ma_currentImg) {
    ma_currentImg = e.target;
    new TweenMax.fromTo(
      ma_currentImg,
      0.1,
      {
        width: cardWidth,
        height: cardHeight,
        borderColor: "rgba(15,94,94,0)",
        borderStyle: "none",
        ease: Power0.easeIn
      },
      {
        width: cardHeight + 10,
        height: cardHeight + 10,
        borderStyle: "solid",
        borderColor: "rgba(15,94,94,1.0)",
        ease: Power0.easeOut
      }
    );
    initialImg = ma_currentImg;
  } else if (ma_currentImg.id != e.target.id) {
    lastImg = e.target;
    blockCards(true, cardsArray, initialImg.id, lastImg.id);
    if (
      !compareArrays(cardsPairs, [
        parseInt(ma_currentImg.id),
        parseInt(e.target.id)
      ])
    ) {
      new TweenMax.fromTo(
        e.target,
        0.1,
        {
          width: cardWidth,
          height: cardHeight,
          borderStyle: "none",
          borderColor: "rgba(15,94,94,0)",
          ease: Power0.easeIn,
          onStart: removeCardsEvent(true)
        },
        {
          width: cardHeight + 10,
          height: cardHeight + 10,
          borderStyle: "solid",
          borderColor: "rgba(15,94,94,1.0)",
          ease: Power0.easeOut,
          onComplete: shakeCards
        }
      );
    } else {
      lastImg = e.target;
      blockCards(true, cardsArray, initialImg.id, lastImg.id);
      MA_PAIRS--;
      new TweenMax.fromTo(
        e.target,
        0.1,
        {
          width: cardWidth,
          height: cardHeight,
          borderColor: "rgba(15,94,94,0)",
          borderStyle: "none",
          ease: Power0.easeIn
        },
        {
          width: cardHeight + 10,
          height: cardHeight + 10,
          borderColor: "rgba(15,94,94,1.0)",
          borderStyle: "solid",
          ease: Power0.easeOut,
          onComplete: function() {
            changeCard = new TweenMax.to([initialImg, e.target], 0.7, {
              delay: 0.4,
              rotationY: "-180",
              onComplete: resizeCards
            });
            new TweenMax.set([initialImg, e.target], {
              delay: 0.6,
              borderStyle: "none",
              onStart: changeForWood
            });
            lastImg.onclick = null;
            initialImg.onclick = null;
          }
        }
      );
      MA_COUNT++;
    }
    ma_currentImg = null;
  }
}

function removeCardsEvent(option) {
  initialImg.onclick = option ? null : verifyMatch;
  lastImg.onclick = option ? null : verifyMatch;
}

function shakeCards() {
  new TweenMax.to([initialImg, lastImg], 0.1, {
    x: "+=10",
    onStart: shakeVibration,
    onComplete: function() {
      new TweenMax.to([initialImg, lastImg], 0.1, {
        x: "-=20",
        onComplete: function() {
          new TweenMax.to([initialImg, lastImg], 0.1, {
            x: "+=10",
            onComplete: function() {
              new TweenMax.fromTo(
                [initialImg, lastImg],
                0.1,
                {
                  width: cardHeight + 10,
                  height: cardHeight + 10,
                  borderStyle: "solid",
                  borderColor: "rgba(15,94,94,1.0)",
                  ease: Power0.easeIn
                },
                {
                  width: cardWidth,
                  height: cardHeight,
                  borderColor: "rgba(15,94,94,0)",
                  borderStyle: "none",
                  ease: Power0.easeOut,
                  onComplete: function() {
                    blockCards(false, cardsArray, initialImg.id, lastImg.id);
                  }
                }
              );
            }
          });
        }
      });
    }
  });
}

function shakeVibration() {
  navigator.vibrate([100, 50, 100]);
}

function blockCards(option, array, card1, card2) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].currentSrc.includes("wood")) {
      array[i].onclick = null;
    } else if (array[i].id != card1 && array[i].id != card2) {
      array[i].onclick = option ? null : verifyMatch;
    } else {
      array[i].onclick = verifyMatch;
    }
  }
}

function completePairs() {
  blockCards(false, cardsArray, initialImg.id, lastImg.id);
  if (MA_COUNT == MA_COUNTFINAL && MA_PAIRS == 0) {
    console.log("Ganaste");
    victory("Gatuna", 1);
    clearTimeout(ma_fn);
    finalizeGame(true);
  }
}

function changeForWood() {
  initialImg.src = "assets/img/antonyms/wood.png";
  lastImg.src = "assets/img/antonyms/wood.png";
}

function resizeCards() {
  new TweenMax.fromTo(
    [initialImg, lastImg],
    0.05,
    { width: cardHeight + 10, height: cardHeight + 10, ease: Power0.easeIn },
    {
      width: cardWidth,
      height: cardHeight,
      ease: Power0.easeOut,
      onComplete: completePairs
    }
  );
}

function renderCards() {
  shuffle(cards);
  var canvas = document.getElementById("cardsContainer");
  var html = "";
  var index;
  for (var i = 0; i < 2; i++) {
    html += '<div class="cardsRow">';
    for (var j = 0; j < 4; j++) {
      index = i === 0 ? j : j + 4;
      html += `<div id="cardContainer${
        cards[index]
      }" class="cardContainer"><img id="${
        cards[index]
      }" src="assets/img/antonyms/${
        cards[index]
      }.png" class="card" onclick="verifyMatch(event);" /></div>`;
    }
    html += "</div>";
  }
  canvas.innerHTML = html;
}

function setCardsDimensions() {
  var cardContainer = document.getElementById("cardContainer1");
  var cardHeight = cardContainer.clientHeight;
  cardsArray = document.querySelectorAll(".card");

  for (var i = 0; i < cardsArray.length; i++) {
    cardsArray[i].style.width = cardHeight - 15 + "px";
    cardsArray[i].style.height = cardHeight - 15 + "px";
  }
}

function compareArrays(a, b) {
  var b_string = JSON.stringify(b);
  var contains = a.some(function(ele) {
    return JSON.stringify(ele) === b_string;
  });
  return contains;
}

function maCountEnd() {
  var screen = document.getElementById("antonymsScreen");
  if (MA_COUNT != MA_COUNTFINAL && screen.style.display == "block") {
    console.log("Perdiste");
    var gatunaUnlocked = localStorage.getItem("Gatuna");
    if (gatunaUnlocked == 1) {
      victory("Gatuna", 1);
    } else {
      victory("Gatuna", 0);
    }
    finalizeGame(false);
  }
}
