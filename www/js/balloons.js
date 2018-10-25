// var balloons=document.getElementsByClassName("balloon");
TweenMax.to(".balloon", 10, {y:-1000});

//Hide Balloons
var greenBalloon = document.querySelector('#greenBalloon');
var purpleBalloon = document.querySelector('#purpleBalloon');
var pinkBalloon = document.querySelector('#pinkBalloon');

var manager = new Hammer.Manager(greenBalloon);
var manager1=new Hammer.Manager(purpleBalloon);
var manager2=new Hammer.Manager(pinkBalloon);
var Tap = new Hammer.Tap({
  taps: 1
});
manager.add(Tap);
manager1.add(Tap);
manager2.add(Tap);

manager.on('tap', tap);
manager1.on('tap', tap);
manager2.on('tap', tap);

function tap(e){
    e.target.classList.toggle('hidden');
}