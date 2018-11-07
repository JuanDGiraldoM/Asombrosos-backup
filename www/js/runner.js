//DEPRONTO HACER QUE EL SEGUNDO SALTO SEA MAS CORTO(?)
document.addEventListener("DOMContentLoaded", function(event) { 
	var canvas = document.getElementById('runnerCanvas');
	var ctx = canvas.getContext('2d');
	var splashRunner = document.getElementById('splashRunner');
	var cWidth = ctx.canvas.offsetWidth;
	var cHeight = ctx.canvas.offsetHeight;
	var playerX = cWidth*0.15;
	var playerY = cHeight*0.2;
	var yVelocity = 0.3;
	var xVelocity = -0.2;
	var progress = 100;

	var yLimit = cHeight*0.55;
	var ratioW = 166/cWidth, ratioH = 288/cHeight;
	var playerWidth = cWidth*ratioW*0.4;
	var playerHeight = cHeight*ratioH*0.4;
	var touchN = 0;
	var frames = 0;
	var barrel = document.getElementById("barrel");

	var barrelY = cHeight*0.7;
	var xBarrelVelocity = 0;
	var ratioBarrelW = 152/cWidth, ratioBarrelH = 201/cHeight;
	var barrelWidth = cWidth*ratioBarrelW*0.3;
	var barrelHeight = cHeight*ratioBarrelH*0.3;

	var barrelsX = [cWidth+50,cWidth+400,cWidth+750,cWidth+750+barrelWidth];
	var collitionsN = 0;

	splashRunner.addEventListener("ended", ()=> {
		splashRunner.style.display = "none";
		setTimeout(()=> {
			xBarrelVelocity = -5;
			setTimeout(()=> {
				xBarrelVelocity = -8;
			},5000);
			setTimeout(()=> {
				xBarrelVelocity = -10;
			},12000);
		},1000);
	},false);


	function onDrawFrame(ctx, frame) {

		// Match width/height to remove distortion
		ctx.canvas.width  = ctx.canvas.offsetWidth;

		ctx.canvas.height = ctx.canvas.offsetHeight;

		ctx.globalCompositeOperation = 'source-over';
		ctx.drawImage(frame.buffer, playerX, playerY, playerWidth, playerHeight);
		for (var i = 0; i < barrelsX.length ; i++) {
			barrelsX[i] += xBarrelVelocity;
			ctx.drawImage(barrel, barrelsX[i], barrelY, barrelWidth, barrelHeight);
		}

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
	}

	gravity = function (velocity) {
    	return velocity + 0.055;
	};
	
	drawRect = function (x, y, w, h) {
	    var canvas = document.getElementById("runnerCanvas");
	    var ctx = canvas.getContext("2d");
	    ctx.beginPath();
	    ctx.rect(x, y, w, h);
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
			posicion del jugador -> playerX playerY
			lo gordito del jugador -> playerWidth playerHeight

			posicion de la caja -> barrelsX barrelY
			lo gordito de la caja -> barrelWidth barrelHeight
		*/
		
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
		for (var i = 0; i < barrelsX.length ; i++) {
			//drawRect(playerX,playerY,playerWidth*0.9,playerHeight);
			//drawRect(barrelsX[i], barrelY, barrelWidth, barrelHeight);

			if (playerX + playerWidth*0.9 >= barrelsX[i] && playerX + playerWidth*0.9 <= barrelsX[i] + barrelWidth) {
				if (playerY + playerHeight*0.95 >= barrelY) {
					console.log("chocaste");
					collitionsN++;
					if (collitionsN > 8) {
						console.log("bajaste energia :c");
					}
				} else {
					collitionsN = 0;
				}
			}
		}


		setTimeout(main, 10);
	};

	startup();
	main();
	splashRunner.play();
});


