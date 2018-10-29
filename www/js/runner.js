document.addEventListener("DOMContentLoaded", function(event) { 
	var canvas = document.getElementById('runnerCanvas');
	var ctx = canvas.getContext('2d');
	var cWidth = canvas.width;
	var cHeight = canvas.height;
	var playerX = 50;
	var playerY = cHeight-30;
	var yVelocity = 0.3;
	var yLimit = cHeight-30;

	function startup() {
		var el = document.getElementsByTagName("canvas")[0];
		el.addEventListener("touchstart", ()=>{yVelocity = -3; playerY-=10}, false);
		//el.addEventListener("touchend", handleEnd, false);
		//el.addEventListener("touchcancel", handleCancel, false);
		//el.addEventListener("touchleave", handleLeave, false);
		//el.addEventListener("touchmove", handleMove, false);
	}

	gravity = function (velocity) {
    	return velocity + 0.1;
	};
	
	drawRect = function (x, y, radius, color) {
	    var canvas = document.getElementById("runnerCanvas");
	    var ctx = canvas.getContext("2d");
	    ctx.beginPath();
	    ctx.rect(x, y ,10 ,10);
		ctx.stroke();
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
		} else if (playerY == yLimit-20) {
			yVelocity = 3;
		}
		
		clearScreen();
		drawRect(playerX, playerY, 10, 10);
		setTimeout(main, 10);
	};

	startup();
	main();
});