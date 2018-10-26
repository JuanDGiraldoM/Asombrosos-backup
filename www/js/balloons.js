var i = 0;
var ancho = screen.width;
console.log(ancho);
// var pos = document.getElementById("balloon1");
// pos.setAttribute("style", "left:"+(Math.floor(Math.random() * ancho / 100 * 35) + 20)+";");
// var pos2 = document.getElementById("balloon2");
// pos2.setAttribute("style", "left:"+(Math.floor(Math.random() * ancho / 100 * 35) + 20)+";");
// var pos3 = document.getElementById("balloon3");
// pos3.setAttribute("style", "left:"+(Math.floor(Math.random() * ancho / 100 * 35) + 20)+";");
    
// var pos4 = document.getElementById("balloon4");
// var pos5 = document.getElementById("balloon5");
// var pos6 = document.getElementById("balloon6");
// var pos7 = document.getElementById("balloon7");
// var pos8 = document.getElementById("balloon8");
// var pos9 = document.getElementById("balloon9");
//var pos = document.getElementsByClassName("balloon");


for (i = 0; i < 2; i++) {
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon1' src='img/balMorado.png' style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon2' src='img/balRosa.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon3' src='img/balVerde.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon4' src='img/balAzul.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon5' src='img/balLila.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon6' src='img/balNaranja.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon7' src='img/balRojo.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon8' src='img/balSalmon.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon9' src='img/balMenta.png'style='left:"+ (Math.floor(Math.random() * ancho / 100 * 35) + 20)+" '/>");
}

TweenMax.to(".balloon", 10, { y: -1000});

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

