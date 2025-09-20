function validarEntrada(valor) {
    return valor && valor.trim() !== '';
}

function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(fecha);
}

function calcularTotal(precio, cantidad) {
    return precio * cantidad;
}

export { validarEntrada, formatearFecha, calcularTotal };