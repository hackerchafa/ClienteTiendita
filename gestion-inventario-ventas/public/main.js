
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
            li.style.marginBottom = '10px';
            li.style.padding = '10px';
            li.style.backgroundColor = '#f9f9f9';
            li.style.borderRadius = '5px';
            li.innerHTML = `
                <strong>${v.nombre} - ${v.marca} - ${v.presentacion}</strong><br>
                Cantidad: ${v.cantidad} unidades<br>
                Ganancia de esta venta: <span style="color: green; font-weight: bold;">$${v.total.toFixed(2)}</span>
            `;
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
            total: producto.precio * cantidad,
            categoria: producto.categoria,
            fecha: new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
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

// --- Reportes ---
function migrarVentasSinFecha() {
    let ventas = getVentas();
    let hayCambios = false;
    const fechaHoy = new Date().toISOString().split('T')[0];
    
    ventas.forEach(venta => {
        if (!venta.fecha) {
            venta.fecha = fechaHoy;
            hayCambios = true;
        }
        if (!venta.categoria) {
            // Intentar obtener categoría del producto
            const productos = getProductos();
            const producto = productos.find(p => p.nombre === venta.nombre && p.marca === venta.marca);
            if (producto) {
                venta.categoria = producto.categoria;
            } else {
                venta.categoria = 'Sin Categoría';
            }
            hayCambios = true;
        }
    });
    
    if (hayCambios) {
        setVentas(ventas);
    }
}

function buscarVentasPorFecha() {
    // Migrar ventas sin fecha antes de buscar
    migrarVentasSinFecha();
    
    const fecha = document.getElementById('fechaBusqueda').value;
    if (!fecha) {
        alert('Por favor selecciona una fecha');
        return;
    }
    
    const ventas = getVentas();
    const ventasFecha = ventas.filter(v => v.fecha === fecha);
    
    document.getElementById('tituloReporte').textContent = `Reporte de Ventas - ${fecha}`;
    mostrarReporteDetallado(ventasFecha);
}

function mostrarVentasDeHoy() {
    // Migrar ventas sin fecha antes de mostrar
    migrarVentasSinFecha();
    
    const fechaHoy = new Date().toISOString().split('T')[0];
    const ventas = getVentas();
    const ventasHoy = ventas.filter(v => v.fecha === fechaHoy);
    
    document.getElementById('tituloReporte').textContent = `Reporte de Ventas de Hoy - ${fechaHoy}`;
    mostrarReporteDetallado(ventasHoy);
}

function mostrarTodasLasVentas() {
    // Migrar ventas sin fecha antes de mostrar
    migrarVentasSinFecha();
    
    const ventas = getVentas();
    document.getElementById('tituloReporte').textContent = 'Reporte de Todas las Ventas';
    mostrarReporteDetallado(ventas);
}

function mostrarReporteDetallado(ventas) {
    const resultados = document.getElementById('resultadosReporte');
    resultados.style.display = 'block';
    
    // Si no hay ventas, mostrar mensaje
    if (ventas.length === 0) {
        document.getElementById('resumenCategorias').innerHTML = '<p style="color: #666; font-style: italic;">No hay ventas para mostrar en la fecha seleccionada.</p>';
        document.getElementById('detallePorMarca').innerHTML = '<p style="color: #666; font-style: italic;">No hay datos de ventas para mostrar.</p>';
        document.getElementById('totalGananciasReporte').textContent = 'Total de Ganancias: $0.00';
        return;
    }
    
    // Agrupar por categorías
    const porCategoria = {};
    let totalGeneral = 0;
    
    ventas.forEach(venta => {
        // Asignar categoría predeterminada si no existe
        const categoria = venta.categoria || 'Sin Categoría';
        
        if (!porCategoria[categoria]) {
            porCategoria[categoria] = {
                total: 0,
                cantidad: 0,
                marcas: {}
            };
        }
        
        porCategoria[categoria].total += venta.total;
        porCategoria[categoria].cantidad += venta.cantidad;
        totalGeneral += venta.total;
        
        // Agrupar por marca dentro de categoría
        const marca = venta.marca || 'Sin Marca';
        if (!porCategoria[categoria].marcas[marca]) {
            porCategoria[categoria].marcas[marca] = {
                total: 0,
                cantidad: 0,
                productos: []
            };
        }
        
        porCategoria[categoria].marcas[marca].total += venta.total;
        porCategoria[categoria].marcas[marca].cantidad += venta.cantidad;
        porCategoria[categoria].marcas[marca].productos.push(venta);
    });
    
    // Mostrar resumen por categorías
    let htmlCategorias = '';
    Object.keys(porCategoria).forEach(categoria => {
        const datos = porCategoria[categoria];
        htmlCategorias += `
            <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px; background: #f9f9f9;">
                <h4 style="color: #35424a; margin-top: 0;">${categoria}</h4>
                <p><strong>Productos vendidos:</strong> ${datos.cantidad} unidades</p>
                <p><strong>Ganancia total:</strong> <span style="color: green; font-weight: bold;">$${datos.total.toFixed(2)}</span></p>
            </div>
        `;
    });
    document.getElementById('resumenCategorias').innerHTML = htmlCategorias;
    
    // Mostrar detalle por marcas
    let htmlDetalle = '';
    Object.keys(porCategoria).forEach(categoria => {
        htmlDetalle += `<h4 style="color: #35424a; border-bottom: 2px solid #35424a; padding-bottom: 5px;">${categoria}</h4>`;
        
        Object.keys(porCategoria[categoria].marcas).forEach(marca => {
            const datosMarca = porCategoria[categoria].marcas[marca];
            htmlDetalle += `
                <div style="margin-left: 20px; border-left: 3px solid #007acc; padding-left: 15px; margin-bottom: 15px;">
                    <h5 style="color: #007acc; margin-bottom: 5px;">Marca: ${marca}</h5>
                    <p><strong>Cantidad vendida:</strong> ${datosMarca.cantidad} unidades</p>
                    <p><strong>Ganancia:</strong> <span style="color: green; font-weight: bold;">$${datosMarca.total.toFixed(2)}</span></p>
                    <div style="margin-left: 15px; font-size: 14px; color: #666;">
                        ${datosMarca.productos.map(p => `• ${p.nombre} - ${p.presentacion} (${p.cantidad} unidades)`).join('<br>')}
                    </div>
                </div>
            `;
        });
    });
    document.getElementById('detallePorMarca').innerHTML = htmlDetalle;
    
    // Mostrar total general
    document.getElementById('totalGananciasReporte').textContent = `Total de Ganancias: $${totalGeneral.toFixed(2)}`;
}