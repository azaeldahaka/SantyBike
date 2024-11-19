document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-btn');
    const filterOptions = document.getElementById('filter-options');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const productList = document.getElementById('product-list');

    const products = [
        { id: 1, nombre: 'Bicicleta Montaña', categoria: 'bicicletas', precio: 4500 },
        { id: 2, nombre: 'Casco de Seguridad', categoria: 'accesorios', precio: 800 },
        { id: 3, nombre: 'Bicicleta Urbana', categoria: 'bicicletas', precio: 5200 },
        { id: 4, nombre: 'Guantes de Ciclismo', categoria: 'accesorios', precio: 500 },
    ];

    // Mostrar u ocultar opciones de filtro
    filterBtn.addEventListener('click', () => {
        filterOptions.classList.toggle('hidden');
    });

    // Aplicar filtros
    applyFiltersBtn.addEventListener('click', () => {
        const category = document.getElementById('filter-category').value;
        const maxPrice = document.getElementById('filter-price').value;

        const filteredProducts = products.filter(product => {
            const matchesCategory = category === 'all' || product.categoria === category;
            const matchesPrice = !maxPrice || product.precio <= parseFloat(maxPrice);
            return matchesCategory && matchesPrice;
        });

        renderProducts(filteredProducts);
    });

    // Renderizar productos
    function renderProducts(productsToRender) {
        productList.innerHTML = '';
        productsToRender.forEach(product => {
            const productHTML = `
                <div class="product-card">
                    <h3>${product.nombre}</h3>
                    <p>Categoría: ${product.categoria}</p>
                    <p>Precio: $${product.precio}</p>
                </div>
            `;
            productList.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Render inicial
    renderProducts(products);
});
