document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('apply-filters-btn');
    const filterOptions = document.getElementById('filter-options');
    const productosDiv = document.getElementById('product-grid'); // Corregir el id del contenedor de productos
    let productos = [];

    // Cargar productos desde el JSON
    fetch('./js/productos.json') // Asegúrate de que la ruta del JSON es correcta
        .then(response => response.json())
        .then(data => {
            productos = data.productos;
            renderizarProductos(productos);  // Mostrar productos al cargar
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

    // Mostrar u ocultar opciones de filtro
    filterBtn.addEventListener('click', () => {
        filterOptions.classList.toggle('hidden');
    });

    // Aplicar filtro cuando se selecciona una opción y se presiona "Aplicar Filtro"
    filterOptions.addEventListener('change', () => {
        applyFilter();
    });

    function applyFilter() {
        const filter = filterOptions.value;
        let filteredProducts = [];

        // Filtrar productos según la opción seleccionada
        if (filter === 'all') {
            filteredProducts = productos;
        } else if (filter === 'highRated') {
            filteredProducts = productos.filter(product => product.raiting >= 4);  // Filtro por calificación alta
        } else if (filter === 'lowPrice') {
            filteredProducts = productos.filter(product => product.precio < 50000);  // Filtro por precio bajo
        } else if (filter === 'highPrice') {
            filteredProducts = productos.filter(product => product.precio >= 50000);  // Filtro por precio alto
        } else if (filter === 'cadenas') {
            filteredProducts = productos.filter(product => product.categoria === 'cadenas');
        } else if (filter === 'cajas') {
            filteredProducts = productos.filter(product => product.categoria === 'cajas');
        } else if (filter === 'cascos') {
            filteredProducts = productos.filter(product => product.categoria === 'cascos');
        }

        renderizarProductos(filteredProducts);  // Mostrar los productos filtrados
    }

    // Función para renderizar productos
    function renderizarProductos(productsToRender) {
        productosDiv.innerHTML = ''; // Limpiar productos existentes

        if (productsToRender.length === 0) {
            productosDiv.innerHTML = '<p>No se encontraron productos con los filtros seleccionados.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productHTML = `
                <div class="col-4 card-prod" data-id="${product.id}" data-nombre="${product.nombre}" data-precio="${product.precio}" data-img="${product.imagen}">
                    <img src="${product.imagen}" alt="${product.nombre}" class="cart-item-img">
                    <h4 class="titulo-card">${product.nombre}</h4>
                    <div class="descripcion-card">${product.descripcion}</div>
                    <div class="raiting">
                        ${renderRating(product.raiting)}
                    </div>
                    <p class="precio-card">$${product.precio}</p>
                    <button class="btn-card">Comprar</button>
                </div>
            `;
            productosDiv.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Función para renderizar estrellas de rating
    function renderRating(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '★'; // estrella rellena
            } else {
                stars += '☆'; // estrella vacía
            }
        }
        return stars;
    }
});
