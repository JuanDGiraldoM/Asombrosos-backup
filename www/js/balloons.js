window.onload = init;

var unloaded_candles, loaded_candles, loading_screen;
var score;
var gameSection, scoreSection, btnToScore,introSection,btnToGame;
var balloon1, balloon2, balloon3, balloon4, ballon5, balloon6, balloon7, balloon8, balloon9,btnRestart;
var hiddenBalloon;
var partialScore = 0;
var finalScore;
var theBalloon;
var colours = ["balMorado.png", "balRosa.png", "balVerde.png", "balAzul.png", "balLila.png", "balNaranja.png", "balRojo.png", "balSalmon.png","balMenta.png"];
var balCountVideo,balIntroVideo;
function init() {
    // introSection=document.getElementById('balloonIntro');
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
        this.balloons = 60;
        this.balloonsArr = [];
        var ancho = screen.height;
  
        for (i = 0; i < this.balloons; i++) {
            var newBalloon = new Balloon();
            newBalloon.ball();
        };
    
        function Balloon(left, top) {
            this.id = balloonsArr.length;
          
            this.animate = function() {
                TweenMax.to("#balloon" + this.id, (Math.floor(Math.random() * ancho)) * 0.01 +3, {ease: Power0.easeOut, y: -1000});
            }
            
            this.ball = function() {
                document.getElementById("theBalloon").insertAdjacentHTML('beforeend', "<img class='balloon' id='balloon"+this.id+"' src='img/balloons/"+colours[Math.floor(Math.random() * colours.length)]  +"' style='left:" + (Math.floor(Math.random() * 600 ) ) + "px '/>");  
                balloonsArr.push(this);
                this.animate();
            }
        }
    
        theBalloon=document.getElementById('theBalloon');
        hiddenBalloon = theBalloon.getElementsByClassName('hidden');
        //TweenMax.to(".balloon", 10, { y: -1000});
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
            
        },15000);
        // setTimeout(function(){
        //     console.log("Cambio de section");
        //     introSection.classList.remove('animationIn');
        //     introSection.classList.add('animationOut');
        //     gameSection.style.display = "block";
        //     gameSection.classList.add('animationIn');
            
        // },3000);
    }
    

}
