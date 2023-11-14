import { Suelo, Juego } from "./clases.js";
//VARIABLES

let tiempo_ES = new Date();
let deltaTime_ES = 0;

let suelo_ES = new Suelo(document.getElementById("suelo"), 0, 22);
let contenedor_ES = document.getElementById("contenedor");
let velEscenario_ES = 1280/3;
let gameVel_ES = 1;



if(document.readyState === "complete" || document.readyState === "interactive"){
    setTimeout(Init, 1);
}else{
    document.addEventListener("DOMContentLoaded", Init); 
}


//FUNCIONES
function Init() {
    tiempo_ES = new Date();
    //start();
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
    
    suelo_ES.MoverSuelo(velEscenario_ES, deltaTime_ES, gameVel_ES, contenedor_ES);
};







