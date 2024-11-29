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
    }else{
        document.getElementById("contenido").innerHTML = "Error al cargar los datos";
    }

    }
    $(document).ready(function(){
        setTimeout(function(){
            $("#mensaje").fadeOut();  // Esto ocultará el div suavemente
        }, 3000); // 3000 milisegundos = 3 segundos
    });
