// optimize-images.mjs
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

async function optimizeImages(directory) {
  try {
    // Get all jpeg files
    const files = await fs.readdir(directory);
    const jpegFiles = files.filter(file => 
      file.endsWith('.jpeg') || file.endsWith('.jpg')
    );

    // Optimization options
    const webpOptions = {
      quality: 75,
      method: 4, // 0-6, higher means slower but better compression
      target_size: 0,
      target_PSNR: 0,
      segments: 4,
      sns_strength: 50,
      filter_strength: 60,
      filter_sharpness: 0,
      filter_type: 1,
      partitions: 0,
      preprocessing: 0,
      effort: 4,
    };

    // Process each file
    for (const file of jpegFiles) {
      const inputPath = path.join(directory, file);
      console.log(`Optimizing ${file}...`);
      
      try {
        await execAsync(
          `npx @squoosh/cli --webp '${JSON.stringify(webpOptions)}' "${inputPath}"`
        );
        console.log(`Successfully optimized ${file}`);
      } catch (err) {
        console.error(`Error optimizing ${file}:`, err);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Usage
optimizeImages('./');
