const ffmpeg = require('fluent-ffmpeg');
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const VIDEO_SETTINGS = {
  desktop: {
    width: 1920,
    height: 1080,
    bitrate: '2000k',
    fps: 30,
  },
  mobile: {
    width: 720,
    height: 1280,
    bitrate: '1000k',
    fps: 30,
  },
};

const IMAGE_SETTINGS = {
  desktop: {
    width: 1920,
    height: 1080,
  },
  mobile: {
    width: 720,
    height: 1280,
  },
};

async function optimizeVideo(inputPath, outputPath, settings) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .size(`${settings.width}x${settings.height}`)
      .videoBitrate(settings.bitrate)
      .fps(settings.fps)
      .autopad()
      .on('end', resolve)
      .on('error', reject)
      .save(outputPath);
  });
}

async function optimizeImage(inputPath, outputPath, settings) {
  await sharp(inputPath)
    .resize(settings.width, settings.height, {
      fit: 'cover',
      position: 'center',
    })
    .jpeg({
      quality: 80,
      progressive: true,
    })
    .toFile(outputPath);
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  const videosDir = path.join(publicDir, 'videos');
  const imagesDir = path.join(publicDir, 'images');

  // Asegurar que los directorios existan
  await fs.mkdir(videosDir, { recursive: true });
  await fs.mkdir(imagesDir, { recursive: true });

  // Optimizar video para desktop y mobile
  console.log('Optimizando videos...');
  await optimizeVideo(
    path.join(process.cwd(), 'assets', 'hero-raw.mp4'),
    path.join(videosDir, 'hero-background.mp4'),
    VIDEO_SETTINGS.desktop
  );
  await optimizeVideo(
    path.join(process.cwd(), 'assets', 'hero-raw.mp4'),
    path.join(videosDir, 'hero-background-mobile.mp4'),
    VIDEO_SETTINGS.mobile
  );

  // Generar posters desde el primer frame del video
  console.log('Generando imágenes poster...');
  await optimizeImage(
    path.join(process.cwd(), 'assets', 'hero-poster.jpg'),
    path.join(imagesDir, 'hero-poster.jpg'),
    IMAGE_SETTINGS.desktop
  );
  await optimizeImage(
    path.join(process.cwd(), 'assets', 'hero-poster.jpg'),
    path.join(imagesDir, 'hero-poster-mobile.jpg'),
    IMAGE_SETTINGS.mobile
  );

  console.log('¡Optimización completada!');
}

main().catch(console.error);
