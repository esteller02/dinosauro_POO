
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
        console.log(this.sueloX);
        this.sueloX += Juego.CalcularDesplazamiento(velEscenario, deltaTime, gameVel);
        console.log(this.sueloX);
        this.suelo.style.left = -(this.sueloX % contenedor.clientWidth) + "px";
    }

}



export class Juego
{
    /*constructor ()
    {
        this.velEscenario = velEscenario,
        this.deltaTime = deltaTime, 
        this.gameVel = gameVel

    }*/
    static CalcularDesplazamiento(velEscenario, deltaTime, gameVel)
    {
        return velEscenario * deltaTime * gameVel;
    }
}