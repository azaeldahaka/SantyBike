export function renderizarProductos(productos, contenedor) {
    contenedor.innerHTML = productos
        .map(
            (producto) => `
            <div class="small-container" id="productos">
                <div class="row filter-category">
                    <div class="col-4 card-prod" data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}" data-img="${producto.imagen}">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="cart-item-img">
                        <h4 class="titulo-card">${producto.nombre}</h4>
                        <p class="descripcion-card">${producto.descripcion}</p>
                        <p class="precio-card">$${producto.precio.toFixed(2)}</p>
                        <div class="rating">
                        ${[...Array(5)].map((_, i) => `
                            <span class="${i < producto.raiting ? 'filled' : ''}">★</span>
                        `).join('')}
                        </div>
                        <button class="btn-card">Comprar</button>
                    </div>
                </div>
            </div>
            `
        )
        .join("");
}
