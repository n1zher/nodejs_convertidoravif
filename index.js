const express = require('express');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar la carpeta de vistas
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'ejs');  

// Middleware para manejar datos de formularios
const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta para manejar la solicitud GET a la raíz del servidor
app.get('/', (req, res) => {
    res.render('vista');
});

// Ruta para manejar la solicitud POST de conversión de imagen
app.post('/convert', upload.single('photo'), async (req, res) => {
    try {
        // Convertir la imagen utilizando sharp
        const outputBuffer = await sharp(req.file.buffer).toFormat('avif', {}).toBuffer();

        // Enviar la imagen convertida al cliente para descarga
        res.setHeader('Content-Type', 'image/avif');
        res.setHeader('Content-Disposition', 'attachment; filename="imagen_convertida.avif"');
        res.send(outputBuffer);
    } catch (err) {
        console.error('Error al convertir la imagen:', err);
        res.status(500).send('Error al convertir la imagen');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
