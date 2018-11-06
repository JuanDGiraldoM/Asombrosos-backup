//DEPRONTO HACER QUE EL SEGUNDO SALTO SEA MAS CORTO(?)
document.addEventListener("DOMContentLoaded", function(event) { 
	var canvas = document.getElementById('runnerCanvas');
	var ctx = canvas.getContext('2d');
	var cWidth = ctx.canvas.offsetWidth;
	var cHeight = ctx.canvas.offsetHeight;
	var playerX = cWidth*0.15;
	var playerY = cHeight*0.2;
	var yVelocity = 0.3;
	var yLimit = cHeight*0.55;
	var ratioW = 166/cWidth, ratioH = 288/cHeight;
	var playerWidth = cWidth*ratioW*0.4;
	var playerHeight = cHeight*ratioH*0.4;
	var touchN = 0;
	var frames = 0;
	var barrel = document.getElementById("barrel");

	var barrelX = cWidth*0.15;
	var barrelY = cHeight*0.67;
	var xBarrelVelocity = 0.3;
	var yBarrelLimit = cHeight*0.55;
	var ratioBarrelW = 152/cWidth, ratioBarrelH = 201/cHeight;
	var barrelWidth = cWidth*ratioBarrelW*0.37;
	var barrelHeight = cHeight*ratioBarrelH*0.37;

	function onDrawFrame(ctx, frame) {
		// Match width/height to remove distortion
		ctx.canvas.width  = ctx.canvas.offsetWidth;

		ctx.canvas.height = ctx.canvas.offsetHeight;

		// Determine how many pikachus will fit on screen
		//var n = Math.floor((ctx.canvas.width)/150)

		//for(var x = 0; x < n; x++) {
		// Draw a pikachu
		//var left = 150;
		ctx.globalCompositeOperation = 'source-over';
		ctx.drawImage(frame.buffer, playerX, playerY, playerWidth, playerHeight);
		ctx.drawImage(barrel, barrelX, barrelY, barrelWidth, barrelHeight);

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

	function startup() {
		var el = document.getElementsByTagName("canvas")[0];
		el.addEventListener("touchstart", ()=>{
			if (touchN < 2) {
				yVelocity = -3; 
				playerY-=10; 
			}
			touchN++;
		}, {passive:true});
		//el.addEventListener("touchend", handleEnd, false);
		//el.addEventListener("touchcancel", handleCancel, false);
		//el.addEventListener("touchleave", handleLeave, false);
		//el.addEventListener("touchmove", handleMove, false);
	}

	gravity = function (velocity) {
    	return velocity + 0.055;
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
		} else if (playerY < yLimit) {
			yVelocity = gravity(yVelocity);
			playerY += yVelocity;
		} else if (playerY == yLimit-20) {
			yVelocity = 3;
		}else{
			touchN = 0;
		}
		//clearScreen();
		//drawRect(playerX, playerY, 10, 10);

		
		/*
		var velx = .25;
		// s -> 0		10		20		
		// v -> .25		.75		1.25		
		settimeout con cada uno de esos^
		var lista = [obst1, obst2 ....]

		foreach obst in lista:
			obst += velx
			drawRect(playerX, playerY, 10, 10)

		*/


		setTimeout(main, 10);
	};

	startup();
	main();

});


