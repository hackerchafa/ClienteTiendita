# Gestión de Inventario y Ventas - Tiendita# Gestión de Inventario y Ventas



Este proyecto es una aplicación web para la gestión de inventario y el registro de ventas de una tienda tradicional mexicana. Permite a los usuarios agregar productos, registrar ventas en tiempo real y generar reportes detallados de las ventas.Este proyecto es una aplicación web para la gestión de inventario y el registro de ventas. Permite a los usuarios agregar productos, registrar ventas en tiempo real y gestionar la información de los clientes.



## 🆕 Nuevas Funcionalidades Implementadas## Estructura del Proyecto



### 📊 **Sistema de Reportes Avanzado**```

- **Reportes por fecha específica**: Buscar ventas de cualquier díagestion-inventario-ventas

- **Reportes de ventas de hoy**: Ver ventas del día actual con un clic├── src

- **Historial completo**: Visualizar todas las ventas registradas│   ├── index.js              # Punto de entrada de la aplicación

- **Agrupación por categorías**: Ventas organizadas por tipo de producto (Bebidas, Botanas, Galletas, etc.)│   ├── productos

- **Desglose por marcas**: Dentro de cada categoría, ver ventas específicas por marca│   │   └── productos.js      # Clase para gestionar productos

- **Ganancias detalladas**: Total de ganancias por categoría, marca y general│   ├── ventas

│   │   └── ventas.js         # Clase para gestionar ventas

### 💰 **Mejoras en Registro de Ventas**│   ├── clientes

- **Ganancia por venta individual**: Cada venta muestra claramente cuánto se ganó│   │   └── clientes.js       # Clase para gestionar clientes

- **Mejor visualización**: Formato mejorado con colores y separación clara│   ├── utils

- **Reducción automática de stock**: El inventario se actualiza automáticamente│   │   └── helpers.js        # Funciones utilitarias

- **Registro con fecha**: Todas las ventas se guardan con fecha automáticamente│   └── views

│       ├── inventario.html   # Vista para gestión de inventario

### 🔧 **Correcciones Técnicas**│       ├── ventas.html       # Vista para registro de ventas

- **Rutas corregidas**: El proyecto funciona correctamente con `npm start`│       └── cliente.html      # Vista para gestión de clientes

- **Compatibilidad con Express**: Todas las páginas cargan correctamente├── public

- **Sistema de fechas**: Migración automática de datos antiguos sin fecha│   ├── styles.css            # Estilos CSS de la aplicación

- **Navegación mejorada**: Enlaces funcionando correctamente entre páginas│   └── main.js               # Script principal para la interacción del usuario

├── package.json              # Configuración de npm

## 📁 Estructura del Proyecto└── README.md                 # Documentación del proyecto

```

```

gestion-inventario-ventas## Funcionalidades

├── src

│   ├── index.js              # Servidor Express con todas las rutas- **Gestión de Productos**: Agregar, listar y actualizar el stock de productos.

│   ├── index.html            # Página principal con menú de navegación- **Registro de Ventas**: Registrar ventas y calcular ganancias en tiempo real.

│   ├── productos- **Gestión de Clientes**: Añadir y listar información de clientes.

│   │   └── productos.js      # Clase para gestionar productos

│   ├── ventas## Instalación

│   │   └── ventas.js         # Clase para gestionar ventas

│   ├── clientes1. Clona el repositorio en tu máquina local.

│   │   └── clientes.js       # Clase para gestionar clientes2. Navega al directorio del proyecto.

│   ├── utils3. Ejecuta `npm install` para instalar las dependencias.

│   │   └── helpers.js        # Funciones utilitarias

│   └── views## Ejecución

│       ├── inventario.html   # Vista para gestión de inventario

│       ├── ventas.html       # Vista para registro de ventasPara iniciar la aplicación, ejecuta `npm start` y abre tu navegador en `http://localhost:3000`.

│       ├── cliente.html      # Vista para gestión de clientes

│       └── reportes.html     # 🆕 Nueva vista de reportes avanzados## Contribuciones

├── public

│   ├── styles.css            # Estilos CSS de la aplicaciónLas contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor abre un issue o envía un pull request.
│   └── main.js               # JavaScript con todas las funcionalidades
├── package.json              # Configuración de npm con Express incluido
├── .gitignore               # 🆕 Archivo para excluir node_modules
└── README.md                 # 🆕 Documentación actualizada
```

## ✨ Funcionalidades Principales

### **Gestión de Inventario**
- Agregar productos con nombre, marca, presentación, categoría, cantidad y precio
- Visualización en tabla organizada
- Productos de ejemplo precargados para demostración
- Validación de datos y control de duplicados

### **Registro de Ventas**
- Selección de productos desde el inventario
- Control automático de stock disponible
- Cálculo de ganancias por venta individual
- Actualización en tiempo real del inventario

### **Reportes Avanzados** 🆕
- **Por fecha**: Buscar ventas de cualquier día específico
- **Categorías**: Ver ventas agrupadas por tipo de producto
- **Marcas**: Desglose detallado por marca dentro de cada categoría
- **Ganancias**: Totales por categoría, marca y general
- **Historial**: Visualización completa de todas las ventas

### **Gestión de Clientes**
- Añadir y listar información de clientes
- Formulario simple para datos de contacto

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/hackerchafa/ClienteTiendita.git
   cd ClienteTiendita/gestion-inventario-ventas
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 🎯 Navegación

- **Página Principal**: `/` - Menú de navegación
- **Gestión de Inventario**: `/inventario` - Agregar y visualizar productos
- **Registro de Ventas**: `/ventas` - Registrar ventas y ver ganancias
- **Reportes de Ventas**: `/reportes` - 🆕 Análisis avanzado de ventas
- **Gestión de Clientes**: `/clientes` - Administrar información de clientes

## 💾 Persistencia de Datos

La aplicación utiliza `localStorage` del navegador para almacenar:
- Inventario de productos
- Historial de ventas con fechas
- Información de clientes
- Productos de ejemplo para demostración

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Backend**: Node.js con Express.js
- **Almacenamiento**: localStorage (navegador)
- **Estilos**: CSS personalizado responsivo

## 📈 Mejoras Implementadas

### Antes vs Después

**Antes**:
- Solo gestión básica de inventario y ventas
- Sin reportes ni análisis
- Problemas de navegación y rutas
- Sin fechas en las ventas

**Después** 🆕:
- ✅ Sistema completo de reportes por fecha
- ✅ Análisis por categorías y marcas
- ✅ Navegación fluida entre páginas
- ✅ Registro automático de fechas
- ✅ Visualización mejorada de ganancias
- ✅ Interfaz más intuitiva y profesional

## 🎮 Cómo Usar el Sistema

1. **Agregar Productos**: Ir a "Gestión de Inventario" y llenar el formulario
2. **Registrar Ventas**: Ir a "Registro de Ventas", seleccionar producto y cantidad
3. **Ver Reportes**: Ir a "Reportes de Ventas", seleccionar fecha o ver todas las ventas
4. **Analizar Datos**: Ver desglose por categorías, marcas y ganancias totales

## 👥 Contribuciones

Este proyecto ha sido mejorado para incluir un sistema completo de reportes y análisis de ventas, perfecto para pequeñas tiendas que necesitan llevar un control detallado de su inventario y ganancias.

---

**Versión**: 2.0.0 - Con sistema de reportes avanzado  
**Última actualización**: Septiembre 2025