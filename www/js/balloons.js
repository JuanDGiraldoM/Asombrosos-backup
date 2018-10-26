var i = 0;
var ancho = screen.height;
console.log(ancho);


// var num=(Math.floor(Math.random()*ancho));
for (i = 0; i < 2; i++) {
    
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon1' src='img/balMorado.png' style='right:"+ (Math.floor(Math.random() * ancho/100*25 )+(Math.floor(Math.random()*ancho)) )+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon2' src='img/balRosa.png'style='right:"+ (Math.floor(Math.random() * ancho/100*35 )+(Math.floor(Math.random()*ancho)) )+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon3' src='img/balVerde.png'style='right:"+ (Math.floor(Math.random() * ancho/100*45 )+(Math.floor(Math.random()*ancho)))+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon4' src='img/balAzul.png'style='right:"+ (Math.floor(Math.random() * ancho/100*55 )+(Math.floor(Math.random()*ancho)) )+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon5' src='img/balLila.png'style='left:"+ (Math.floor(Math.random() * ancho/100*65)+(Math.floor(Math.random()*ancho)) )+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon6' src='img/balNaranja.png'style='left:"+ (Math.floor(Math.random() * ancho/100*75)+(Math.floor(Math.random()*ancho)))+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon7' src='img/balRojo.png'style='left:"+(Math.floor(Math.random() * ancho/100*85)+(Math.floor(Math.random()*ancho)))+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon8' src='img/balSalmon.png'style='left:"+ (Math.floor(Math.random() * ancho/100*95)+(Math.floor(Math.random()*ancho)))+"px '/>");
    document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon9' src='img/balMenta.png'style='left:"+ (Math.floor(Math.random() * ancho/100*105)+(Math.floor(Math.random()*ancho)))+"px '/>");
    TweenMax.to(".balloon", 10, { y: -1000});

}


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

