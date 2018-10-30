window.onload = inicializar();
var acerca,juego,back;

function inicializar()
{
    setTimeout('cargarJuego()', 5000);
    initVariables();
    initEventos();
}

function cargarJuego()
{
    location.href = "#menu";
}

function initVariables()
{
    acerca = document.getElementById('about');
    juego = document.getElementById('play');
    back = document.getElementById('back');
    galeria = document.getElementById('btnGalery');
    back2MainScreen = document.getElementById('back2MainScreen');
}

function initEventos()
{
    acerca.addEventListener('click', toAbout);
    juego.addEventListener('click', toGame);
    back.addEventListener('click', function() { location.href = "#menu"});
    galeria.addEventListener('click',() => {location.href = "#galery"});
    back2MainScreen.addEventListener('click', () => {location.href = "#menu"});
}

function toAbout()
{
    location.href = "#viewAbout";
}

function toGame()
{
    location.href = "#initGame1";
    setTimeout(function() {

        location.href = "#initGame2";
        setTimeout(function() { location.href = "#listGames";}, 12000);
    }, 12000);
}
function toGalery(){
    location.href = "#galery";
}