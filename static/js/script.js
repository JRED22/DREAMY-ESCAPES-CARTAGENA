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
    
  
        const filters = {
            precio_tour: document.getElementById("precio_tour").value,
            duracion_tours: document.getElementById("duracion_tours").value,
            categoria_tours: document.getElementById("categoria_tours").value,
        };
       // print(precio_tour);
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
    
    // --------------------------------------------------------------------restaurantes 
    function filtrar_restaurantes() {
        // Obtener valores de los filtros
        const categoria = document.getElementById('categoria_restaurantes').value;
        const precioMax = document.getElementById('precio_restaurantes').value;
    //alert(precioMax);
        // Obtener todas las tarjetas
        const tarjetas = document.querySelectorAll('.card-item');
    
        tarjetas.forEach(tarjeta => {
            // Obtener atributos de cada tarjeta
            const tarjetaCategoria = tarjeta.getAttribute('data-category');
            const tarjetadiscoprecio = tarjeta.getAttribute('data-price');
      //alert(tarjetaCategoria);
            // Condiciones de filtrado
            const cumpleCategoria = categoria === "" || tarjetaCategoria === categoria;
            const cumplePrecio = precioMax === "" || tarjetadiscoprecio == precioMax;
    
            // Mostrar u ocultar tarjetas según las condiciones
            if (cumpleCategoria && cumplePrecio) {
                tarjeta.style.display = 'block';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    }
    
    // Asociar eventos de cambio a los filtros
    //document.getElementById('filterCategory').addEventListener('change', filtrarTarjetas);
    //document.getElementById('filterPrice').addEventListener('change', filtrarTarjetas);
    
    
   
// --------------------------------------------------------------------bar disco 
function filtrarbardisco() {
    
    // Obtener valores de los filtros
    // const categoria = document.getElementById('filterCategory').value;
    const precio_bar= document.getElementById('precio_bar').value;
    
    // Obtener todas las tarjetas
    const tarjetas_sitios = document.querySelectorAll('.card_bardisco');

   
       
       tarjetas_sitios.forEach(tarjetas_sitios => {
        // Obtener atributos de cada tarjeta
        
        //const tarjetaCategoria = tarjeta.getAttribute('data-category');
        const tarjetadiscoprecio = tarjetas_sitios.getAttribute('data-preciodisco');
        //alert(tarjetadiscoprecio);
        // Condiciones de filtrado
        const cumplePrecio = precio_bar === "" || tarjetadiscoprecio==(precio_bar);

        // Mostrar u ocultar tarjetas según las condiciones
        if ( cumplePrecio) {
            tarjetas_sitios.style.display = 'block';
        } else {
            tarjetas_sitios.style.display = 'none';
        }
    });
}

// Asociar eventos de cambio a los filtros
//document.getElementById('filterCategory').addEventListener('change', filtrarTarjetas);
//document.getElementById('filterPrice').addEventListener('change', filtrarTarjetas);

// --------------------------------------------------------------------sitios turisticos
function filtrarsitios() {
    
    // Obtener valores de los filtros
    const categoria_sitios = document.getElementById('categorias_sitios').value;
    const precio_sitios= document.getElementById('precio_sitios').value;
    
    
    // Obtener todas las tarjetas
    const tarjetas_sitios = document.querySelectorAll('.card_sitios_t');

    //alert (tarjetas_sitios);
       
       tarjetas_sitios.forEach(tarjetas_sitios => {
        // Obtener atributos de cada tarjeta
        
        const tarjetaCategoriasitios = tarjetas_sitios.getAttribute('data-categoriasitios');
        const tarjetapreciositio = tarjetas_sitios.getAttribute('data-preciositios');
      
        // Condiciones de filtrado
        const cumpleCategoria = categoria_sitios  === "" || tarjetaCategoriasitios  === categoria_sitios;
        const cumplePrecio = precio_sitios === "" || tarjetapreciositio==(precio_sitios);

        // Mostrar u ocultar tarjetas según las condiciones
        if ( cumpleCategoria && cumplePrecio) {
            tarjetas_sitios.style.display = 'block';
        } else {
            tarjetas_sitios.style.display = 'none';
        }
    });
}

// Asociar eventos de cambio a los filtros
//document.getElementById('filterCategory').addEventListener('change', filtrarTarjetas);
//document.getElementById('filterPrice').addEventListener('change', filtrarTarjetas);


// //-------------------------agregar un tours

function guardarTour(){
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

}
// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensaje_add');
    mensajeDiv.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
}
//----------------------------------------------- Ajax para cargas Servicio_ppls------------------------------------------------

async function cargar_servicio(servicio_ppl) {
 
  
    //const navlinks = document.querySelectorAll('.menu-activo');
    //navlinks.forEach(link => {
    // //link.classList.remove('menu-activo');
    // //})

    const servicio = await fetch(`/${servicio_ppl}`);
    
    //alert (servicio );
  
             if (servicio.ok) {
        document.getElementById("container_servicios").innerHTML = await servicio.text()
     } else {
        document.getElementById("container_servicios").innerHTML = "Error al cargar los datos";
    }

    }

    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        setTimeout(() => {
            messageBox.classList.add('hidden');
        }, 3000);
    }
    function mostrarResultado() {
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const resultado = document.getElementById('resultado');

        if (origen && destino) {
            resultado.value = `$20000`;
        } else {
            resultado.value = 'Por favor, selecciona un origen y un destino.';
        }
    }