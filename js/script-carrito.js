// // Array para almacenar productos en el carrito
// let carrito = [];

// // Función para añadir producto al carrito
// function agregarAlCarrito(event) {
//     const boton = event.target;
//     const producto = boton.closest('.card-prod');
//     const productoId = producto.getAttribute('data-id');
//     const titulo = producto.querySelector('.titulo-card').textContent;
//     const precio = producto.querySelector('.precio-card').textContent;
    
//     const productoCarrito = {
//         id: productoId,
//         titulo: titulo,
//         precio: precio
//     };

//     carrito.push(productoCarrito);
//     console.log(carrito); // Para verificar que el producto se añade correctamente
// }

// // Seleccionar todos los botones de compra
// const botonesCompra = document.querySelectorAll('.btn-card');

// // Añadir evento click a cada botón de compra
// botonesCompra.forEach(boton => {
//     boton.addEventListener('click', agregarAlCarrito);
// });




// document.addEventListener('DOMContentLoaded', () => {
//     const carritoIcon = document.querySelector('#icon-carrito-container');
//     const carritoAside = document.querySelector('#carrito');
//     const cerrarCarrito = document.querySelector('#cerrar-carrito');
//     const carritoBody = document.querySelector('.carrito-body');
//     const totalCarrito = document.querySelector('#total-carrito');
//     const vaciarCarrito = document.querySelector('#vaciar-carrito');
//     const comprarCarrito = document.querySelector('#comprar-carrito');
//     const contadorProductos = document.querySelector('#contador-productos');

//     let carrito = [];

//     carritoIcon.addEventListener('click', () => {
//         carritoAside.style.right = '0';
//     });

//     cerrarCarrito.addEventListener('click', () => {
//         carritoAside.style.right = '-100%';
//     });

//     vaciarCarrito.addEventListener('click', () => {
//         carrito = [];
//         actualizarCarrito();
//     });

//     comprarCarrito.addEventListener('click', () => {
//         alert('Compra realizada!');
//         carrito = [];
//         actualizarCarrito();
//     });

//     document.querySelectorAll('.btn-card').forEach(button => {
//         button.addEventListener('click', event => {
//             const card = event.target.closest('.card-prod');
//             const id = card.dataset.id;
//             const titulo = card.querySelector('.titulo-card').textContent;
//             const precio = parseFloat(card.querySelector('.precio-card').textContent.replace('$', '').replace('.', ''));

//             const productoExistente = carrito.find(item => item.id === id);

//             if (productoExistente) {
//                 productoExistente.cantidad++;
//             } else {
//                 const producto = {
//                     id: id,
//                     titulo: titulo,
//                     precio: precio,
//                     cantidad: 1
//                 };
//                 carrito.push(producto);
//             }
//             actualizarCarrito();
//         });
//     });

//     function actualizarCarrito() {
//         carritoBody.innerHTML = '';
//         let total = 0;
//         carrito.forEach(producto => {
//             total += producto.precio * producto.cantidad;
//             const productoHTML = `
//                 <div class="carrito-producto">
//                     <img src="img/bicis/bici01.png" alt="${producto.titulo}">
//                     <h4>${producto.titulo}</h4>
//                     <p class="precio">$${producto.precio}</p>
//                     <input type="number" class="cantidad" value="${producto.cantidad}" min="1">
//                     <button class="eliminar-producto" data-id="${producto.id}">&times;</button>
//                 </div>
//             `;
//             carritoBody.insertAdjacentHTML('beforeend', productoHTML);
//         });

//         totalCarrito.textContent = `$${total}`;
//         contadorProductos.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
//         agregarEventosCantidad();
//         agregarEventosEliminar();
//     }

//     function agregarEventosCantidad() {
//         document.querySelectorAll('.cantidad').forEach(input => {
//             input.addEventListener('change', event => {
//                 const input = event.target;
//                 const productoId = input.closest('.carrito-producto').querySelector('.eliminar-producto').dataset.id;
//                 const producto = carrito.find(item => item.id === productoId);
//                 producto.cantidad = parseInt(input.value);
//                 actualizarCarrito();
//             });
//         });
//     }

//     function agregarEventosEliminar() {
//         document.querySelectorAll('.eliminar-producto').forEach(button => {
//             button.addEventListener('click', event => {
//                 const productoId = event.target.dataset.id;
//                 carrito = carrito.filter(item => item.id !== productoId);
//                 actualizarCarrito();
//             });
//         });
//     }
// });
// -----------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartAside = document.getElementById('cart-aside');
    const closeCart = document.getElementById('close-cart');
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCart = document.getElementById('clear-cart');

    let cart = [];

    // Abrir y cerrar el carrito
    cartIcon.addEventListener('click', () => {
        cartAside.classList.toggle('open');
    });

    closeCart.addEventListener('click', () => {
        cartAside.classList.remove('open');
    });

    // Añadir al carrito
    document.querySelectorAll('.btn-card').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.card-prod');
            const product = {
                id: card.getAttribute('data-id'),
                nombre: card.querySelector('.titulo-card').textContent,
                precio: parseFloat(card.querySelector('.precio-card').textContent.replace('$', '')),
                cantidad: 1
            };
            addToCart(product);
        });
    });

    // Función para añadir al carrito
    function addToCart(product) {
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            exists.cantidad++;
        } else {
            cart.push(product);
        }
        updateCart();
    }

    // Función para actualizar el carrito
    function updateCart() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.cantidad, 0);
        cartTotal.textContent = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio} x ${item.cantidad}</p>
                    <button class="remove-item" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            cartItems.insertAdjacentHTML('beforeend', itemHTML);
        });

        // Añadir funcionalidad a los botones de eliminar
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }

    // Vaciar el carrito
    clearCart.addEventListener('click', () => {
        cart = [];
        updateCart();
    });
});
