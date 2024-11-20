// Filtrar productos por precio
const filterByPrice = (minPrice, maxPrice) => {
    const products = document.querySelectorAll('.card-prod');
    products.forEach(product => {
      const price = parseInt(product.getAttribute('data-precio'));
      if (price >= minPrice && price <= maxPrice) {
        product.style.display = 'block'; // Muestra el producto
      } else {
        product.style.display = 'none'; // Oculta el producto
      }
    });
  };
  
  // Filtrar productos por nombre
const filterByName = (searchTerm) => {
    const products = document.querySelectorAll('.card-prod');
    products.forEach(product => {
      const name = product.getAttribute('data-nombre').toLowerCase();
      if (name.includes(searchTerm.toLowerCase())) {
        product.style.display = 'block'; // Muestra el producto
      } else {
        product.style.display = 'none'; // Oculta el producto
      }
    });
};

// Definir la función para actualizar productos
function actualizarProductos(filtrados) {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';  // Vaciar contenido actual
    if (filtrados.length === 0) {
        contenedor.innerHTML = '<p>No hay productos que coincidan con el filtro.</p>';
    } else {
        filtrados.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('col-4', 'card-prod');
            productoElement.innerHTML = `
                <img src="${producto.img}" alt="" class="cart-item-img">
                <h4 class="titulo-card">${producto.nombre}</h4>
                <p class="descripcion-card">${producto.descripcion}</p>
                <p class="precio-card">$${producto.precio}</p>
            `;
            contenedor.appendChild(productoElement);
        });
    }
}

// Ejemplo de cómo aplicar un filtro:
document.getElementById('filtro').addEventListener('click', function() {
    const productosFiltrados = aplicarFiltro(); // Aplica el filtro aquí
    actualizarProductos(productosFiltrados);
});

function aplicarFiltro() {
    // Simular un filtro
    return productos.filter(producto => producto.precio < 100); // Ejemplo de filtro
}
