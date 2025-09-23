
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
        
        // Mostrar mensaje de éxito
        const mensaje = document.getElementById('mensaje-exito');
        mensaje.style.display = 'block';
        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 3000);
        
        this.reset();
    });
}

// --- Ver Productos ---
if (document.getElementById('productList') && window.location.pathname === '/ver-productos') {
    let categoriaFiltro = '';
    let textoFiltro = '';
    
    function cargarCategoriasInventario() {
        const select = document.getElementById('filtroCategoria');
        const productos = getProductos();
        const categorias = [...new Set(productos.map(p => p.categoria))].sort();
        
        // Limpiar opciones existentes excepto la primera
        select.innerHTML = '<option value="">Todas las categorías</option>';
        
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            select.appendChild(option);
        });
    }
    
    function renderProductosInventario() {
        const tbody = document.getElementById('productList');
        tbody.innerHTML = '';
        let productos = getProductos();
        
        // Aplicar filtros
        let productosFiltrados = productos;
        
        if (categoriaFiltro) {
            productosFiltrados = productosFiltrados.filter(p => p.categoria === categoriaFiltro);
        }
        
        if (textoFiltro) {
            productosFiltrados = productosFiltrados.filter(p => 
                p.nombre.toLowerCase().includes(textoFiltro.toLowerCase()) ||
                p.marca.toLowerCase().includes(textoFiltro.toLowerCase())
            );
        }
        
        // Ordenar por categoría y luego por nombre del producto
        productosFiltrados.sort((a, b) => {
            // Primero ordenar por categoría
            if (a.categoria !== b.categoria) {
                return a.categoria.localeCompare(b.categoria);
            }
            // Si es la misma categoría, ordenar por nombre del producto
            return a.nombre.localeCompare(b.nombre);
        });
        
        // Agrupar por categorías para agregar separadores visuales
        let categoriaActual = '';
        
        productosFiltrados.forEach((prod, index) => {
            const originalIndex = productos.indexOf(prod);
            
            // Agregar separador de categoría si es diferente a la anterior
            if (prod.categoria !== categoriaActual) {
                categoriaActual = prod.categoria;
                const separatorRow = document.createElement('tr');
                separatorRow.className = 'categoria-separator';
                separatorRow.innerHTML = `
                    <td colspan="8" class="categoria-header">
                        <strong>📂 ${prod.categoria.toUpperCase()}</strong>
                    </td>
                `;
                tbody.appendChild(separatorRow);
            }
            
            const tr = document.createElement('tr');
            const stockClass = prod.cantidad <= 5 ? 'style="color: red; font-weight: bold;"' : '';
            tr.innerHTML = `
                <td>${prod.nombre}</td>
                <td>${prod.marca}</td>
                <td>${prod.presentacion}</td>
                <td>${prod.categoria}</td>
                <td ${stockClass}>${prod.cantidad}</td>
                <td>$${prod.precio.toFixed(2)}</td>
                <td>$${(prod.cantidad * prod.precio).toFixed(2)}</td>
                <td>
                    <button class="btn-action btn-warning" onclick="abrirModalEditar(${originalIndex})" style="margin-right: 5px;">
                        ✏️ Editar
                    </button>
                    <button class="btn-action" onclick="abrirModalReabastecer(${originalIndex})">
                        📦 Reabastecer
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
        actualizarEstadisticas(productos);
    }
    
    function actualizarEstadisticas(productos) {
        const totalProductos = productos.length;
        const categorias = [...new Set(productos.map(p => p.categoria))].length;
        const stockBajo = productos.filter(p => p.cantidad <= 5).length;
        
        document.getElementById('totalProductos').textContent = totalProductos;
        document.getElementById('totalCategorias').textContent = categorias;
        document.getElementById('stockBajo').textContent = stockBajo;
    }
    
    // Filtros
    document.getElementById('filtroCategoria').addEventListener('change', function(e) {
        categoriaFiltro = e.target.value;
        renderProductosInventario();
    });
    
    document.getElementById('buscarProducto').addEventListener('input', function(e) {
        textoFiltro = e.target.value.trim();
        renderProductosInventario();
    });
    
    cargarCategoriasInventario();
    renderProductosInventario();
}

// Variables globales para el modal de reabastecimiento
let productoIndexReabastecer = -1;
let productoIndexEditar = -1;

// Funciones para el modal de reabastecimiento
function abrirModalReabastecer(productoIndex) {
    const productos = getProductos();
    const producto = productos[productoIndex];
    
    productoIndexReabastecer = productoIndex;
    
    document.getElementById('productoReabastecer').textContent = 
        `${producto.nombre} - ${producto.marca} - ${producto.presentacion}`;
    document.getElementById('stockActual').textContent = producto.cantidad;
    
    // Establecer fecha actual por defecto
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaLlegada').value = hoy;
    
    // Limpiar campos
    document.getElementById('cantidadReabastecimiento').value = '';
    document.getElementById('notasReabastecimiento').value = '';
    
    document.getElementById('modalReabastecer').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalReabastecer').style.display = 'none';
    productoIndexReabastecer = -1;
}

function confirmarReabastecimiento() {
    const cantidad = parseInt(document.getElementById('cantidadReabastecimiento').value);
    const fecha = document.getElementById('fechaLlegada').value;
    const notas = document.getElementById('notasReabastecimiento').value.trim();
    
    if (!cantidad || cantidad < 1 || !fecha) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    let productos = getProductos();
    let producto = productos[productoIndexReabastecer];
    
    // Actualizar stock
    const stockAnterior = producto.cantidad;
    producto.cantidad += cantidad;
    
    // Registrar el reabastecimiento
    let reabastecimientos = getReabastecimientos();
    reabastecimientos.push({
        productoNombre: producto.nombre,
        marca: producto.marca,
        presentacion: producto.presentacion,
        categoria: producto.categoria,
        cantidadAgregada: cantidad,
        stockAnterior: stockAnterior,
        stockNuevo: producto.cantidad,
        fecha: fecha,
        fechaRegistro: new Date().toISOString(),
        notas: notas
    });
    
    // Guardar cambios
    setProductos(productos);
    setReabastecimientos(reabastecimientos);
    
    // Actualizar vista
    renderProductosInventario();
    cerrarModal();
    
    alert(`Reabastecimiento registrado:\n${producto.nombre}\nCantidad agregada: ${cantidad}\nNuevo stock: ${producto.cantidad}`);
}

// Cerrar modal si se hace click fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('modalReabastecer');
    const modalEditar = document.getElementById('modalEditar');
    if (event.target === modal) {
        cerrarModal();
    }
    if (event.target === modalEditar) {
        cerrarModalEditar();
    }
}

// Funciones para el modal de editar producto
function abrirModalEditar(productoIndex) {
    const productos = getProductos();
    const producto = productos[productoIndex];
    
    productoIndexEditar = productoIndex;
    
    // Pre-llenar el formulario con los datos actuales
    document.getElementById('editNombre').value = producto.nombre;
    document.getElementById('editMarca').value = producto.marca;
    document.getElementById('editPresentacion').value = producto.presentacion;
    document.getElementById('editCategoria').value = producto.categoria;
    document.getElementById('editPrecio').value = producto.precio;
    document.getElementById('editStock').value = `${producto.cantidad} unidades`;
    
    document.getElementById('modalEditar').style.display = 'flex';
}

function cerrarModalEditar() {
    document.getElementById('modalEditar').style.display = 'none';
    productoIndexEditar = -1;
}

function guardarEdicion() {
    const nombre = document.getElementById('editNombre').value.trim();
    const marca = document.getElementById('editMarca').value.trim();
    const presentacion = document.getElementById('editPresentacion').value.trim();
    const categoria = document.getElementById('editCategoria').value.trim();
    const precio = parseFloat(document.getElementById('editPrecio').value);
    
    if (!nombre || !marca || !presentacion || !categoria || isNaN(precio) || precio < 0.01) {
        alert('Por favor completa todos los campos correctamente');
        return;
    }
    
    let productos = getProductos();
    let producto = productos[productoIndexEditar];
    
    // Guardar datos anteriores para el mensaje
    const datosAnteriores = {
        nombre: producto.nombre,
        precio: producto.precio
    };
    
    // Actualizar el producto
    producto.nombre = nombre;
    producto.marca = marca;
    producto.presentacion = presentacion;
    producto.categoria = categoria;
    producto.precio = precio;
    
    // Guardar cambios
    setProductos(productos);
    
    // Actualizar vista
    cargarCategoriasInventario();
    renderProductosInventario();
    cerrarModalEditar();
    
    alert(`Producto actualizado exitosamente:\n${datosAnteriores.nombre} → ${nombre}\nPrecio: $${datosAnteriores.precio.toFixed(2)} → $${precio.toFixed(2)}`);
}

// --- Ventas ---
if (document.getElementById('ventaForm')) {
    let todosLosProductos = [];
    let categoriaActiva = '';
    
    function cargarCategorias() {
        const select = document.getElementById('filtroCategoria');
        const productos = getProductos();
        const categorias = [...new Set(productos.map(p => p.categoria))].sort();
        
        // Limpiar opciones existentes excepto la primera
        select.innerHTML = '<option value="">Todas las categorías</option>';
        
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            select.appendChild(option);
        });
    }
    
    function renderProductosVenta() {
        const select = document.getElementById('producto');
        select.innerHTML = '<option value="">Selecciona un producto</option>';
        
        let productos = getProductos();
        todosLosProductos = productos;
        
        // Filtrar por categoría
        let productosFiltrados = productos;
        if (categoriaActiva) {
            productosFiltrados = productos.filter(prod => prod.categoria === categoriaActiva);
        }
        
        // Agregar contador de productos
        const counter = document.getElementById('productosCounter') || createProductCounter();
        counter.textContent = `${productosFiltrados.length} producto(s) disponible(s)`;
        
        productosFiltrados.forEach(prod => {
            const idx = todosLosProductos.indexOf(prod);
            const option = document.createElement('option');
            option.value = idx;
            option.textContent = `${prod.nombre} - ${prod.presentacion} - $${prod.precio.toFixed(2)}`;
            select.appendChild(option);
        });
    }
    
    function createProductCounter() {
        const counter = document.createElement('div');
        counter.id = 'productosCounter';
        counter.className = 'productos-counter';
        const select = document.getElementById('producto');
        select.parentNode.insertBefore(counter, select);
        return counter;
    }
    
    // Funcionalidad del dropdown de categorías
    document.getElementById('filtroCategoria').addEventListener('change', function(e) {
        categoriaActiva = e.target.value;
        renderProductosVenta();
    });
    
    // Mostrar información del producto seleccionado
    document.getElementById('producto').addEventListener('change', function(e) {
        const idx = parseInt(e.target.value);
        const infoDiv = document.getElementById('productoInfo');
        
        if (isNaN(idx)) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const producto = todosLosProductos[idx];
        document.getElementById('nombreProducto').textContent = `${producto.nombre} - ${producto.marca} - ${producto.presentacion}`;
        document.getElementById('stockDisponible').textContent = producto.cantidad;
        document.getElementById('precioUnitario').textContent = producto.precio.toFixed(2);
        infoDiv.style.display = 'block';
    });
    
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
        
        if (isNaN(productoIdx)) {
            alert('Por favor selecciona un producto');
            return;
        }
        
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
            fecha: new Date().toISOString().split('T')[0]
        });
        
        producto.cantidad -= cantidad;
        setProductos(productos);
        setVentas(ventas);
        
        this.reset();
        document.getElementById('productoInfo').style.display = 'none';
        categoriaActiva = '';
        document.getElementById('filtroCategoria').value = '';
        cargarCategorias();
        renderProductosVenta();
        renderVentas();
        
        alert(`Venta registrada: ${producto.nombre} x${cantidad} = $${(producto.precio * cantidad).toFixed(2)}`);
    });
    
    cargarCategorias();
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