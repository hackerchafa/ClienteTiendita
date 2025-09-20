class Ventas {
    constructor() {
        this.ventas = [];
        this.totalGanancias = 0;
    }

    registerSale(producto, cantidad) {
        const venta = {
            producto: producto,
            cantidad: cantidad,
            fecha: new Date()
        };
        this.ventas.push(venta);
        this.totalGanancias += producto.precio * cantidad; // Asumiendo que el producto tiene una propiedad 'precio'
    }

    getTotalGanancias() {
        return this.totalGanancias;
    }

    getVentas() {
        return this.ventas;
    }
}

export default Ventas;