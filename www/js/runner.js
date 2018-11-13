function openRunnerGame() {
    var canvasNode = document.createElement('canvas');
    canvasNode.setAttribute("id", "runnerCanvas");
    canvasNode.setAttribute("class", "noPikachu");
    document.getElementById("runnerScreen").appendChild(canvasNode);
    var choqueRunnerSound = document.getElementById("choqueRunnerSound");
    choqueRunnerSound.load();
    var canvas = document.getElementById("runnerCanvas");
    var ctx = canvas.getContext("2d");
    var cWidth = ctx.canvas.offsetWidth;
    var cHeight = ctx.canvas.offsetHeight;
    var yLimit = cHeight * 0.55;
    var touchN = 0;
    var frames = 0;
    var collitionsN = 0;

    // Variables barra de energia
    var barraEnergia = document.getElementById("barraEnergia");
    barraEnergia.style.display = "block";
    var barraEnergiaLeft = barraEnergia.getBoundingClientRect().x;
    var barraEnergiaTop = barraEnergia.getBoundingClientRect().y;
    var progress = 224;
    var barraY = barraEnergiaTop + 4;
    var barraX = barraEnergiaLeft + 30;
    var barraRadius = 20;
    var barraWidth = 220;
    var dmg = 2;

    // Variables de personaje
    var playerX = cWidth * 0.15;
    var playerY = cHeight * 0.4;
    var yVelocity = -1;
    var ratioW = 166 / cWidth;
    var ratioH = 288 / cHeight;
    var playerWidth = cWidth * ratioW * 0.4;
    var playerHeight = cHeight * ratioH * 0.4;

    // Variables para la imagen de meta
    var meta = document.getElementById("meta");
    var ratioMetaW = 538 / cWidth;
    var ratioMetaH = 636 / cHeight;
    var metaWidth = cWidth * ratioMetaW * 0.45;
    var metaHeight = cHeight * ratioMetaH * 0.45;
    var metaY = cHeight * 0.12;
    var metaX = cWidth + 3700;

    // Variables para los barriles
    var barrel = document.getElementById("barrel");
    var barrelBig = document.getElementById("barrelBig");

    var barrelY = cHeight * 0.7;
    var xBarrelVelocity = -5;
    var ratioBarrelW = 152 / cWidth,
        ratioBarrelH = 201 / cHeight;
    var barrelWidth = cWidth * ratioBarrelW * 0.3;
    var barrelHeight = cHeight * ratioBarrelH * 0.3;
    var barrelsX = [
        cWidth + 50,
        cWidth + 750,
        cWidth + 750 + barrelWidth,
        cWidth + 1100,
        cWidth + 1450,
        cWidth + 1800,
        cWidth + 2300,
        cWidth + 2300 + barrelWidth,
        cWidth + 2300 + barrelWidth * 2,
        cWidth + 2750
    ];

    var barrelBigY = cHeight * 0.61;
    var ratioBarrelBigW = 164 / cWidth,
        ratioBarrelBigH = 328 / cHeight;
    var barrelBigWidth = cWidth * ratioBarrelBigW * 0.35;
    var barrelBigHeight = cHeight * ratioBarrelBigH * 0.3;
    var barrelsBigX = [
        cWidth + 3000,
        cWidth + 3000 + barrelBigWidth,
        cWidth + 3000 + barrelBigWidth * 2,
    ];
/*
    setTimeout(() => {
        xBarrelVelocity = -5;
        //console.log(1);
        setTimeout(() => {
            xBarrelVelocity = -8;
        //console.log(2);
        }, 6000);
        setTimeout(() => {
            xBarrelVelocity = -10;
        //console.log(3);
        }, 13000);
    }, 1000);
*/
    drawRect = function(x, y, w, h, radius) {
        var canvas = document.getElementById("runnerCanvas");
        var ctx = canvas.getContext("2d");
        var r = x + w;
        var b = y + h;
        ctx.beginPath();
        ctx.strokeStyle = "#B786B7";
        ctx.fillStyle = "#B786B7";
        ctx.lineWidth = "1";
        ctx.moveTo(x + radius, y);
        ctx.lineTo(r - radius, y);
        ctx.quadraticCurveTo(r, y, r, y + radius);
        ctx.lineTo(r, y + h - radius);
        ctx.quadraticCurveTo(r, b, r - radius, b);
        ctx.lineTo(x + radius, b);
        ctx.quadraticCurveTo(x, b, x, b - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.lineJoin = "round";
        ctx.lineWidth = barraRadius;
        ctx.strokeRect(barraX + barraRadius / 2, barraY + barraRadius / 2, progress - barraRadius, 27 - barraRadius);
        ctx.fillRect(barraX + barraRadius / 2, barraY + barraRadius / 2, progress - barraRadius, 27 - barraRadius);

        if(progress <= 12){
            ctx.clearRect(barraEnergiaLeft + 21, barraEnergiaTop, cWidth, 32);  
            victory("Rayo",0); 
            var rayoUnlocked = localStorage.getItem("Rayo");
            if(rayoUnlocked == 1){
                victory("Rayo",1);
            }
            else{
                victory("Rayo",0);
            }
            finalizeGame(false);  
        }
    };

    gifler("assets/img/runner/RAYO-CORRIENDO-PERSONAJE.gif").frames("canvas.noPikachu", onDrawFrame);

    function onDrawFrame(ctx, frame) {
        // Match width/height to remove distortion

        ctx.canvas.width = ctx.canvas.offsetWidth;

        ctx.canvas.height = ctx.canvas.offsetHeight;

        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(frame.buffer, playerX, playerY, playerWidth, playerHeight);
        for (var i = 0; i < barrelsX.length; i++) {
            barrelsX[i] += xBarrelVelocity;
            ctx.drawImage(barrel, barrelsX[i], barrelY, barrelWidth, barrelHeight);
        }
        for (var i = 0; i < barrelsBigX.length; i++) {
            barrelsBigX[i] += xBarrelVelocity;
            ctx.drawImage(barrelBig, barrelsBigX[i], barrelBigY, barrelBigWidth, barrelBigHeight);
            
        }
        
        metaX += xBarrelVelocity;
        ctx.drawImage(meta, metaX, metaY, metaWidth, metaHeight);
        drawRect(barraX, barraY, barraWidth, 27, barraRadius);

        frames++;
    }

    function startup() {
        var bichito = document.getElementById("runnerCanvas");
        bichito.addEventListener(
            "touchstart",
            () => {
                if (touchN < 2) {
                    yVelocity = -3.3;
                    playerY -= 60;
                }
                touchN++;
            },
            { passive: true }
        );
    }

    gravity = function(velocity, rate) {
        return velocity + rate;
    };

    clearScreen = function() {
        var canvas = document.getElementById("runnerCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, cWidth, cHeight);
    };

    playChoqueRunnerSound = function(){
        choqueRunnerSound.play();
    }

    shakeVibrationRunner = function() {
        navigator.vibrate(1000);
    }

    main = function() {
        if (playerY == yLimit && yVelocity < 0) {
            //console.log("1 " + yVelocity);
        } else if (playerY < yLimit) {
            if(yVelocity < 0){
                yVelocity = gravity(yVelocity, 0.2);
            }else {
                yVelocity = gravity(yVelocity, 0.1);
            }
            playerY += yVelocity;
            //console.log("2 " + yVelocity);
        } else if (playerY == yLimit - 20) {
            yVelocity = 3.3;
            //console.log("3 " + yVelocity);
        } else {
            touchN = 0;
            //console.log("4 " + yVelocity);
        }

        for (var i = 0; i < barrelsX.length; i++) {
            if (
                playerX + playerWidth * 0.9 >= barrelsX[i] &&
                playerX + playerWidth * 0.9 <= barrelsX[i] + barrelWidth
            ) {
                if (playerY + playerHeight * 0.95 >= barrelY) {
                   // console.log("chocaste" + barrelsX.length + "  progress: " + progress);
                    progress -= dmg;
                    if (progress < 16) {
                        progress = 11;
                    }
                    collitionsN++;
                    playChoqueRunnerSound();
                    shakeVibrationRunner();
                    // if (collitionsN > 8) {
                    // }
                } else {
                    collitionsN = 0;
                }
            }
        }

        for (var i = 0; i < barrelsBigX.length; i++) {
            if (
                playerX + playerWidth * 0.9 >= barrelsBigX[i] &&
                playerX + playerWidth * 0.9 <= barrelsBigX[i] + barrelBigWidth
            ) {
                if (playerY + playerHeight * 0.95 >= barrelBigY) {
                    //console.log("chocaste" + barrelsBigX.length + "  progress: " + progress);
                    progress -= dmg;
                    if (progress < 16) {
                        progress = 11;
                    }
                    collitionsN++;
                    playChoqueRunnerSound();
                    shakeVibrationRunner();
                    // if (collitionsN > 8) {
                    // }
                } else {
                    collitionsN = 0;
                }
            }
        }

        if (playerX + playerWidth * 0.9 >= metaX) {
            xBarrelVelocity = 0;
            victory("Rayo", 1);
            finalizeGame(true);
        }
        setTimeout(main, 10);
    };

    startup();
    main();

}

function closeRunnerGame() {
    var canvas = document.getElementById("runnerCanvas");
    barraEnergia.style.display = "none";
    canvas.parentNode.removeChild(canvas);
    clearInterval(main);
    var id = window.setTimeout(()=>{},0);
    while(id--){
        window.clearTimeout(id);
    }
    //console.log("funciona");
}