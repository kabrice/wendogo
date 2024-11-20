// optimize-images.mjs
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function optimizeImages(directory) {
  try {
    // Get all image files
    const files = await fs.readdir(directory);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    // Create output directory if it doesn't exist
    const outputDir = path.join(directory, 'optimized');
    try {
      await fs.mkdir(outputDir);
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }

    console.log(`Found ${imageFiles.length} images to process\n`);

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(directory, file);
      const outputPath = path.join(
        outputDir,
        `${path.parse(file).name}.webp`
      );

      console.log(`Optimizing ${file}...`);

      try {
        // Get original image metadata
        const metadata = await sharp(inputPath).metadata();
        
        // Calculate new dimensions maintaining aspect ratio
        const maxWidth = 1920;
        const maxHeight = 1080;
        let width = metadata.width;
        let height = metadata.height;
        
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width));
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height));
          height = maxHeight;
        }

        // Generate WebP
        await sharp(inputPath)
          .resize({
            width,
            height,
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({
            quality: 80,
            effort: 6,
            preset: 'photo',
            smartSubsample: true,
            reductionEffort: 6
          })
          .toFile(outputPath);

        // Generate AVIF
        const avifPath = path.join(
          outputDir,
          `${path.parse(file).name}.avif`
        );
        
        await sharp(inputPath)
          .resize({
            width,
            height,
            fit: 'inside',
            withoutEnlargement: true
          })
          .avif({
            quality: 65,
            effort: 9,
            chromaSubsampling: '4:2:0'
          })
          .toFile(avifPath);

        // Log compression stats
        const originalSize = (await fs.stat(inputPath)).size;
        const webpSize = (await fs.stat(outputPath)).size;
        const avifSize = (await fs.stat(avifPath)).size;
        
        console.log(`✓ ${file} processed successfully`);
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB`);
        console.log(`  WebP: ${(webpSize / 1024).toFixed(1)}KB (${((originalSize - webpSize) / originalSize * 100).toFixed(1)}% smaller)`);
        console.log(`  AVIF: ${(avifSize / 1024).toFixed(1)}KB (${((originalSize - avifSize) / originalSize * 100).toFixed(1)}% smaller)\n`);

      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }

    console.log('Optimization complete! Files saved in the "optimized" directory.');

  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the optimization
const directory = process.argv[2] || '.';
console.log(`Starting image optimization in directory: ${directory}\n`);
optimizeImages(directory);
