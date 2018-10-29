window.onload = inicializar();
var acerca,juego;

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
}

function initEventos()
{
    acerca.addEventListener('click', toAbout);
    juego.addEventListener('click', toGame);
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
    }, 12000);
}