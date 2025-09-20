class Clientes {
    constructor() {
        this.clientes = [];
    }

    addCliente(nombre, contacto) {
        const nuevoCliente = { nombre, contacto };
        this.clientes.push(nuevoCliente);
    }

    getClientes() {
        return this.clientes;
    }
}

export default Clientes;