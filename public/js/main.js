import { cargarDatos } from "./data.js";
import { renderizarProductos } from "./render.js";
import { filtrarProductos } from "./filters.js";

document.addEventListener("DOMContentLoaded", async () => {
  const productos = await cargarDatos(); // Carga inicial de productos

  const selectFiltro = document.getElementById("filter-options");
  const botonFiltro = document.getElementById("apply-filters-btn");
  const contenedorProductos = document.getElementById("productos-container");

  // Renderiza todos los productos al inicio
  renderizarProductos(productos, contenedorProductos);

  // Evento para aplicar el filtro
  botonFiltro.addEventListener("click", () => {
    const criterio = selectFiltro.value;
    const productosFiltrados = filtrarProductos(productos, criterio);
    renderizarProductos(productosFiltrados, contenedorProductos);
  });
});