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
// Para mostrar la palbra por la cual se juagaba:
let palabraJuego = document.querySelector('.palabraJuego');
// Para coger directamente las letras, util para crono individual por letra:
let letra = document.querySelector('.panelLetras');

// TIEMPO:
// Cronómetre del joc FASE1:
let cronometro = document.querySelector('.cronometro');
// El crono tendrá un minuto cuando se haga click.
let tiempo = new Date();
// Para que marque tan solo un minuto según se clicka primera palabra:
tiempo.setHours(0,1,0,0);
// Crono de tiempo para toda la palabra:
cronometro.innerHTML = "00:01:00";
// para almacenar intervalo de tiempo de palabra:
let cronoAtras;
let segundos;
// Boolean que pasaremos de la funciíon de cuenta atrás de las letras para 
// que no se reinicie la cuenta atrás si se pica por segunda vez una letra fallada,
// o por sis e pica en el panel de Letras (el div que contiene las letras):
let esPanelLetras = false;
let falladaRepetida = false;

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
// Para guardar las letras que se vayan fallando y que no las puedan picar más:
let arrayLetrasFalladas = [];
//Para guardar aquellas que vayamos acertando y comparar length de este array con length de palabraSecreta:
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

let letraAComprobar = "";

function comprobarLetra(e) {

    //capturar valor de la lletra cuando se haga click sobre ella:
    let letraSeleccionada = e.target.innerHTML;

    console.log(letraSeleccionada);

    // Como de nuestro array nos vienen en minúsculas las letras pasamos la palabra
    // escogida a upperCase:
    palabraSecreta = palabraSecreta.toUpperCase();

    // Para evitar que si picamos fuera de las letras, en lo que es el panel nos de fallo
    // sino contabilizaba el fallo y se ponia el panel entero en rojo:
    // Mirem si cliquen de nou la mateixa lletra, si es així no reiniciarà el crono ni es sumarà com a bona
    // en cas que piquin de nou la bona:
    if(e.target.classList.value !== 'panelLetras' && letraSeleccionada !== letraAComprobar){

        esPanelLetras = false;

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
                // Després d'emmagatzemar la lletra encertada l'equiparem a la variable de control
                // per mirar si la clickan de nou, si es així ni reiniciarà el crono individual
                // ni entrarà per aquest bloc, per evitar fallos
                letraAComprobar = letraSeleccionada;
    
                // Actualizamos el texto del html
                guionesPalabra.innerHTML = guion.join(" ");
    
            // si entramos pror el else if es que se ha fallado la letra y le damos su clase para manejo visual y del código:
            }else if(palabraSecreta.charAt(i) !== letraSeleccionada && e.target.classList.value !== "letra correcta"){
    
                e.target.classList.add('incorrecta');
               
            }
        }
        // Si la lletra actualment seleccionada no és correcta restarem intents i sumarem fallos:
            if(e.target.classList.value !== "letra correcta"){

                falladaRepetida = false;

                // Mirem si la lletra fallada está a l'array de fallades, si no es així la incloem
                // Això evita que en continuar picant a la lletra fallada es vagin sumant errors:
                    if(!arrayLetrasFalladas.includes(letraSeleccionada)){
                        
                         // fiquem la lletra fallada a l'array de lletres fallades perque no puguin continuar
                        // sumant errors si la tornen a picar:
                        arrayLetrasFalladas.push(letraSeleccionada);
                       
                    }else{

                        falladaRepetida = true;                      
                    }              

                activaCronometro++;
    
                // Cuando piquemos en la primera letra se activará la cuenta atrás de un minuto:
                if(activaCronometro === 1){
                    // Llama la función del intervalo, que a su vez
                    // llama a la función que genera la cuenta atrás:
                    activaCuentaAtras();
                }
                    //actualizamos variables solo si no se ha llegado al num max de errores y num minim para intentos (0)
                    // y solo si no se esta picando en una letra ya fallada:
                    if(intentos !== 0 && errores !== 7 && !falladaRepetida){
    
                        intentos --;
                        errores ++;
                    }
    
                    //actualizamos valores de los elementos del html:
                    nombreErrors.innerHTML = errores;
                    nombreIntents.innerHTML = intentos;           
            }
       
            // A cada vuelta de bucle comprobaremos si hemos ganado o perdido:
            comprobarGanarPerder(); 

    }else{
        // Si se pica en el panel de letras, es decir fuera de lo que son los botones de las letras
        // no se restan intentos ni se suman fallos,ni tampoco se vuelve a activar la cuenta atras de las letras:
        intentos = intentos;
        errores = errores;
        esPanelLetras = true;
        
    }     
}

function cuentaAtrasPalabra(){

    let minutos= tiempo.getMinutes();
    segundos = tiempo.getSeconds();
    // Si los segundos son superiores a cero iremos reduciendo:
    if(segundos > 0){      
        segundos -= 1;

        if(segundos === 0){
            // Cuando llegamos a cero se llama a la función que dispara
            // el gameover
            comprobarGanarPerder();
        }
    }

    if(minutos > 0 && segundos === 0){
        minutos -= 1;
        segundos = 59;
    }
    
    tiempo.setMinutes(minutos);
    tiempo.setSeconds(segundos);

    /**Para impresion del crono, solo visual */
    if(minutos < 10){

        minutos = "0" + minutos;      
    }
    if(segundos < 10){

        segundos = "0" + segundos;      
    }
    cronometro.innerHTML = "00" + ":" + minutos + ":" + segundos;   
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
        if(errores === 7 || segundos === 0){

            mensajePerdedor.style.display = 'inline';
            // Para mostrar la palabra por la cual se jugaba:
            palabraJuego.innerHTML = "Palabra por la cual se jugaba: " + palabraSecreta;
            palabraJuego.style.display = 'inline';
            panelLetras.style.display = 'none';
            guionesPalabra.style.display = 'none';
            tornarJugar.style.display = 'block';
            guionesPalabra.style.display = 'none;'
            subtitol.style.display = 'none';
            nombreIntents.style.display = 'none';
            intents.style.display = 'none';

        }else if(arrayLetrasAcertadas.length === palabraSecreta.length){

            // setTimeOut para dejar ver un momento el panel con la letra ganada, luego dispara todo lo demás
            setTimeout(function(){
                mensajeGanador.style.display = 'inline';
                // Para mostrar la palabra por la cual se jugaba
                palabraJuego.innerHTML = "Palabra por la cual se jugaba: " + palabraSecreta;
                palabraJuego.style.display = 'inline';
                panelLetras.style.display = 'none';
                guionesPalabra.style.display = 'none';
                tornarJugar.style.display = 'block';
                guionesPalabra.style.display = 'none;'
                subtitol.style.display = 'none';
                nombreIntents.style.display = 'none';
                intents.style.display = 'none';
            },700);
        }
    }
}

// Evento para volver a juagar:
tornarJugar.addEventListener('click', reiniciarPanel);

function reiniciarPanel(){
    // Reciniamos toda la parte visual:
    location.reload(); 
}

// CODI DE LA FASE 2:
// Cronometro especifico para letras:
let cronoLetra = document.querySelector('.cronoPorLetra');
let tiempoLetra = new Date();
tiempoLetra.setHours(0, 0, 30, 0);
cronoLetra.innerHTML = "00:00:30";
let segundosLetra;
let contadorVecesQueEntra = 0;
// Almacena setTimeOut:
let almacenaTiempoLetra;

// Evento para la cuenta atrás de las letras:
letra.addEventListener('click', (e) => {
    // Comprueba si estan picando dos veces la misma letra repetida incorrecta
    if(falladaRepetida !== true){

        tiempoLetra.setSeconds(31);

    console.log(tiempoLetra.getSeconds());
    // Comprobar si la letra ya está almacenada en los arrays de letras falladas o de letras acertadas
    // con lo cual no entraría aquí y seguiría corriendo el tiempo
    if (tiempoLetra.getSeconds() === 31 && esPanelLetras !== true) {
        
        clearTimeout(almacenaTiempoLetra);
        // Siempre que los segundos estén a 30 se iniciará el intervalo:
        cuentaAtrasLetra();
    }
    }   
});

function cuentaAtrasLetra() {

        actualizarCronometro();

        if(tiempoLetra.getSeconds() === 0){
            
            intentos--;
            errores++;
            // actualizamos valores de los elementos del html:
            nombreErrors.innerHTML = errores;
            nombreIntents.innerHTML = intentos;
            // Reiniciamos el tiempo para volver a iniciar el setTimeOut en caso de que no piquen ninguna letra:
            tiempoLetra.setSeconds(31);
        }

        if (tiempoLetra.getSeconds() > 0) {
            // Llamada recursiva a la funcion que a su vez llamará a actualizar cronómetro
            // ambas se comunican el tiempo para que se pueda disparar el condicional de cuentaAtras en caso de llegar a 0
            // el crono y posteriormente reiniciarlo en caso de que no se pique
            almacenaTiempoLetra = setTimeout(cuentaAtrasLetra, 1000);
        }
}

// Función para actualizar el cronómetro en la interfaz
function actualizarCronometro() {

    // Controlará cuando limpiar el intervalo y volver a llamar a cuentaaTRASLetra
    contadorVecesQueEntra = 0;
    // Obtener los segundos actuales
    let segundosLetra = tiempoLetra.getSeconds();

    // Si los segundos son superiores a cero iremos reduciendo:
    if (segundosLetra > 0) {
        contadorVecesQueEntra++;
        segundosLetra = segundosLetra - 1;
        tiempoLetra.setSeconds(segundosLetra);
    }

    if (contadorVecesQueEntra === 30) {
        clearTimeout(almacenaTiempoLetra);
        // Siempre que los segundos estén a 30 se iniciará el intervalo:
        cuentaAtrasLetra();
    }

    if (segundosLetra < 10) {
        segundosLetra = "0" + segundosLetra;
    }
    // Va actualizando en el html el crono:
    cronoLetra.innerHTML = "00:" + "00" + ":" + segundosLetra;
}


