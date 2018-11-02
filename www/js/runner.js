document.addEventListener("DOMContentLoaded", function(event) { 
	var canvas = document.getElementById('runnerCanvas');
	var ctx = canvas.getContext('2d');
	var cWidth = canvas.width;
	var cHeight = canvas.height;
	var playerX = cWidth*0.3;
	var playerY = cHeight*0.2;
	var yVelocity = 0.3;
	var xVelocity = -0.2;
<<<<<<< HEAD
	var yLimit = cHeight*1.5;

	var frames = 0;

	function onDrawFrame(ctx, frame) {
	// Match width/height to remove distortion
	ctx.canvas.width  = ctx.canvas.offsetWidth;
	ctx.canvas.height = ctx.canvas.offsetHeight;

	// Determine how many pikachus will fit on screen
	//var n = Math.floor((ctx.canvas.width)/150)

	//for(var x = 0; x < n; x++) {
	// Draw a pikachu
	var left = 150;
	ctx.globalCompositeOperation = 'source-over';
	ctx.drawImage(frame.buffer, playerX + left, playerY, 83, 144);

	// Composite a color
	//var hue = (frames * 10 + x * 50) % 360;
	//ctx.globalCompositeOperation = 'source-atop';
	//ctx.fillStyle = 'hsla(' + hue + ', 100%, 50%, 0.5)';
	//ctx.fillRect(left, 0, 150, this.height);
	//}
	frames++;
	}

    gifler('img/RAYO-CORRIENDO-PERSONAJE.gif')
    .frames('canvas.noPikachu', onDrawFrame);
=======
	var yLimit = cHeight-30;
>>>>>>> 8208b5f8a7dd1dc7d83b9f238d4e68f855a4a193

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
			playerX += xVelocity;
		} 
<<<<<<< HEAD
		//else if (playerY == yLimit-20) {
		//	yVelocity = 3;
		//}
=======
		// else if (playerY == yLimit-20) {
		// 	yVelocity = 3;
		// } 
>>>>>>> 8208b5f8a7dd1dc7d83b9f238d4e68f855a4a193
		else if(playerX > 70){
			playerX -= 0.6;
		}
		if(playerY < 0){
			playerY = 0.05;
			yVelocity = 0.5;
		}
		
		//clearScreen();
		//drawRect(playerX, playerY, 10, 10);
		setTimeout(main, 10);
	};

	startup();
	main();
});