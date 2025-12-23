const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  // Products
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop',
    filename: 'products/product-1.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop',
    filename: 'products/product-2.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop',
    filename: 'products/product-3.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop',
    filename: 'products/product-4.jpg',
  },
  // Categories
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=600&fit=crop',
    filename: 'categories/category-dining.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&h=600&fit=crop',
    filename: 'categories/category-living.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=600&fit=crop',
    filename: 'categories/category-bedroom.jpg',
  },
  // Inspiration
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    filename: 'inspiration/inspiration-1.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
    filename: 'inspiration/inspiration-2.jpg',
  },
  // Gallery
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=500&fit=crop',
    filename: 'gallery/gallery-1.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop',
    filename: 'gallery/gallery-2.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=600&fit=crop',
    filename: 'gallery/gallery-3.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=500&fit=crop',
    filename: 'gallery/gallery-4.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop',
    filename: 'gallery/gallery-5.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=600&fit=crop',
    filename: 'gallery/gallery-6.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop',
    filename: 'gallery/gallery-7.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=400&fit=crop',
    filename: 'gallery/gallery-8.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=500&fit=crop',
    filename: 'gallery/gallery-9.jpg',
  },
  // Hero
  {
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop',
    filename: 'hero/hero-bg.jpg',
  },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${filepath}`);
            resolve();
          });
        } else {
          file.close();
          fs.unlinkSync(filepath);
          reject(new Error(`Failed to download: ${url}`));
        }
      })
      .on('error', (err) => {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(err);
      });
  });
}

async function downloadAll() {
  const publicDir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Starting image downloads...\n');

  for (const image of images) {
    const filepath = path.join(publicDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error.message);
    }
  }

  console.log('\nAll downloads completed!');
}

downloadAll();
