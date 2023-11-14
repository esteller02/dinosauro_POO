import { Suelo, Juego, Dinosaurio } from "./clases.js";
//VARIABLES

let tiempo_ES = new Date();
let deltaTime_ES = 0;

let gravedad_ES = 2500;

let suelo_ES = new Suelo(document.getElementById("suelo"), 0, 22);
let contenedor_ES = document.getElementById("contenedor");
let velEscenario_ES = 1280/3;
let gameVel_ES = 1;

let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;



let obstaculoPosY = 16;

let obstaculos = [];
let puntos = 0;

let juego_ES = new Juego(tiempoHastaObstaculo, tiempoObstaculoMax, tiempoObstaculoMin, obstaculos, 0);

let dinosaurio_ES = new Dinosaurio(42, 22, false, 900, 0, document.getElementById("dino"));







if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init); 
}


//FUNCIONES
function Init() {
    tiempo_ES = new Date();
    start();
    loop();
}

function loop() {
    deltaTime_ES = (new Date() - tiempo_ES) / 1000;
    tiempo_ES = new Date();
    update();
    requestAnimationFrame(loop);
}

function update()
{
    //console.log("actualizando");

    if(juego_ES.estado == false) return
    
    suelo_ES.MoverSuelo(velEscenario_ES, deltaTime_ES, gameVel_ES, contenedor_ES);

    dinosaurio_ES.mover(deltaTime_ES, suelo_ES.sueloY);
  
    juego_ES.decidirCrearObstaculo(deltaTime_ES, gameVel_ES, contenedor_ES);

    juego_ES.moverObstaculos(velEscenario_ES, deltaTime_ES, gameVel_ES);

    juego_ES.detectarColision(dinosaurio_ES);
    

    dinosaurio_ES.velY -= gravedad_ES * deltaTime_ES
};

function start()
{
    
    document.addEventListener("keydown",(e)=>{
        
        dinosaurio_ES.saltar(suelo_ES.sueloY, e);
    })
}







