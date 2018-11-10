// document.addEventListener("DOMContentLoaded", function(event) {
function openRunnerGame() { 
    var canvas = document.getElementById('runnerCanvas');
    var ctx = canvas.getContext('2d');
	var cWidth = ctx.canvas.offsetWidth;
	var cHeight = ctx.canvas.offsetHeight;
	var yLimit = cHeight*0.55;
	var touchN = 0;
	var frames = 0;
    var collitionsN = 0;
    
    // Variables barra de energia
	var barraEnergia = document.getElementById('barraEnergia');
	var barraEnergiaLeft = barraEnergia.getBoundingClientRect().x;
	var barraEnergiaTop = barraEnergia.getBoundingClientRect().y;
	var progress = 224;
	var barraY = barraEnergiaTop + 4;
	var barraX = barraEnergiaLeft + 30;
	var barraRadius = 20;
	var barraWidth = 220;
	var dmg = 1.33;
    
    // Variables de personaje
	var playerX = cWidth*0.15;
	var playerY = cHeight*0.2;
	var yVelocity = 0.3;
	var ratioW = 166/cWidth;
    var ratioH = 288/cHeight;
	var playerWidth = cWidth*ratioW*0.4;
	var playerHeight = cHeight*ratioH*0.4;


	// Variables para la imagen de meta
	var meta = document.getElementById("meta");
	var ratioMetaW = 538/cWidth;
	var ratioMetaH = 636/cHeight;
	var metaWidth = cWidth*ratioMetaW*0.45;
	var metaHeight = cHeight*ratioMetaH*0.45;
	var metaY = cHeight*0.12;
	var metaX = cWidth+3200;

    // Variables para los barriles 
	var barrel = document.getElementById("barrel");
	
    var ratioW = 152/cWidth;
    var ratioH = 201/cHeight;
	var barrelY = cHeight*0.7;
	var xBarrelVelocity = 0;
	var ratioBarrelW = 152/cWidth, ratioBarrelH = 201/cHeight;
	var barrelWidth = cWidth*ratioBarrelW*0.3;
	var barrelHeight = cHeight*ratioBarrelH*0.3;
	var barrelsX = [cWidth+50,cWidth+750,cWidth+750+barrelWidth,cWidth+1100,cWidth+1450,cWidth+1800,cWidth+2300,cWidth+2300+barrelWidth,cWidth+2300+barrelWidth*2,cWidth+2750];

	setTimeout(()=> {
		xBarrelVelocity = -5;
		setTimeout(()=> {
			xBarrelVelocity = -8;
		},6000);
		setTimeout(()=> {
			xBarrelVelocity = -10;
		},13000);
	},1000);
	

	drawRect = function (x, y, w, h, radius) {
	    var canvas = document.getElementById("runnerCanvas");
		var ctx = canvas.getContext("2d");
		var r = x + w;
		var b = y + h;
		ctx.beginPath();
		ctx.strokeStyle="#B786B7";
		ctx.fillStyle="#B786B7";
		ctx.lineWidth="1";
		ctx.moveTo(x+radius, y);
		ctx.lineTo(r-radius, y);
		ctx.quadraticCurveTo(r, y, r, y+radius);
		ctx.lineTo(r, y+h-radius);
		ctx.quadraticCurveTo(r, b, r-radius, b);
		ctx.lineTo(x+radius, b);
		ctx.quadraticCurveTo(x, b, x, b-radius);
		ctx.lineTo(x, y+radius);
		ctx.quadraticCurveTo(x, y, x+radius, y);
		ctx.lineJoin = "round";
		ctx.lineWidth = barraRadius;
		ctx.strokeRect(barraX + (barraRadius/2),barraY + (barraRadius/2),progress -barraRadius,27 - barraRadius);
		ctx.fillRect(barraX + (barraRadius/2),barraY + (barraRadius/2),progress -barraRadius,27 - barraRadius);
		if(progress <= 12){
			ctx.clearRect(barraEnergiaLeft + 21, barraEnergiaTop, cWidth, 32);	
			victory("Rayo",0);	
		}
	};

	gifler('assets/img/runner/RAYO-CORRIENDO-PERSONAJE.gif')
    .frames('canvas.noPikachu', onDrawFrame);

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
		
		metaX += xBarrelVelocity;
		ctx.drawImage(meta, metaX, metaY, metaWidth, metaHeight);
		drawRect(barraX, barraY, barraWidth, 27, barraRadius);

		frames++;
	}

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
		

		for (var i = 0; i < barrelsX.length ; i++) {
			if (playerX + playerWidth*0.9 >= barrelsX[i] && playerX + playerWidth*0.9 <= barrelsX[i] + barrelWidth) {
				if (playerY + playerHeight*0.95 >= barrelY) {
					console.log("chocaste" + barrelsX.length + "  progress: "+progress);
					progress -= dmg;
					if(progress < 16){
						progress = 11;
					}
					collitionsN++;
					// if (collitionsN > 8) {
					// }
				} else {
					collitionsN = 0;
				}
			}
		}

		if (playerX + playerWidth*0.9 >= metaX && playerX + playerWidth*0.9 <= metaX + barrelWidth) {
			xBarrelVelocity = 0;
			victory("Rayo",1);
			barraEnergia.style.display = "none";
		}

		setTimeout(main, 10);
	};

	//finalizeGame(true);
	drawRect(barraX, barraY, 220, 27, barraRadius);
	startup();
	main();
	
};

function closeRunnerGame(){
    var canvas = document.getElementById('runnerCanvas');
	canvas.innerHTML = "";
	var barraEnergia = document.getElementById('barraEnergia');
	barraEnergia.style.display = "none";
}
