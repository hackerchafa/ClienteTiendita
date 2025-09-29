
// Utilidades para almacenamiento local
function getProductos() {
    return JSON.parse(localStorage.getItem('productos') || '[]');
}
function setProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}
function getVentas() {
    return JSON.parse(localStorage.getItem('ventas') || '[]');
}
function getReabastecimientos() {
    return JSON.parse(localStorage.getItem('reabastecimientos') || '[]');
}
function setReabastecimientos(reabastecimientos) {
    localStorage.setItem('reabastecimientos', JSON.stringify(reabastecimientos));
}
// ...existing code...
