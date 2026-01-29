const fs = require('fs');
const path = require('path');

const galleryPath = path.join(process.cwd(), 'public', 'images', 'galleria');
const outputPath = path.join(process.cwd(), 'public', 'gallery.json');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

try {
  if (!fs.existsSync(galleryPath)) {
    fs.mkdirSync(galleryPath, { recursive: true });
    console.log('Created gallery folder:', galleryPath);
  }

  const files = fs.readdirSync(galleryPath);

  const photos = files
    .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => {
      const numA = parseInt(a);
      const numB = parseInt(b);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    })
    .map(file => `/images/galleria/${file}`);

  fs.writeFileSync(outputPath, JSON.stringify({ photos }, null, 2));
  console.log(`Gallery generated: ${photos.length} photos found`);
} catch (error) {
  console.error('Error generating gallery:', error);
  fs.writeFileSync(outputPath, JSON.stringify({ photos: [] }));
}
