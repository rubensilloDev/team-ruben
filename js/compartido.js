// Menú hamburgues para la versión móvil

// Definimos una constante que será el menu hamburguesa y otra que sera el menu que se despliega con las paginas por las que se puede navegar
const logoHamburguesa = document.querySelector('.svg-menu-hamburguesa')
const menuDesplegado = document.querySelector('.menu-paginas')
const logoHamburguesaCerrado = document.querySelector('.svg-menu-hamburguesa-cerrar')

if (logoHamburguesa && menuDesplegado && logoHamburguesaCerrado) {
    // aqui definimos que cuando se haga clicl pase lo que esta dentro
    logoHamburguesa.addEventListener('click', () => {
        menuDesplegado.classList.toggle('menu-paginas-abierto') // le cambie la clase a "menu-paginas-abierto" y se pondra con los estilos dados en css
        if (menuDesplegado.classList.contains('menu-paginas-abierto')) {
            logoHamburguesaCerrado.classList.add('hamburguesaCerrar-visible')
            logoHamburguesa.classList.add('hamburguesa-no-visible')
        } else {
            logoHamburguesa.classList.remove('hamburguesa-no-visible')
            logoHamburguesaCerrado.classList.remove('hamburguesaCerrar-visible')
        }
    })

    // y aqui cuando le den a la X para cerrar el menu le borramos todas las clases de antes para que se cierre todo y vuelva a la "normalidad"
    logoHamburguesaCerrado.addEventListener('click', () => {
        menuDesplegado.classList.remove('menu-paginas-abierto')
        logoHamburguesaCerrado.classList.remove('hamburguesaCerrar-visible')
        logoHamburguesa.classList.remove('hamburguesa-no-visible')
    })
}


// BOTÓN PARA VOLVER ARRIBA 

const btnSubir = document.getElementById('btn-arriba')

if (btnSubir) {
    window.addEventListener('scroll', () => {

        // Calculamos cuanto ha bajado el usuario en la web
        let progresoPantalla = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

        // Creamos un if para que salga el boton cuando el usuario baje una parte de la pantalla
        if (progresoPantalla >= 20) { // si el calculo del progreso de la pantalla sale >= 20 ocurre:
            btnSubir.classList.add('btn-volverArriba-aparecer') // se le añade la clase "btn-volverArriba-aparecer" 
        } else {
            btnSubir.classList.remove('btn-volverArriba-aparecer') // si no, se le borra la clase
        }

    })

    // La accion que debe de ocurrir cuando el boton se pulse el botón
    btnSubir.addEventListener('click', () => { // añadimos un evento que escuche el clic
        window.scrollTo({ top: 0, behavior: 'smooth' }) // cuando se haga el clic, se va el scroll de la pantlla hacia arriba del todo 
    })
}


// ANIMACIONES AL HACER SCROLL
// declaramos una constante que recoja todos los elementos con la clase .oculto del css
let elemetosOcultos = document.querySelectorAll('.oculto')

if (elemetosOcultos.length > 0) {
    // definimos una constante que va a ser una funcion que observe y si detecte algo, que ejecute lo de dentro de la función
    const observer = new IntersectionObserver(function (elementosDetectados) {

        elementosDetectados.forEach(elementoDetectadoIndividual => { // Y por cada elemento que detecte
            if (elementoDetectadoIndividual.isIntersecting === true) { // y si esta en la pantalla (isIntersecting)
                elementoDetectadoIndividual.target.classList.add('visible') // se ejecuta esto, que es que se añade la clase 'visible'

                // Ahora lo que hacemos es que cuando se le de la clase 'visible' espere 1 segundo y luego se le de la clase 'terminado' para que no se solapen el tiempo de la animacion de scroll con los de los hovers
                setTimeout(() => {
                    elementoDetectadoIndividual.target.classList.add('terminado')
                }, 1000)
            }
        })
    })

    // hacemos que vigile lo    s elementos de la lista definida aqui => let elemetosOcultos = document.querySelectorAll('.oculto')
    elemetosOcultos.forEach(elementoOculto => { // por cada elemento de esta lista
        observer.observe(elementoOculto) // le decimos al observer que vigile a cada elemento oculto par que se active luego el bloque anterior 
    })
}
