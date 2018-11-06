window.onload = init;

var score;
var gameSection, scoreSection, btnToScore,introSection,btnToGame;
var balloon1, balloon2, balloon3, balloon4, ballon5, balloon6, balloon7, balloon8, balloon9,btnRestart;
var hiddenBalloon;
var partialScore = 0;
var finalScore;
var theBalloon;
var ballColours = ["balMorado.png", "balRosa.png", "balVerde.png", "balAzul.png", "balLila.png", "balNaranja.png", "balRojo.png", "balSalmon.png","balMenta.png"];
var ballTime = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var ballPos= [-1000,-900]
var balCountVideo,balIntroVideo;
function init() {
    score = document.getElementById('balloonsScore');
    finalScore=document.getElementById('finalScore');
    gameSection = document.getElementById('balloonGame');
    scoreSection = document.getElementById('balloonsScoreSection');
    balCountVideo=document.querySelector("#balCount");
    balIntroVideo=document.querySelector("#introVideo");
    balIntroVideo.play();
    balIntroVideo.onended = skipIntroBalVideo;

    function skipIntroBalVideo(){
        balIntroVideo.parentNode.removeChild(balIntroVideo);
        balCountVideo.play();
        balCountVideo.onended = skipCountBalVideo;
    }


    function skipCountBalVideo() {
        balCountVideo.parentNode.removeChild(balCountVideo);
        openBalloonGame();
    }
    function openBalloonGame (){
        music.play();
        this.balloons = 60;
        this.balloonsArr = [];
        var height = window.innerHeight;
        var ancho = screen.height;
  
        for (i = 0; i < this.balloons; i++) {
            var newBalloon = new Balloon();
            newBalloon.ball();
        };
    
        function Balloon(left, top) {
            this.id = balloonsArr.length;
          
            this.animate = function() {
                TweenMax.to("#balloon" + this.id,ballTime[Math.floor(Math.random() * ballTime.length)] , {ease: Power0.easeOut, top: ballPos[Math.floor(Math.random() * ballPos.length)] });
                //TweenMax.to("#balloon" + this.id,ballTime[Math.floor(Math.random() * ballTime.length)] , {ease: Power1.easeIn, top: ballPos[Math.floor(Math.random() * ballPos.length)] });
                //TweenMax.to("#balloon" + this.id,ballTime[Math.floor(Math.random() * ballTime.length)] , {ease: Power2.easeIn, top: ballPos[Math.floor(Math.random() * ballPos.length)] });
                //TweenMax.to("#balloon" + this.id,ballTime[Math.floor(Math.random() * ballTime.length)] , {ease: Power3.easeIn, top: ballPos[Math.floor(Math.random() * ballPos.length)] });
                //TweenLite.to("#balloon" + this.id,ballTime[Math.floor(Math.random() * ballTime.length)] , {ease: Expo.easeIn, top: ballPos[Math.floor(Math.random() * ballPos.length)] });
                //TweenMax.to("#balloon" + this.id,ballTime[Math.floor(Math.random() * ballTime.length)] , {ease: Expo.easeInOut, top: ballPos[Math.floor(Math.random() * ballPos.length)] });
            }
            
            this.ball = function() {
                
                var image = document.createElement("img");
                image.id = "balloon" + this.id;
                image.className = "balloon";
                image.src = "img/balloons/" + ballColours[Math.floor(Math.random() * ballColours.length)];
                image.style.left = (Math.floor(Math.random() * 600 ) ) + "px";
                document.getElementById("theBalloon").insertAdjacentElement('beforeend', image); 
                balloonsArr.push(this);

                this.animate();
            }
        }
    
        theBalloon=document.getElementById('theBalloon');
        hiddenBalloon = theBalloon.getElementsByClassName('hidden');
        var balloons = document.querySelector("#theBalloon");
        var manager = new Hammer.Manager(balloons);
        var Tap = new Hammer.Tap({
            taps: 1
        });
        
        manager.add(Tap);
        manager.on('tap', tap);
        function tap(e) {
            e.target.classList.toggle('hidden');
            // console.log(hidenBalloon.length);
            partialScore=hiddenBalloon.length;
            score.innerHTML=partialScore;
            finalScore.innerHTML=partialScore;
        }
         
        setTimeout(function(){
            console.log("Cambio de section");
            gameSection.classList.remove('animationIn');
            gameSection.classList.add('animationOut');
            scoreSection.style.display = "block";
            scoreSection.classList.add('animationIn');
            music.pause();
            
        },15000);
    }
}
