//Dibuja el tablero de juego
function dibujarCanvas(){
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";

    tablero.fillRect(0,0,410, 570);
    tablero.beginPath();
    tablero.moveTo(50, 390);
    tablero.lineTo(350, 390);
    tablero.stroke();
    tablero.closePath();
}

//Dibuja los giones correspondientes a cada letra de la palabra
function dibujarLinea(){
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";

    let anchura = 350/palabraSecreta.length;
    for (let i=0; i < palabraSecreta.length; i++){
        tablero.moveTo(80 + (anchura*i), 500)
        tablero.lineTo(40 + (anchura*i), 500)
    }

    tablero.stroke();
    tablero.closePath();
}

//Muestra sobre los giones la letra acertada
function escribirLetraCorrecta(index){
    tablero.font ='bold 54px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#0A3871";

    let anchura = 350/palabraSecreta.length
    tablero.fillText(palabraSecreta[index], 40+(anchura*index), 480)
    tablero.stroke()
}

//Muestra abajo de los giones la letra incorrecta
function escribirLetraIncorrecta(letter, errorsLeft){
    tablero.font ='bold 35px Inter';
    tablero.lineWidth = 6;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#fa1e21";
    tablero.fillText(letter, 10+(40*(8.5-errorsLeft)), 550, 30)
}
