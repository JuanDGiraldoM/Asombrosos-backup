// var balloons=document.getElementsByClassName("balloon");
TweenMax.to(".balloon", 10, {y:-1000});

//Hide Balloons
var greenBalloon = document.querySelector('#greenBalloon');
var purpleBalloon = document.querySelector('#purpleBalloon');
var pinkBalloon = document.querySelector('#pinkBalloon');
var blueBalloon = document.querySelector('#blueBalloon');
var lilacBalloon = document.querySelector('#lilacBalloon');
var orangeBalloon = document.querySelector('#orangeBalloon');
var redBalloon = document.querySelector('#redBalloon');
var salmonBalloon = document.querySelector('#salmonBalloon');

var manager = new Hammer.Manager(greenBalloon);
var manager1=new Hammer.Manager(purpleBalloon);
var manager2=new Hammer.Manager(pinkBalloon);
var manager3=new Hammer.Manager(blueBalloon);
var manager4=new Hammer.Manager(lilacBalloon);
var manager5=new Hammer.Manager(orangeBalloon);
var manager6=new Hammer.Manager(redBalloon);
var manager7=new Hammer.Manager(salmonBalloon);

var Tap = new Hammer.Tap({
  taps: 1
});
manager.add(Tap);
manager1.add(Tap);
manager2.add(Tap);
manager3.add(Tap);
manager4.add(Tap);
manager5.add(Tap);
manager6.add(Tap);
manager7.add(Tap);

manager.on('tap', tap);
manager1.on('tap', tap);
manager2.on('tap', tap);
manager3.on('tap', tap);
manager4.on('tap', tap);
manager5.on('tap', tap);
manager6.on('tap', tap);
manager7.on('tap', tap);
function tap(e){
    e.target.classList.toggle('hidden');
}