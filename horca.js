
let palabras = ["ALURA", "CASA", "ARBOL", "CARRO", "ORACLE", "PERRO", "JABON", "CHILE", "CABALLO", "CARNE", "BALON", "CAMARON", "TOSTADA"];
let tablero = document.getElementById("horca").getContext("2d");
let palabraSecreta = "";
let letras = [];
let errores = 9;
let aciertos =0;
let input = document.querySelector(".palabraNueva");
let ventGanaste = document.getElementById("ventanaGanaste");
let ventPerdiste = document.getElementById("ventanaPerdiste");
let inputOculto = document.querySelector(".inputOcultos");
let letrasUsadas = [];

paginaInicial();

//Muestra la pantalla inicial
function paginaInicial(){
    document.querySelector(".botonesInicio").style.display = "block";
    document.querySelector(".tableroPalabras").style.display = "none";
    document.querySelector(".tableroJuego").style.display = "none";
    document.querySelector(".canvas").style.display = "none";
    ventGanaste.close();
    ventPerdiste.close();
}

//Incia el juego y restaura valores predeterminados
function iniciarJuego(){
    ventGanaste.close();
    ventPerdiste.close();
    errores = 9;
    aciertos =0;
    document.querySelector(".tableroJuego").style.display = "block";
    document.querySelector(".canvas").style.display = "block";
    document.querySelector(".botonesInicio").style.display = "none";
    document.querySelector(".tableroPalabras").style.display = "none";
    letrasUsadas= [];
    sortearPalabraSecreta();
    dibujarCanvas();
    dibujarLinea();
    dibujarAhorcado();
    limpiarInput.reset();
    document.addEventListener('keydown', letterEvent);  
}

//Selecciona de forma aleatorea una palabra 
function sortearPalabraSecreta(){
    let palabra = palabras[Math.floor(Math.random()* palabras.length)]
    palabraSecreta = palabra
    console.log(palabraSecreta)
}

//Captura y compara pulsaciones de teclado PC 
const letterEvent = event =>{
    let letra = event.key.toUpperCase();
    if(letra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(letra)){
        letterInput(letra); 
    }
}

//Captura y compara pulsaciones de teclado en dispositvos moviles
inputOculto.oninput = (e) => {
    let letra = e.target.value.toUpperCase();
    if(letra.match(/^[a-zñ]$/i) && !letrasUsadas.includes(letra)){
        letterInput(letra); 
    }
    inputOculto.value = "";
}

//Compara que la letra pulsada la tenga la palabra aleatorea
const letterInput = letter =>{
    if(palabraSecreta.includes(letter)){
        correctLetter(letter)
    }else{
        anadirLetraIncorrecta()
        escribirLetraIncorrecta(letter, errores)
        wrongLetter();
    }
    letrasUsadas.push(letter)   
}

//Verifica si la letra es correcta y si ya haz ganado
const correctLetter = letter => {
    for(let i = 0; i < palabraSecreta.length; i++){
        if(palabraSecreta[i] === letter){
            aciertos++;
            escribirLetraCorrecta(i)
        }
    }
    if(aciertos >= palabraSecreta.length){
        ventGanaste.showModal();
        document.removeEventListener('keydown', letterEvent);
    }
}

//Verifica el numero de errores y si haz perdido
const wrongLetter = () =>{
    if(errores <= 0){
        let msjperdiste = document.getElementById("parrafoPerdiste");
        msjperdiste.innerHTML = palabraSecreta;
        ventPerdiste.showModal();
    }
}


//Suma los errores y ayuda a dibujar el ahorcado
function anadirLetraIncorrecta(){
    errores = errores -1
    console.log(errores)
    dibujarAhorcado()
}

//Muesntra el menu donde el usuario puede agregar nuevas palabras
function agregarPalabra(){
    errores = 2000;
    aciertos =-2000;
    document.querySelector(".tableroPalabras").style.display = "block";
    document.querySelector(".canvas").style.display = "none";
    document.querySelector(".botonesInicio").style.display = "none";
    document.querySelector(".tableroJuego").style.display = "none";
}

//Introduce dentro del arreglo la palabra escrita por el usuario
function guardarPalabra(){
    let palabrasAgregadas = input.value;
    palabrasAgregadas = palabrasAgregadas.toUpperCase();
    palabras.push(palabrasAgregadas);
    input.value= "";
}

//Dibuja una parte del ahorcado segun los errores cometidos
function dibujarAhorcado(){
    tablero.lineWidth = 8;
    tablero.lineCap = "round";
    tablero.lineJoin = "round";
    tablero.fillStyle = "#F3F5F6";
    tablero.strokeStyle = "#0A3871";
    tablero.beginPath();

    if(errores == 8){
    tablero.moveTo(150, 390);//1
    tablero.lineTo(150, 70);//1
    }
    if(errores == 7){
    tablero.moveTo(150, 70);//2
    tablero.lineTo(275, 70);//2
    }
    if(errores == 6){
    tablero.moveTo(275, 70);//3
    tablero.lineTo(275, 100);//3
    }
    if(errores == 5){
    tablero.moveTo(315, 140);//4
    tablero.arc(275,145,40,0,2*Math.PI);//4
    }
    if(errores == 4){
    tablero.moveTo(275, 185);//5
    tablero.lineTo(275, 290);//5
    }
    if(errores == 3){
    tablero.moveTo(275, 205);//6
    tablero.lineTo(235, 215);//6
    }
    if(errores == 2){
    tablero.moveTo(275, 205);//7
    tablero.lineTo(315, 215);//7
    }
    if(errores == 1){
    tablero.moveTo(275, 290);//8
    tablero.lineTo(235, 320);//8
    }
    if(errores == 0){
    tablero.moveTo(275, 290);//9
    tablero.lineTo(315, 320);//9
    }
    tablero.stroke();
    tablero.closePath();
}

