// Menú hamburguesa para la versión móvil
const logoHamburguesa = document.querySelector('.svg-menu-hamburguesa')
const menuDesplegado = document.querySelector('.menu-paginas')

if (logoHamburguesa && menuDesplegado) {
    logoHamburguesa.addEventListener('click', () => {
        menuDesplegado.classList.toggle('menu-paginas-abierto')
        logoHamburguesa.classList.toggle('hamburguesa-activa')
    })
}


// BOTÓN PARA VOLVER ARRIBA 

const btnSubir = document.getElementById('btn-arriba')

if (btnSubir) {
    window.addEventListener('scroll', () => {

        // Calculamos cuanto ha bajado el usuario en la web
        let progresoPantalla = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 // * 100 para que nos salga en %

        // Creamos un if para que salga el boton cuando el usuario baje una parte de la pantalla
        if (progresoPantalla >= 30) { // si el calculo del progreso de la pantalla sale >= 20 ocurre:
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
let elementosOcultos = document.querySelectorAll('.oculto')

if (elementosOcultos.length > 0) { // primero se comprueba si hay alguna elemento con .oculto (asi evitamos que si hay alguna pagina sin .oculto, de algun error)
    // definimos una constante que va a ser una funcion que observe y si detecte algo, que ejecute lo de dentro de la función
    const observer = new IntersectionObserver(function (elementosDetectados) {

        elementosDetectados.forEach(elementoDetectadoIndividual => { // Y por cada elemento que detecte
            if (elementoDetectadoIndividual.isIntersecting) { // y si esta en la pantalla (isIntersecting)
                elementoDetectadoIndividual.target.classList.add('visible') // se ejecuta esto, que es que se añade la clase 'visible'

                // dejamos de observarlo cuando ya lo haya mostrado
                observer.unobserve(elementoDetectadoIndividual.target)

                // Ahora lo que hacemos es que cuando se le de la clase 'visible' espere 1 segundo y luego se le de la clase 'terminado' para que no se solapen el tiempo de la animacion de scroll con los de los hovers
                setTimeout(() => {
                    elementoDetectadoIndividual.target.classList.add('terminado')
                }, 1000)
            }
        })
    })

    // hacemos que vigile los elementos de la lista definida aqui => let elemetosOcultos = document.querySelectorAll('.oculto')
    elementosOcultos.forEach(elementoOculto => { // por cada elemento de esta lista
        observer.observe(elementoOculto) // le decimos al observer que vigile a cada elemento oculto par que se active luego el bloque anterior 
    })
}
