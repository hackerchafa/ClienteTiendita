# Gestión de Inventario y Ventas

Este proyecto es una aplicación web para la gestión de inventario y el registro de ventas. Permite a los usuarios agregar productos, registrar ventas en tiempo real y gestionar la información de los clientes.

## Estructura del Proyecto

```
gestion-inventario-ventas
├── src
│   ├── index.js              # Punto de entrada de la aplicación
│   ├── productos
│   │   └── productos.js      # Clase para gestionar productos
│   ├── ventas
│   │   └── ventas.js         # Clase para gestionar ventas
│   ├── clientes
│   │   └── clientes.js       # Clase para gestionar clientes
│   ├── utils
│   │   └── helpers.js        # Funciones utilitarias
│   └── views
│       ├── inventario.html   # Vista para gestión de inventario
│       ├── ventas.html       # Vista para registro de ventas
│       └── cliente.html      # Vista para gestión de clientes
├── public
│   ├── styles.css            # Estilos CSS de la aplicación
│   └── main.js               # Script principal para la interacción del usuario
├── package.json              # Configuración de npm
└── README.md                 # Documentación del proyecto
```

## Funcionalidades

- **Gestión de Productos**: Agregar, listar y actualizar el stock de productos.
- **Registro de Ventas**: Registrar ventas y calcular ganancias en tiempo real.
- **Gestión de Clientes**: Añadir y listar información de clientes.

## Instalación

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.

## Ejecución

Para iniciar la aplicación, ejecuta `npm start` y abre tu navegador en `http://localhost:3000`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor abre un issue o envía un pull request.