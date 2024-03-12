const express = require('express');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'ejs');  


const upload = multer();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('vista');
});


app.post('/convert', upload.single('photo'), async (req, res) => {
    try {
        
        const outputBuffer = await sharp(req.file.buffer).toFormat('avif', {}).toBuffer();

        
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
