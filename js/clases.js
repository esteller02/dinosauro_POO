
export class Suelo
{
    constructor(suelo, sueloX, sueloY)
    {
        this.suelo = suelo,
        this.sueloX = sueloX, 
        this.sueloY = sueloY
    }

    MoverSuelo(velEscenario, deltaTime, gameVel, contenedor) 
    {
        //console.log(this.sueloX);
        this.sueloX += Juego.CalcularDesplazamiento(velEscenario, deltaTime, gameVel);
        //console.log(this.sueloX);
        this.suelo.style.left = -(this.sueloX % contenedor.clientWidth) + "px";
    }

}



export class Juego
{
   constructor(tiempoHastaObstaculo, tiempoObstaculoMax, tiempoObstaculoMin, obstaculos, puntos, estado)
   {
        this.tiempoHastaObstaculo = tiempoHastaObstaculo,
        this.tiempoObstaculoMax = tiempoObstaculoMax,
        this.tiempoObstaculoMin = tiempoObstaculoMin,
        this.obstaculos = obstaculos,
        this.puntos = puntos,
        this.estado = true
   }
    static CalcularDesplazamiento(velEscenario, deltaTime, gameVel)
    {
        return velEscenario * deltaTime * gameVel;
    }

     decidirCrearObstaculo(deltaTime, gameVel, contenedor)
    {
        
        this.tiempoHastaObstaculo -= deltaTime;

        //console.log(this.tiempoHastaObstaculo);

        if(this.tiempoHastaObstaculo <= 0)
        {
            console.log("entre")
            this.crearObstaculo(gameVel, contenedor);
        }   
    }

    crearObstaculo(gameVel, contenedor)
    {
        let obstaculoDiv = document.createElement("div");
        
        let obstaculo = new Obstaculo(contenedor.clientWidth, 16, obstaculoDiv);
        obstaculo.obstaculoDiv.classList.add("cactus");

        contenedor.appendChild(obstaculo.obstaculoDiv);

    
        //console.log(obstaculo, "soy el obstaculo creado");

        obstaculo.obstaculoDiv.style.left = obstaculo.posX + "px";
        

        this.obstaculos.push(obstaculo);

        

        

        this.tiempoHastaObstaculo = this.tiempoObstaculoMin + Math.random() * (this.tiempoObstaculoMax - this.tiempoObstaculoMin)/gameVel

    }

    moverObstaculos(velEscenario, deltaTime, gameVel)
    {

        
        for (let i = this.obstaculos.length - 1; i >= 0; i--) 
        {
                
                if(this.obstaculos[i].posX < -this.obstaculos[i].posX)
                {
                    this.obstaculos[i].obstaculoDiv.remove();
    
                    this.obstaculos.splice(i, 1);

                    this.actualizarPuntos();
                }    
    
                else
                {
                    this.obstaculos[i].posX -= Juego.CalcularDesplazamiento(velEscenario, deltaTime, gameVel);
    
                    this.obstaculos[i].obstaculoDiv.style.left = this.obstaculos[i].posX + "px";
                }
                
        }
    }

    actualizarPuntos()
    {
        this.puntos++;
        document.getElementById("score").innerText = this.puntos;
    }


    detectarColision(dinosaurio)
    {
        for (let i = 0;  i < this.obstaculos.length; i++) 
        {
            if(this.obstaculos[i].posX > dinosaurio.posX + dinosaurio.dinoDiv.clientWidth)
            {
                //EVADE
                break;
            }
            
            else
            {
                if(this.isCollision(dinosaurio.dinoDiv, this.obstaculos[i].obstaculoDiv, 10, 30, 15, 20))
                {
                    this.gameOver(dinosaurio);
                }
            }
        }
    }

    isCollision(a, b,  paddingTop, paddingRight, paddingBottom, paddingLeft)
    {
        let aRect = a.getBoundingClientRect();
        let bRect = b.getBoundingClientRect();
    
        return !(
            ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
            (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
            ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
            (aRect.left + paddingLeft > (bRect.left + bRect.width))
        );
    }

    gameOver(dinosaurio)
    {
        dinosaurio.estrellarse();
        this.estado = false;
        document.getElementById("gameOver").style.display = "block";
    }
}


export class Dinosaurio
{
    constructor(posX, posY, saltando, impulso, velY, dinoDiv)
    {
        this.posX = posX,
        this.posY = posY,
        this.saltando = saltando,
        this.impulso = impulso,
        this.velY = velY,
        this.dinoDiv = dinoDiv
    }

    saltar(sueloY, evento)
    {
        console.log(evento)
        if(evento.keyCode === 32)
        {
            if(this.posY === sueloY)
            {
                this.saltando = true;
                this.velY = this.impulso;
                this.dinoDiv.classList.remove("dino-corriendo");
            }
        }

    }

    mover(deltaTime, sueloY)
    {
        this.posY += this.velY * deltaTime;

        if(this.posY < sueloY)
        {
            this.tocarSuelo(sueloY);
            
        }
        this.dinoDiv.style.bottom = this.posY + "px";
    }

    tocarSuelo(sueloY)
    {
        this.posY = sueloY;
        this.velY = 0;
        if(this.saltando)
        {
            this.dinoDiv.classList.add("dino-corriendo");

        }
        this.saltando = false;
    }

    estrellarse()
    {
        this.dinoDiv.classList.remove("dino-corriendo");

    }
}


export class Obstaculo 
{
    constructor(posX, posY, obstaculoDiv)
    {
        this.posX = posX,
        this.posY = posY,
        this.obstaculoDiv = obstaculoDiv
    }
}