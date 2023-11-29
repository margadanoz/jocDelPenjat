// panell de letres del joc:
let panelLetras = document.querySelector('.panelLetras');
// Frase que mostra errors:
let textErrors = document.getElementById('mostraErrors');
let nombreErrors = document.getElementById('nombreErrors');
// Agafa per modificar el nombre de errors al html l'element del dom
let nombreIntents = document.getElementById('nombreIntents');
// Agafa per modificar el nombre de errors al html l'element del dom
let intents = document.getElementById('intents');
// Butó que apareix quan s'acaba una partida, be es guany be es perdi:
let tornarJugar = document.getElementById('tornarJugar');
// Mensajes para si gana o pierde:
let mensajeGanador = document.querySelector('.mensajeGanador');
let mensajePerdedor = document.querySelector('.mensajePerdedor');
// Element que pintarà els guions:
let guionesPalabra = document.querySelector('.guionesPalabra');

// TIEMPO:
// Cronómetre del joc FASE1:
let cronometro = document.querySelector('.cronometro');
// El crono tendrá un minuto cuando se haga click.
let tiempo = new Date();
// Para que marque tan solo un minuto según se clicka primera palabra:
tiempo.setHours(0,1,0,0);
// Crono de tiempo para toda la palabra:
cronometro.innerHTML = "00:01:00";
// para almacenar intervalo:
let cronoAtras;
let segundos;


// VARIABLES PARA JUEGO: PALABRAS, ERRORES, ETC
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
// Para guardar las letras que se vayan acertando y comparar por length para ver cuando gana jugador:
let arrayLetrasAcertadas = [];

//Primero generar palabra secreta:
palabraSecreta = arrayPalabrasSecretas[Math.floor(Math.random() * arrayPalabrasSecretas.length)];
console.log(palabraSecreta);


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

    //e.target.classList.value !== 'panelLetras'<--Condicional, ver donde ponerlo, sino da fallo!

    for (let i = 0; i < palabraSecreta.length; i++) {
  
        if(palabraSecreta.charAt(i) === letraSeleccionada) {

            activaCronometro++;

            // Cuando piquemos en la primera letra se activará la cuenta atrás de un minuto:
            if(activaCronometro === 1){
                // Llama la función del intervalo, que a su vez
                // llama a la función que genera la cuenta atrás:
                activaCuentaAtras();
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

            arrayLetrasAcertadas.push(letraSeleccionada);

            // Actualizamos el texto del html
            guionesPalabra.innerHTML = guion.join(" ");

        // si entramos pror el else if es que se ha fallado la letra y le damos su clase para manejo visual y del código:
        }else if(palabraSecreta.charAt(i) !== letraSeleccionada && e.target.classList.value !== "letra correcta"){

            e.target.classList.add('incorrecta');
           
        }
    }
    // Si la lletra actualment seleccionada no és correcta restarem intents i sumarem fallos:
        if(e.target.classList.value !== "letra correcta"){

            activaCronometro++;

            // Cuando piquemos en la primera letra se activará la cuenta atrás de un minuto:
            if(activaCronometro === 1){
                // Llama la función del intervalo, que a su vez
                // llama a la función que genera la cuenta atrás:
                activaCuentaAtras();
            }
                //actualizamos variables solo si no se ha llegado al num max de errores y num minim para intentos (0)
                if(intentos !== 0 && errores !== 7){

                    intentos --;
                    errores ++;
                }

                //actualizamos valores de los elementos del html:
                nombreErrors.innerHTML = errores;
                nombreIntents.innerHTML = intentos;           
        }
   
        // A cada vuelta de bucle comprobaremos si hemos ganado o perdido:
        comprobarGanarPerder();      
}

function cuentaAtrasPalabra(){

    let horas = tiempo.getHours();
    let minutos = tiempo.getMinutes();
    segundos = tiempo.getSeconds();
    // Si los segundos son superiores a cero iremos reduciendo:
    if(segundos > 0){      
        segundos -= 1;
    }

    if(minutos > 0 && segundos === 0){
        minutos -= 1;
        segundos = 59;
    }
    
    tiempo.setMinutes(minutos);
    tiempo.setSeconds(segundos);

    /**Para impresion del crono, solo visual */
    if(horas < 10){

        horas = "0" + horas;
    }
    if(minutos < 10){

        minutos = "0" + minutos;      
    }
    if(segundos < 10){

        segundos = "0" + segundos;      
    }
    cronometro.innerHTML = horas + ":" + minutos + ":" + segundos;   
}

// Contiene intervalo, activado al primer click
function activaCuentaAtras(){

        cronoAtras = setInterval(cuentaAtrasPalabra, 1000);
}

// Debe comprobar parámetros para ver si el jugador ha ganado o ha perdido:
function comprobarGanarPerder(){

    // Condiciones que deben darse para que se pare la cuenta atrás
    if(errores === 7 || segundos === 0 || arrayLetrasAcertadas.length === palabraSecreta.length){

        clearInterval(cronoAtras);
       
        // Si entramos por aqui ya imprimimos mensajes de ganar o perder
        // Ponemos boton para volver a jugar, ocultamos panel de letras:
        if(errores === 7 || segundos === 0 && minutos === 0){

            mensajePerdedor.style.display = 'inline';
            panelLetras.style.display = 'none';
            guionesPalabra.style.display = 'none';
            tornarJugar.style.display = 'block';
            guionesPalabra.style.display = 'none;'
            subtitol.style.display = 'none';
            nombreIntents.style.display = 'none';
            intents.style.display = 'none';

        }else if(arrayLetrasAcertadas.length === palabraSecreta.length){

            mensajeGanador.style.display = 'inline';
            panelLetras.style.display = 'none';
            guionesPalabra.style.display = 'none';
            tornarJugar.style.display = 'block';
            guionesPalabra.style.display = 'none;'
            subtitol.style.display = 'none';
            nombreIntents.style.display = 'none';
            intents.style.display = 'none';
        }
    }
}

// Evento para volver a juagar:
tornarJugar.addEventListener('click', reiniciarPanel);

function reiniciarPanel(){

    // Volvemos a hacer que aparezcan los elementos:
    mensajePerdedor.style.display = 'none';
    mensajeGanador.style.display = 'none';
    tornarJugar.style.display = 'none';
    guionesPalabra.style.display = 'inline;'
    subtitol.style.display = 'block';
    nombreIntents.style.display = 'inline';
    intents.style.display = 'inline';
    panelLetras.style.display = 'inline';

    //Reiniciamos la clase de las letras:
    // location.reload();
    

}




