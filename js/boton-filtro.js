document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-btn');
    const filterOptions = document.getElementById('filter-options');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const productosDiv = document.getElementById('productos');  // Aquí apuntamos al div productos
    
    let productos = [];

    // Cargar productos desde el JSON
    fetch('js/productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data.productos;
            renderizarProductos(productos); // Renderizar productos al cargar la página
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });

    // Mostrar u ocultar opciones de filtro
    filterBtn.addEventListener('click', () => {
        filterOptions.classList.toggle('hidden');
    });

    // Aplicar filtros
    applyFiltersBtn.addEventListener('click', () => {
        const category = document.getElementById('filter-category').value;
        const maxPrice = document.getElementById('filter-price').value;

        const filteredProducts = productos.filter(product => {
            const matchesCategory = category === 'all' || product.categoria === category;
            const matchesPrice = !maxPrice || product.precio <= parseFloat(maxPrice);
            return matchesCategory && matchesPrice;
        });

        renderizarProductos(filteredProducts);  // Actualizar solo el div productos
    });

    // Renderizar productos dentro de #productos
    function renderizarProductos(productsToRender) {
        productosDiv.innerHTML = ''; // Limpiar productos existentes
        productsToRender.forEach(product => {
            const productHTML = `
                <div class="product-card" data-id="${product.id}" data-nombre="${product.nombre}" data-precio="${product.precio}" data-img="${product.imagen}">
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
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '<i class="fi fi-sr-heart"></i>' : '<i class="fi fi-rr-heart"></i>';
        }
        return stars;
    }

    // Función para agregar al carrito
    function agregarAlCarrito(product) {
        console.log('Producto agregado al carrito:', product);
        // Aquí puedes agregar la lógica para guardar el producto en el carrito.
    }
});
