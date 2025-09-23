const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Routes for views
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/inventario', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'gestion-inventario.html'));
});

app.get('/agregar-productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'agregar-productos.html'));
});

app.get('/ver-productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ver-productos.html'));
});

app.get('/ventas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ventas.html'));
});

app.get('/clientes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cliente.html'));
});

app.get('/reportes', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reportes.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});