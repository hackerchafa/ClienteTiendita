
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
function setVentas(ventas) {
    localStorage.setItem('ventas', JSON.stringify(ventas));
}

// Productos de ejemplo para mostrar al cliente
function cargarProductosEjemplo() {
    const ejemplo = [
        { nombre: 'Coca-Cola', marca: 'Coca-Cola', presentacion: 'Botella 600ml', categoria: 'Bebidas', cantidad: 12, precio: 18.00 },
        { nombre: 'Pepsi', marca: 'Pepsi', presentacion: 'Lata 355ml', categoria: 'Bebidas', cantidad: 8, precio: 15.00 },
        { nombre: 'Galletas Emperador', marca: 'Gamesa', presentacion: 'Paquete 100g', categoria: 'Galletas', cantidad: 20, precio: 12.00 },
        { nombre: 'Sabritas Clásicas', marca: 'Sabritas', presentacion: 'Bolsa 45g', categoria: 'Botanas', cantidad: 15, precio: 13.00 },
        { nombre: 'Jugo Jumex', marca: 'Jumex', presentacion: 'Lata 335ml', categoria: 'Bebidas', cantidad: 10, precio: 14.00 },
        { nombre: 'Lapicero BIC', marca: 'BIC', presentacion: 'Unidad', categoria: 'Escolares', cantidad: 30, precio: 6.00 }
    ];
    setProductos(ejemplo);
}

// --- Inventario ---
if (document.getElementById('addProductForm')) {
    // Si no hay productos, cargar productos de ejemplo
    if (getProductos().length === 0) {
        cargarProductosEjemplo();
    }
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = document.getElementById('productName').value.trim();
        const marca = document.getElementById('productBrand').value.trim();
        const presentacion = document.getElementById('productPresentation').value.trim();
        const categoria = document.getElementById('productCategory').value.trim();
        const cantidad = parseInt(document.getElementById('productQuantity').value);
        const precio = parseFloat(document.getElementById('productPrice').value);
        if (!nombre || !marca || !presentacion || !categoria || isNaN(cantidad) || cantidad < 1 || isNaN(precio) || precio < 0.01) return;
        let productos = getProductos();
        // Unicidad por nombre, marca, presentacion y precio
        let existente = productos.find(p => p.nombre === nombre && p.marca === marca && p.presentacion === presentacion && p.precio === precio);
        if (existente) {
            existente.cantidad += cantidad;
        } else {
            productos.push({ nombre, marca, presentacion, categoria, cantidad, precio });
        }
        setProductos(productos);
        this.reset();
        renderProductos();
    });
    function renderProductos() {
        const lista = document.getElementById('productList');
        lista.innerHTML = '';
        let productos = getProductos();
        productos.forEach(prod => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${prod.nombre}</td><td>${prod.marca}</td><td>${prod.presentacion}</td><td>${prod.categoria}</td><td>${prod.cantidad}</td><td>$${prod.precio.toFixed(2)}</td>`;
            lista.appendChild(tr);
        });
    }
    renderProductos();
}

// --- Ventas ---
if (document.getElementById('ventaForm')) {
    function renderProductosVenta() {
        const select = document.getElementById('producto');
        select.innerHTML = '';
        let productos = getProductos();
        productos.forEach((prod, idx) => {
            const option = document.createElement('option');
            option.value = idx;
            option.textContent = `${prod.nombre} - ${prod.marca} - ${prod.presentacion} ($${prod.precio.toFixed(2)}) - Stock: ${prod.cantidad}`;
            select.appendChild(option);
        });
    }
    function renderVentas() {
        const lista = document.getElementById('listaVentas');
        lista.innerHTML = '';
        let ventas = getVentas();
        ventas.forEach(v => {
            const li = document.createElement('li');
            li.textContent = `${v.nombre} - ${v.marca} - ${v.presentacion} x${v.cantidad} - $${v.total.toFixed(2)}`;
            lista.appendChild(li);
        });
        let total = ventas.reduce((acc, v) => acc + v.total, 0);
        document.getElementById('totalGanancias').textContent = total.toFixed(2);
    }
    document.getElementById('ventaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const productoIdx = parseInt(document.getElementById('producto').value);
        const cantidad = parseInt(document.getElementById('cantidad').value);
        let productos = getProductos();
        let producto = productos[productoIdx];
        if (!producto || producto.cantidad < cantidad || cantidad < 1) {
            alert('Stock insuficiente o datos inválidos');
            return;
        }
        let ventas = getVentas();
        ventas.push({
            nombre: producto.nombre,
            marca: producto.marca,
            presentacion: producto.presentacion,
            cantidad,
            total: producto.precio * cantidad
        });
        producto.cantidad -= cantidad;
        setProductos(productos);
        setVentas(ventas);
        this.reset();
        renderProductosVenta();
        renderVentas();
    });
    renderProductosVenta();
    renderVentas();
}