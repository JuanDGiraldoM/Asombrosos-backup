document.addEventListener("DOMContentLoaded", function(event) { 
	var canvas = document.getElementById('runnerCanvas');
	var ctx = canvas.getContext('2d');
	var cWidth = canvas.width;
	var cHeight = canvas.height;
	var playerX = 50;
	var playerY = cHeight-30;
	var yVelocity = 0.3;
	var xVelocity = -0.2;
	var yLimit = cHeight-30;
	var progress = 100;

	function startup() {
		var el = document.getElementsByTagName("canvas")[0];
		el.addEventListener("touchstart", ()=>{yVelocity = -2; xVelocity = 0.5; playerY-=10}, false);
		//el.addEventListener("touchend", handleEnd, false);
		//el.addEventListener("touchcancel", handleCancel, false);
		//el.addEventListener("touchleave", handleLeave, false);
		//el.addEventListener("touchmove", handleMove, false);
	}

	gravity = function (velocity) {
    	return velocity + 0.08;
	};
	
	drawRect = function (x, y, radius, color) {
		var canvas = document.getElementById("runnerCanvas");
		var ctx = canvas.getContext('2d');		
	    ctx.beginPath();
	    ctx.rect(x, y ,50 ,10);
		ctx.stroke();
		ctx.fillRect(0,0,progress,10);
	};

	clearScreen = function () {
	    var canvas = document.getElementById("runnerCanvas");
	    var ctx = canvas.getContext("2d");
	    ctx.clearRect(0, 0, cWidth, cHeight);
	};

	main = function () {
		if (playerY == yLimit && yVelocity < 0) {
			//holi
		} else if (playerY < yLimit) {
			yVelocity = gravity(yVelocity);
			playerY += yVelocity;
			playerX += xVelocity;
			progress -= 0.1;
		} 
		// else if (playerY == yLimit-20) {
		// 	yVelocity = 3;
		// } 
		else if(playerX > 70){
			playerX -= 0.6;
		}
		if(playerY < 0){
			playerY = 0.05;
			yVelocity = 0.5;
		}
		
		clearScreen();
		drawRect(playerX, playerY, 10, 10);
		setTimeout(main, 10);
	};

	startup();
	main();
});