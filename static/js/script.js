 // Cargar tours al inicio y cuando cambien los filtros
 document.addEventListener("DOMContentLoaded", () => {
        
    document.getElementById("form-Tours-filtro").addEventListener("change", loadTours);
         loadTours();
     setTimeout(function(){
         $("#mensaje").fadeOut();  // Esto ocultará el div suavemente
     }, 3000); // 3000 milisegundos = 3 segundos

 });
 
 // $(document).ready(function(){
    
 //  });


// Filtrar tarjetas según el rango de precios
function filterRestaurants(priceRange) {
    const cards = document.querySelectorAll('#restaurants .restaurant-card'); // Selección específica
    cards.forEach(card => {
        if (priceRange === 'all' || card.classList.contains(priceRange)) {
            card.style.display = 'flex'; // 'flex' mantiene el diseño
        } else {
            card.style.display = 'none';
        }
    });
}


//----------------------------------------------- Ajax para carga de Archivoa ------------------------------------------------

async function cargar(pagina) {

    const navlinks = document.querySelectorAll('.menu-activo');
    //navlinks.forEach(link => {
    //link.classList.remove('menu-activo');
    //})

    const equipo = await fetch(`/${pagina}`);

    if (equipo.ok) {
        document.getElementById("mensaje").innerHTML = await equipo.text()
        //  document.getElementById(pagina).classList.add("menu-activo");
    } else {
        document.getElementById("contenido").innerHTML = "Error al cargar los datos";
    }

    }
    // ---------------------------------   funcion ajax tours------------------------------------------
    function loadTours() {
        // Obtener los filtros seleccionados
    //print("Loading");
        const filters = {
            precio_tour: document.getElementById("precio_tour").value,
            duracion_tours: document.getElementById("duracion_tours").value,
            categoria_tours: document.getElementById("categoria_tours").value,
        };
       
        // Crear query string para la solicitud
        const queryString = new URLSearchParams(filters).toString();
      
        // Hacer solicitud a la API
        fetch(`/api/tours?${queryString}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById("tours-container");
                container.innerHTML = ""; // Limpiar el contenedor
    
                if (data.length === 0) {
                    container.innerHTML = "<p class='text-center'>No se encontraron tours.</p>";
                    return;
                }
    
                // Insertar las tarjetas
                data.forEach(tour => {
                    const card = `
                 
                            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                                <div class="card tour-card">
                                    <img src="${tour.image_url}" class="card-img-top" alt="${tour.titulo}">
                                    <div class="card-body">
                                        <h5 class="card-title">${tour.titulo}</h5>
                                        <p class="precio text-success">$${tour.precio_tour} COP</p>
                                         <p class="card-text text-success">$${tour.precio_tour*4,374} USD</p>
                                        <p class="duracion"> ${tour.duracion_tours}</p>
                                        <p class="descripcion"> ${tour.description}</p>
                                       
                                        <a href="#" class="btn btn-warning w-100 btn-sm">Reservar</a>
                                    </div>
                                </div>
                            </div>
                    `;
                    container.insertAdjacentHTML("beforeend", card);
                });
            })
            .catch(error => console.error("Error al cargar los tours:", error));
    }
    
 
    
   

// //-------------------------agregar un tours
document.getElementById('guardar-btn').addEventListener('click', () => {
    // Capturar los valores del formulario
    const titulo_add = document.getElementById('titulo_add').value;
    const precio_add = document.getElementById('precio_add').value;
    const duracion_add = document.getElementById('duracion_add').value;
    const categoria_add = document.getElementById('categoria_add').value;
    const image_url_add = document.getElementById('image_url_add').value;
    const descripcion_add = document.getElementById('descripcion_add').value;

    // Validar los campos
    if (!titulo_add || !precio_add || !duracion_add || !categoria_add || !image_url_add || !descripcion_add) {
        mostrarMensaje('Por favor, complete todos los campos.', 'danger');
        return;
    }

    // Crear un objeto con los datos
    const data = {
        titulo_add,
        precio_add: parseFloat(precio_add),
        duracion_add,
        categoria_add,
        image_url_add,
        descripcion_add
    };

    // Enviar los datos al servidor usando fetch
    fetch('/agregar_tour', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            mostrarMensaje('Tour agregado con éxito.', 'success');
            document.getElementById('form_add_tours').reset();
        } else {
            mostrarMensaje('Hubo un error al agregar el tour.', 'danger');
        }
    })
    .catch(() => {
        mostrarMensaje('Error al conectar con el servidor.', 'danger');
    });
});

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensaje_add');
    mensajeDiv.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
}