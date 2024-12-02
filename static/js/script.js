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
    // ---------------------------------   funcion ajax tours
    function loadTours() {
        // Obtener los filtros seleccionados
     
        const filters = {
             precio: document.getElementById("precio").value,
            duration: document.getElementById("duration").value,
            category: document.getElementById("category").value,
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
                                    <img src="${tour.image_url}" class="card-img-top" alt="${tour.title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${tour.title}</h5>
                                        <p class="precio text-success">$${tour.price} COP</p>
                                         <p class="card-text text-success">$${tour.price*4,374} USD</p>
                                        <p class="duracion"> ${tour.duration}</p>
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
    

    document.getElementById('guardar-btn').addEventListener('click', () => {
        // Capturar los valores del formulario
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const duration = document.getElementById('duration').value;
        const category = document.getElementById('category').value;
        const image_url = document.getElementById('image_url').value;
        const description = document.getElementById('description').value;
    
        // Validar los campos
        if (!title || !price || !duration || !category || !image_url || !description) {
            mostrarMensaje('Por favor, complete todos los campos.', 'danger');
            return;
        }
    
        // Crear un objeto con los datos
        const data = {
            title,
            price: parseFloat(price),
            duration,
            category,
            image_url,
            description
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
                document.getElementById('tour-form').reset();
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
        const mensajeDiv = document.getElementById('mensaje');
        mensajeDiv.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
    }
    


    // Cargar tours al inicio y cuando cambien los filtros
    document.addEventListener("DOMContentLoaded", () => {
        loadTours();
        setTimeout(function(){
            $("#mensaje").fadeOut();  // Esto ocultará el div suavemente
        }, 3000); // 3000 milisegundos = 3 segundos
    });
