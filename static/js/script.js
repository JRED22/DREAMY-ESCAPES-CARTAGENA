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

