
let products = [];  // Array de productos vacío
let filteredProducts = [];  // Array de productos filtrados

// Función para cargar productos desde el archivo JSON
function loadProducts() {
  // Cargar el JSON correctamente
  fetch('./js/productos.json')
  .then(response => response.json())
  .then(data => {
    const productos = data.productos; // Asegúrate de que esto es un array
    if (Array.isArray(productos)) {
      products = productos; // Asignar el array a la variable global
      renderProducts(); // O llama a una función para mostrar los productos
    } else {
      console.error('Error: los productos no son un array');
    }
  })
  .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para aplicar el filtro
function applyFilter() {
  const filter = document.getElementById('filter-options').value;
  
  if (filter === 'all') {
    filteredProducts = [...products];  // Mostrar todos los productos
  } else if (filter === 'highRated') {
    filteredProducts = products.filter(product => product.rating >= 4);  // Filtro por calificación alta
  } else if (filter === 'lowPrice') {
    filteredProducts = products.filter(product => product.price < 500);  // Filtro por precio bajo
  } else if (filter === 'highPrice') {
    filteredProducts = products.filter(product => product.price >= 500);  // Filtro por precio alto
  }

  renderProducts();  // Renderizar los productos filtrados
}

// Función para renderizar los productos
function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';  // Limpiar el contenedor de productos

  filteredProducts.forEach(product => {
    const productCard = `
      <div class="col-4 card-prod" data-id="${product.id}" data-nombre="${product.nombre}" data-precio="${product.precio}" data-img="${product.imagen}">
        <img src="${product.imagen}" alt="${product.nombre}" class="cart-item-img">
        <h4 class="titulo-card">${product.nombre}</h4>
        <p class="descripcion-card">${product.descripcion}</p>
        <p class="precio-card">$${product.precio.toFixed(2)}</p>
        <div class="rating">
          ${[...Array(5)].map((_, i) => `
            <span class="${i < product.rating ? 'filled' : ''}">★</span>
          `).join('')}
        </div>
        <button class="btn-card">Comprar</button>
      </div>
    `;
    productGrid.innerHTML += productCard;  // Añadir el producto al contenedor
  });
}

// Inicializar el filtro cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();  // Cargar los productos cuando se cargue el DOM
  document.getElementById('apply-filters-btn').addEventListener('click', applyFilter);  // Añadir el evento al botón de filtro
});
