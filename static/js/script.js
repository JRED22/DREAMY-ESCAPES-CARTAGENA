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
    $(document).ready(function(){
        setTimeout(function(){
            $("#mensaje").fadeOut();  // Esto ocultará el div suavemente
        }, 3000); // 3000 milisegundos = 3 segundos
    });
    document.addEventListener('DOMContentLoaded', () => {
        const filtersForm = document.getElementById('filters-form');
        const cards = document.querySelectorAll('.site-card'); // Selecciona todas las tarjetas
    
        filtersForm.addEventListener('change', () => {
            const priceFilter = document.getElementById('price').value;
            const categoryFilter = document.getElementById('category').value;
    
            cards.forEach(card => {
                const matchesPrice = !priceFilter || card.dataset.price <= priceFilter;
                const matchesCategory = !categoryFilter || card.dataset.category === categoryFilter;
    
                // Mostrar u ocultar la tarjeta dependiendo de los filtros seleccionados
                card.style.display = matchesPrice && matchesCategory ? 'block' : 'none';
            });
        });
    });
// Asegúrate de que el DOM esté cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    const filtersForm = document.getElementById('filters-form'); // Formulario de filtros
    const cards = document.querySelectorAll('#sites-container .col-md-4'); // Tarjetas de sitios turísticos

    filtersForm.addEventListener('change', () => {
        const priceFilter = document.getElementById('price').value; // Valor del filtro por precio
        const categoryFilter = document.getElementById('category').value; // Valor del filtro por categoría

        cards.forEach(card => {
            const matchesPrice = !priceFilter || card.dataset.price === priceFilter; // Coincidencia por precio
            const matchesCategory = !categoryFilter || card.dataset.category === categoryFilter; // Coincidencia por categoría

            // Mostrar u ocultar la tarjeta dependiendo de los filtros
            card.style.display = matchesPrice && matchesCategory ? 'block' : 'none';
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const filtersForm = document.getElementById('filters-form');
    const cards = document.querySelectorAll('#bars-container .col-md-4');

    filtersForm.addEventListener('change', () => {
        const priceFilter = document.getElementById('price').value;

        cards.forEach(card => {
            const matchesPrice = !priceFilter || card.dataset.price === priceFilter;

            card.style.display = matchesPrice ? 'block' : 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const priceSelect = document.getElementById('price');
    const categorySelect = document.getElementById('category');
    const restaurantsContainer = document.getElementById('restaurants-container');
    const restaurantCards = restaurantsContainer.getElementsByClassName('col-md-4');

    // Función para filtrar los restaurantes
    function filterRestaurants() {
        const selectedPrice = priceSelect.value.toLowerCase();
        const selectedCategory = categorySelect.value.toLowerCase();

        Array.from(restaurantCards).forEach(card => {
            const cardPrice = card.getAttribute('data-price').toLowerCase();
            const cardCategory = card.getAttribute('data-category').toLowerCase();

            // Mostrar u ocultar el restaurante según el filtro de precio y categoría
            if ((selectedPrice === '' || selectedPrice === cardPrice) &&
                (selectedCategory === '' || selectedCategory === cardCategory)) {
                card.style.display = 'block'; // Mostrar restaurante
            } else {
                card.style.display = 'none'; // Ocultar restaurante
            }
        });
    }

    // Escuchar cambios en los select de filtros
    priceSelect.addEventListener('change', filterRestaurants);
    categorySelect.addEventListener('change', filterRestaurants);

    // Llamar a la función de filtrado al cargar la página para aplicar los filtros iniciales
    filterRestaurants();
});
