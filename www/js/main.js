window.onload = init;
var lvlup = false;
function init() {
    var jugarButton, aboutButton, lvl1Button, lvl2Button, lvl3Button, lvl4Button;
    var levelpBackButton, gamep1BackButton, gamep2BackButton, gamep3BackButton, gamep4BackButton;
    var aboutpBackButton,
        galleryBackButton,
        gallerypBackButton,
        fuperButton,
        fuperBackButton,
        creditsBackButton,
        aboutCreditsButton;
    var btntoPage;
    function show(id) {
        document.getElementById(id).style.display = "block";
    }

    function hide(id) {
        document.getElementById(id).style.display = "none";
    }

    var navigate = function(actual, next) {
        return function() {
            hide(actual);
            show(next);
        };
    };

    // Navigation
    document.getElementById("loadp").style.display = "block";

    setTimeout(() => {
        document.getElementById("loadp").style.display = "none";
        document.getElementById("menup").style.display = "block";
    }, 2000);

    jugarButton = document.querySelector("#jugarButton");
    jugarButton.addEventListener("click", navigate("menup", "levelp"));

    aboutButton = document.querySelector("#aboutButton");
    aboutButton.addEventListener("click", navigate("menup", "aboutp"));

    lvl1Button = document.querySelector("#lvl1Button");
    lvl1Button.addEventListener("click", navigate("levelp", "gamep1"));

    lvl2Button = document.querySelector("#lvl2Button");
    lvl2Button.addEventListener("click", navigate("levelp", "gamep2"));

    lvl3Button = document.querySelector("#lvl3Button");
    lvl3Button.addEventListener("click", navigate("levelp", "gamep3"));

    lvl4Button = document.querySelector("#lvl4Button");
    lvl4Button.addEventListener("click", navigate("levelp", "gamep4"));

    levelpBackButton = document.querySelector("#levelpBackButton");
    levelpBackButton.addEventListener("click", navigate("levelp", "menup"));

    gamep1BackButton = document.querySelector("#gamep1BackButton");
    gamep1BackButton.addEventListener("click", navigate("gamep1", "levelp"));

    gamep2BackButton = document.querySelector("#gamep2BackButton");
    gamep2BackButton.addEventListener("click", navigate("gamep2", "levelp"));

    gamep3BackButton = document.querySelector("#gamep3BackButton");
    gamep3BackButton.addEventListener("click", navigate("gamep3", "levelp"));

    gamep4BackButton = document.querySelector("#gamep4BackButton");
    gamep4BackButton.addEventListener("click", navigate("gamep4", "levelp"));

    aboutpBackButton = document.querySelector("#aboutpBackButton");
    aboutpBackButton.addEventListener("click", navigate("aboutp", "menup"));

    galleryBackButton = document.querySelector("#gallerypBackButton");
    galleryBackButton.addEventListener("click", navigate("galleryp", "levelp"));

    gallerypBackButton = document.querySelector("#imggallery");
    gallerypBackButton.addEventListener("click", navigate("levelp", "galleryp"));

    fuperButton = document.querySelector("#btnFuper");
    fuperButton.addEventListener("click", navigate("aboutp", "fuperp"));

    fuperBackButton = document.querySelector("#fuperBackButton");
    fuperBackButton.addEventListener("click", navigate("fuperp", "aboutp"));

    creditsBackButton = document.querySelector("#creditsBackButton");
    creditsBackButton.addEventListener("click", navigate("creditsp", "aboutp"));

    aboutCreditsButton = document.querySelector("#btnCredits");
    aboutCreditsButton.addEventListener("click", navigate("aboutp", "creditsp"));

    gallery = document.querySelector(".gallery");
    susyCertificate = document.querySelector("#susyCertificate");
    rayoCertificate = document.querySelector("#rayoCertificate");
    milagroCertificate = document.querySelector("#milagroCertificate");
    gatunaCertificate = document.querySelector("#susyCertificate");
    btnSusy = document.querySelector("#btnSusy");
    btnRayo = document.querySelector("#btnRayo");
    btnMilagro = document.querySelector("#btnMilagro");
    btnGatuna = document.querySelector("#btnGatuna");

    btnSusy.addEventListener("click", () => {
        gallery.style.display = "none";
        susyCertificate.style.display = "block";
    });
    btnRayo.addEventListener("click", () => {
        gallery.style.display = "none";
        rayoCertificate.style.display = "block";
    });

    btnMilagro.addEventListener("click", () => {
        gallery.style.display = "none";
        milagroCertificate.style.display = "block";
    });

    btnGatuna.addEventListener("click", () => {
        gallery.style.display = "none";
        gatunaCertificate.style.display = "block";
    });

    btntoPage = document.querySelector("#btnToFuper");
    btntoPage.addEventListener("click", function() {
        location.href = "http://fundacionfuper.org/";
    });
}

function toBackSusy() {
    susyCertificate.style.display = "none";
    gallery.style.display = "block";
}

function toBackMilagro() {
    milagroCertificate.style.display = "none";
    gallery.style.display = "block";
}

function toBackRayo() {
    rayoCertificate.style.display = "none";
    gallery.style.display = "block";
}

function toBackGatuna() {
    gatunaCertificate.style.display = "none";
    gallery.style.display = "block";
}
