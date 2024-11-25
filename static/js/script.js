// Función para filtrar restaurantes según el rango de precios
function filterRestaurants(priceRange) {
    const cards = document.querySelectorAll('.card'); // Selecciona todas las tarjetas
    cards.forEach((card) => {
      // Compara el atributo data-price de cada tarjeta con el rango de precios seleccionado
      if (card.getAttribute('data-price') === priceRange || priceRange === 'all') {
        card.style.display = 'block'; // Muestra la tarjeta si coincide
      } else {
        card.style.display = 'none'; // Oculta la tarjeta si no coincide
      }
    });
  }
