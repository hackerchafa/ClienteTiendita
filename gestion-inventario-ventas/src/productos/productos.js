class Productos {
    constructor() {
        this.productos = [];
    }

    addProduct(nombre, categoria, cantidad) {
        const nuevoProducto = {
            nombre,
            categoria,
            cantidad
        };
        this.productos.push(nuevoProducto);
    }

    getProducts() {
        return this.productos;
    }

    updateStock(nombre, cantidad) {
        const producto = this.productos.find(prod => prod.nombre === nombre);
        if (producto) {
            producto.cantidad += cantidad;
        }
    }
}

export default Productos;