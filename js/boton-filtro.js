document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('apply-filters-btn');
    const filterOptions = document.getElementById('filter-options');
    const productosDiv = document.getElementById('row');
    let productos = [];

    // Cargar productos desde el JSON
    fetch('js/productos.json')
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

    // Agregar evento de 'click' para aplicar filtros solo si los elementos están presentes
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            const category = document.getElementById('filter-category').value;
            const maxPrice = document.getElementById('filter-price').value;

            // Filtrar productos
            const filteredProducts = productos.filter(product => {
                const matchesCategory = category === 'all' || product.categoria === category;
                const matchesPrice = !maxPrice || product.precio <= parseFloat(maxPrice);
                return matchesCategory && matchesPrice;
            });

            renderizarProductos(filteredProducts);  // Renderizar productos filtrados
        });
    }
    
    // Función para renderizar productos
    function renderizarProductos(productsToRender) {
        productosDiv.innerHTML = ''; // Limpiar productos existentes

        // Verificar si hay productos que renderizar
        if (productsToRender.length === 0) {
            productosDiv.innerHTML = '<p>No se encontraron productos con los filtros seleccionados.</p>';
            return;
        }

        // Renderizar productos
        productsToRender.forEach(product => {
            const productHTML = `
                <div class="col-4 card-prod" data-id="${product.id}" data-nombre="${product.nombre}" data-precio="${product.precio}" data-img="${product.imagen}">
                    <img src="${product.imagen}" alt="${product.nombre}" id="product-img" class="cart-item-img">
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

        // Agregar eventos a los botones de compra
        document.querySelectorAll('.btn-card').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const productId = card.getAttribute('data-id');
                const productName = card.getAttribute('data-nombre');
                const productPrice = card.getAttribute('data-precio');
                const productImage = card.getAttribute('data-img');
                agregarAlCarrito({ id: productId, nombre: productName, precio: productPrice, imagen: productImage });
            });
        });
    }

    // Renderizar estrellas de rating
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
    

    // Función para agregar al carrito
    function agregarAlCarrito(product) {
        console.log('Producto agregado al carrito:', product);
    }
});
