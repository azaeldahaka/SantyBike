export function filtrarProductos(productos, criterio) {
    switch (criterio) {
      case "highRated":
        return productos.filter((producto) => producto.raiting >= 4.5);
      case "lowPrice":
        return productos.filter((producto) => producto.precio < 50000);
      case "highPrice":
        return productos.filter((producto) => producto.precio >= 50000);
      case "cadenas":
        return productos.filter((producto) => producto.categoria === "cadenas");
      case "cajas":
        return productos.filter((producto) => producto.categoria === "cajas");
      case "cascos":
        return productos.filter((producto) => producto.categoria === "cascos");
      default:
        return productos; // Todos
    }
  }
  