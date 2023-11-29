// panell de letres del joc:
let panelLetras = document.querySelector('.panelLetras');

// Frase que mostra errors:
let textErrors = document.getElementById('mostraErrors');
let nombreErrors = document.getElementById('nombreErrors');
// Agafa per modificar el nombre de errors al html l'element del dom
let nombreIntents = document.getElementById('nombreIntents');

// Cronómetre del joc FASE1:
let cronometro = document.querySelector('.cronometro');
// El crono tendrá un minuto cuando se haga click.
// Crono de tiempo para toda la palabra:
cronometro.innerHTML = "00:01:00";
let tiempo = new Date();

// Array de palabras para comprobar que funciona. Sustituir después:
const arrayPalabrasSecretas = ["casa", "perro", "elefante"];

//Variable que almacene palabra secreta
let palabraSecreta;

//Variable para contar los errores, se irá sumando si fallamos:
let errores = 0;
// Variables para contar numero de intentos, se decrementará:
// Solo se decrementa si se falla la letra:
let intentos = 7;
// Boolean para ver si se acierta o no la letra y en función de eso
// pintarla de rojo o de verde:
let letraAcertada = true;
// Contador para iniciar el cronómetro de la cuenta atrás:
let activaCronometro = 0;

//Variable para generar guiones
let guion = [];

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
        guion.push("_ ");

    }
    console.log(guion);

     //Pintamos los guiones por el html:
     guionesPalabra.innerHTML = guion.join("");
}

// Cuando se haga click sobre la letra se comprueba si es o no es correcta:
panelLetras.addEventListener('click',comprobarLetra);

function comprobarLetra(e) {

    //capturar valor de la lletra cuando se haga click sobre ella:
    let letraSeleccionada = e.target.innerHTML;

    console.log(letraSeleccionada);

    // Como de nuestro array nos vienen en minúsculas las letras pasamos la palabra
    // escogida a upperCase:
    palabraSecreta = palabraSecreta.toUpperCase();

    for (let i = 0; i < palabraSecreta.length; i++) {

        if(palabraSecreta.charAt(i) === letraSeleccionada) {

            activaCronometro++;

            // Cuando piquemos en la primera letra se activará la cuenta atrás de un minuto:
            if(activaCronometro == 1){

                cuentaAtrasPalabra();
            }

            console.log(palabraSecreta);

            // Guardamso el indice para poder guiarnos con el para insertar las letras acertadas
            // y pintar los guiones de nuevo donde no se ha acertado:
            indiceLetraAcertada = i;

            // Establecemos clase letra correcta si la letra coincide, sin este fragmento me daba error:
            e.target.classList.value = "letra correcta";

            // Añadimos la clase 'correcta' al elemento clickado
            e.target.classList.add('correcta');

            // Sustituimos los guiones por las letras acertadas:
            // Alli donde este el indice  de la letra acertada insertaremos dicha letra:
            guion[indiceLetraAcertada] = letraSeleccionada;

            // Actualizamos el texto del html
            guionesPalabra.innerHTML = guion.join(" ");

        // si entramos pror el else if es que se ha fallado la letra y le damos su clase para manejo visual y del código:
        }else if(palabraSecreta.charAt(i) !== letraSeleccionada && e.target.classList.value !== "letra correcta"){

            e.target.classList.add('incorrecta');
           
        }
    }
    // Si la lletra actualment seleccionada no és correcta restarem intents i sumarem fallos:
        if(e.target.classList.value !== "letra correcta"){
                //actualizamos variables
                intentos --;
                errores ++;

                //actualizamos valores de los elementos del html:
                nombreErrors.innerHTML = errores;
                nombreIntents.innerHTML = intentos;
        }
}

function cuentaAtrasPalabra(){

    let horas = tiempo.getHours();
    let minutos = tiempo.getMinutes();
    let segundos = tiempo.getSeconds();

    if(minutos > 0 && segundos == 0){

        minutos -= 1;
        segundos = 59;

    }
    if(segundos > 0){
        
        segundos -= 1;
    }
}




