var i = 0;
for (i = 0; i < 9; i++) {
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon2' src='img/balMorado.png'/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon1' src='img/balVerde.png'/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon3' src='img/balRosa.png'/>");
}

TweenMax.to(".balloon", 10, { y: -1000, scale: 0.5 });

var balloons = document.querySelector("#theBalloon");
var manager = new Hammer.Manager(balloons);
var Tap = new Hammer.Tap({
    taps: 1
})
manager.add(Tap);
manager.on('tap', tap);
function tap(e) {
    e.target.classList.toggle('hidden');
}

