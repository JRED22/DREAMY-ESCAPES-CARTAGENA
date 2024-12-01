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
    