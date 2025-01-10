const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const videoPath = path.join(process.cwd(), 'public', 'videos', '8426049-uhd_3840_2160_25fps.mp4');
const outputPath = path.join(process.cwd(), 'public', 'videos', 'hero-poster.jpg');

// Extraer un frame del video a los 2 segundos
ffmpeg(videoPath)
  .screenshots({
    timestamps: [2],
    filename: 'hero-poster.jpg',
    folder: path.join(process.cwd(), 'public', 'videos'),
    size: '1920x1080'
  })
  .on('end', () => {
    console.log('Poster extraído exitosamente');
  })
  .on('error', (err) => {
    console.error('Error al extraer el poster:', err);
  });
