// panell de letres del joc:
let panelLetras = document.querySelector('.panelLetras');

// Frase que mostra errors:
let textErrors = document.getElementById('mostraErrors');
let nombreErrors = document.getElementById('nombreErrors');

// Cronómetre del joc FASE1:
let cronometro = document.querySelector('.cronometro');

cronometro.innerHTML = "00:00:00";

// Array de palabras para comprobar que funciona. Sustituir después:
const arrayPalabrasSecretas = ["casa", "perro", "elefante"];

//Variable que almacene palabra secreta
let palabraSecreta;

//Variable para contar las tiradas efectuadas, se irá sumando:
let tiradas = 0;

//Variable para generar guiones
let guion = " ";

//Guardamos el indice de la letra acertada:
let indiceLetraAcertada = 0;


//Primero generar palabra secreta:
palabraSecreta = arrayPalabrasSecretas[Math.floor(Math.random() * arrayPalabrasSecretas.length)];
console.log(palabraSecreta);

// Element que pintarà els guions:
let guionesPalabra = document.querySelector('.guionesPalabra');

// Función que arranca nada más entrar al juego y genera los guiones,
// tomando como argumento la longitud de la palabra:
generarGuiones();

function generarGuiones(){

    for(let i = 0; i < palabraSecreta.length; i++){

        //Generamos el mismo numero que el length de palabraSecreta,
        // necesario dentro del bucle, pintar num definitivo necesario fuera de bucle
        guion += "_ ";

    }
    console.log(guion);

     //Pintamos los guiones por el html:
     guionesPalabra.innerHTML = guion;
}

// Cuando se haga click sobre la letra se comprueba si es o no es correcta:
panelLetras.addEventListener('click',comprobarLetra);

function comprobarLetra(e){
    // Cpge el valor letra, que es el valor de la clase de todas las letras
    e.target.classList.value;
    console.log(e.target.classList.value);

    // Almacenamos el valor de la letra seleccionada en variable:
    let letraSeleccionada = e.target.innerHTML;
    console.log(letraSeleccionada);

    // Pasamos la palabraSecreta elegida a upperCase, que es como
    // consta que están las letras en el html:
    palabraSecreta = palabraSecreta.toUpperCase();

    // Comprobamos si el string que contiene la letra
    // clickada por el jugador:
    for(let i = 0; i < palabraSecreta.length;i++){

        if(palabraSecreta.charAt(i) === letraSeleccionada){

            // Guardamos los indices de las letras acertadas
            // para reemplazar los guiones
            indiceLetraAcertada = i;
            console.log(indiceLetraAcertada);

            letraSeleccionada.classList.add('correcta');

           //Rectificamos el texto del html para que salga la/las letras acertadas:           
            guionesPalabra.innerHTML = letraSeleccionada + guion;
            
            
        }

    }
}


