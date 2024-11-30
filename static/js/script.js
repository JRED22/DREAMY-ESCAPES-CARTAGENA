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
$(document).ready(function () {
    setTimeout(function () {
        $("#mensaje").fadeOut();  // Esto ocultará el div suavemente
    }, 3000); // 3000 milisegundos = 3 segundos


});
$(document).ready(function () {
    const places = [
        {
            title: "Castillo de San Felipe de Barajas",
            description: "Un castillo histórico con vistas panorámicas y una rica historia militar.",
            price: "COP 25,000",
            image: "castillo.jpg"
        },
        {
            title: "Islas del Rosario",
            description: "Archipiélago famoso por sus playas de aguas cristalinas.",
            price: "COP 100,000 - 150,000",
            image: "rosario.jpg"
        },
        {
            title: "Playa Blanca, Isla Barú",
            description: "Playa con aguas tranquilas y arena blanca cerca de Cartagena.",
            price: "COP 40,000 - 70,000",
            image: "playa_blanca.jpg"
        },
        {
            title: "Cerro de La Popa",
            description: "Convento convertido en museo con las mejores vistas de la ciudad.",
            price: "COP 10,000",
            image: "popa.jpg"
        },
        {
            title: "Museo Histórico de Cartagena",
            description: "Ubicado en el antiguo Palacio de la Inquisición, con una rica historia.",
            price: "COP 10,000",
            image: "muhca.jpg"
        },
        {
            title: "Mercado de Bazurto",
            description: "Vibrante mercado local para probar comida típica.",
            price: "Gratis",
            image: "bazurto.jpg"
        }
    ];

    let cardsHtml = "";
    places.forEach(place => {
        cardsHtml += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="/static/images/${place.image}" alt="${place.title}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${place.title}</h5>
                            <p class="card-text">${place.description}</p>
                            <p class="card-text"><strong>Precio:</strong> ${place.price}</p>
                        </div>
                    </div>
                </div>
            `;
    });

    $("#cards-container").html(cardsHtml);
});
