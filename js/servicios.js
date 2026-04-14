// Funcionalidad a las pestañas de los cursos 

// Primero antes de empezar delcaramos variables necesarias para poder tener cada boton y cada articulo
let pestañas = document.querySelectorAll('.pestaña-curso')
let contenidoPestañas = document.querySelectorAll('.curso-perdidaGrasa, .curso-ganancia-de-masa-muscular, .curso-nutrición')

// Como quiero que se muestre primero solo el primer boton (perdida de grasa), junto con su contenido.
pestañas[0].classList.add('visible')
contenidoPestañas[0].classList.add('visible')
// hacemos que nada mas abrir la pagina se muestre, en este caso, el curso de perdida de grasa y sui contenido
// y como el querySelectorAll devuelve como una lista, parecido a un array, con las clases que encuentre en el HTML, entonces podemos accder a sus indices


// Definimos un eventLisener click oara que cuando haga click ejecute lo de dentro
pestañas.forEach(function (pestaña) { // como es una lista, debemos poner el forEach para que se aplique a cada uno de esa lista
    pestaña.addEventListener('click', function () {

        // primero borramos todos los activos que haya
        pestañas.forEach(function (cadaPestaña) {
            cadaPestaña.classList.remove('visible')
        })

        contenidoPestañas.forEach(function (contenidoIndividualPestañas) {
            contenidoIndividualPestañas.classList.remove('visible')
        })

        // luego, si se "escucha" el clic (es decir, el usuario le da a un boton), se va a ejecutar (despues de lo de eliminar los visibles) lo siguiente:
        pestaña.classList.add('visible')

        // para activar el contenido de ese boton pulsado
        // 1. Encontramos el data que hemos puesto en el boton de pestaña
        let valor = pestaña.dataset.pestaña
        // 2. Y definimos: encuentra el id que tenga de nombre el valor sacado de antes (let valor = pestaña.dataset.pestaña), en este caso que encuentre el id con el nombre del valor de los data puestos en el HTML
        document.getElementById(valor).classList.add('visible') // y que al encontrar el id, le añada a ese id, la clase "visible"
    })
})

