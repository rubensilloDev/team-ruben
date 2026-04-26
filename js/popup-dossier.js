// Para el popup:

// Seleccionamos los elementos que vamos a usar del HTML
/* El overlay
El botón de abrir
El botón de cerrar (la X)
El botón de enviar
El div donde aparece el mensaje de éxito/error
*/

let contenedorDossier = document.querySelector('.contenedor-dossier')
let botonesAbrirDossier = document.querySelectorAll('.btn-descargaDossier-pdf')
let botonCerrarDossier = document.querySelector('.cerrar-popup')
let botonEnviarDossier = document.querySelector('.btn-enviar-dossier')
let mensajeErrorExito = document.querySelector('.popup-mensaje')
let cursoActual = ""

// Funcionalidad de que al pulsar al boton de descargar el dossier aparezca el popup
botonesAbrirDossier.forEach(function (boton) {
    boton.addEventListener('click', function () {
        cursoActual = this.dataset.curso
        contenedorDossier.classList.add('abierto')
    })
})

// Al darle a la X se cierre el popup
botonCerrarDossier.addEventListener('click', function () {
    contenedorDossier.classList.remove('abierto')
})


// Cuando se haga clic fuera del poup tb se cierre
contenedorDossier.addEventListener('click', function (comprobarClic) {
    if (comprobarClic.target === contenedorDossier) { // el target, es preguntar donde se ha echo clic, y aqui decimos => ¿Se ha echo clic en el contenedor del dossier (el cual es el fondo borroso)?
        contenedorDossier.classList.remove('abierto')
    }
})

// Comprobar que al enviar el formulario ninguno de los campos esten vacios, y mostrar un mensaje u otro

// Inicializamos el EmailJS con mi clave publica
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

botonEnviarDossier.addEventListener('click', function () {

    // recogemos todos los inputs de cada campo

    let nombre = document.querySelector('#popup-nombre').value
    let apellidos = document.querySelector('#popup-apellidos').value
    let email = document.querySelector('#popup-email').value

    // primero limpiamos
    mensajeErrorExito.classList.remove('error')
    mensajeErrorExito.classList.remove('exito')

    // Combinar esto con el EmailJS que es para que al usuario le pueda llegar el correo con el contenido que he definido en emailjs

    // comprobamos que ningun campo esta vacío
    if (nombre === "" || apellidos === "" || email === "") {
        mensajeErrorExito.textContent = 'Rellena los campos' // ponemos que el mensaje muestre un texto pq en el html no hemos pusto texto
        mensajeErrorExito.classList.add('error')
    }

    // si ningun campo esta vacio, comprobamos que nombre y apellidos no tienen ningun digito del 0-9
    else if (nombre === "" || /\d/.test(nombre) || apellidos === "" || /\d/.test(apellidos)) {
        mensajeErrorExito.textContent = 'Nombre y/o Apellidos no son válidos o estan vacios. ' // ponemos que el mensaje muestre un texto pq en el html no hemos pusto texto
        mensajeErrorExito.classList.add('error')
    }

    // sin no tienen ningun digito, comprobamos que el email tiene el @
    else if ((!email.includes('@'))) { // comprobamos que contiene el @ del gmail que ponga el usuario  
        mensajeErrorExito.textContent = 'El email debe contener "@"' // ponemos que el mensaje muestre un texto pq en el html no hemos pusto texto
        mensajeErrorExito.classList.add('error')
    }

    // y si todo lo antenior no se cumple, es decir, todos los campos estan rellenados correctamente, se ejcuta lo siguiente:
    else {
        // primero eliminamos las etiqutas de los mensajes para que no salga ninguno
        mensajeErrorExito.classList.remove('error')
        mensajeErrorExito.classList.remove('exito')

        // luego ponemos que si el boton (cursoActual) es perdida de grasa, ganancia de masa muscular o el curso de nutricion, pues cada uno tenga un enlace diferente para descargar el dossier del pdf

        let enlacePdf = ""

        if (cursoActual === "perdida") {
            enlacePdf = "https://drive.google.com/file/d/12cryqMXcEbr76dxq4hvm8CuwWu7LgTnm/view?usp=sharing"
        } else if (cursoActual === "musculo") {
            enlacePdf = "https://drive.google.com/file/d/14KQfcYWc9NR2Ar7kcQv5K61n-DfU8IFH/view?usp=sharing"
        } else {
            enlacePdf = "https://drive.google.com/file/d/1pS5FOrmX6GrA8qzWRWC-89tlxyKGvQF4/view?usp=sharing"
        }

        // y luego enviamos al emailjs los datos que necesita
        emailjs.send('service_teamruben', 'template_733jo5e', {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            enlace_pdf: enlacePdf
        })
            // y al enviar los datos, al usuario le aparece una aleta en el navegador dependendiendo si se a enviado bien o no.
            .then(function () {
                alert("✅ ¡Dossier enviado! Revisa tu correo.")
            })
            .catch(function () {
                alert("❌ Error al enviar. Inténtalo de nuevo.")
            })
    }
})
