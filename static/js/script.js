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
    // ---------------------------------   funcion ajax tours
    function loadTours() {
        // Obtener los filtros seleccionados
     
        const filters = {
            price: document.getElementById("price").value,
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
                                        <p class="duracion"> ${tour.duration}</p>
                                        <p class="descripcion"> ${tour.description}</p>
                                       
                                        <a href="#" class="btn btn-success w-100 btn-sm">Reservar</a>
                                    </div>
                                </div>
                            </div>
                    `;
                    container.insertAdjacentHTML("beforeend", card);
                });
            })
            .catch(error => console.error("Error al cargar los tours:", error));
    }
    



    // Cargar tours al inicio y cuando cambien los filtros
    document.addEventListener("DOMContentLoaded", () => {
        loadTours();
        document.getElementById("filters-form").addEventListener("change", loadTours);
    });
    
    $(document).ready(function(){
        setTimeout(function(){
            $("#mensaje").fadeOut();  // Esto ocultará el div suavemente
        }, 3000); // 3000 milisegundos = 3 segundos
    });