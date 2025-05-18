const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=250&fit=crop',
        filename: 'blog-travel.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop',
        filename: 'blog-food.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
        filename: 'blog-tech.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=250&fit=crop',
        filename: 'blog-lifestyle.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
        filename: 'blog-education.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
        filename: 'profile-pic.jpg'
    },
    {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=300&fit=crop',
        filename: 'cover-photo.jpg'
    }
];

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(__dirname, 'images', filename);
        const file = fs.createWriteStream(filepath);

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
                return;
            }

            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
};

const downloadAllImages = async () => {
    console.log('Starting image downloads...');
    for (const image of images) {
        try {
            await downloadImage(image.url, image.filename);
        } catch (error) {
            console.error(`Error downloading ${image.filename}:`, error);
        }
    }
    console.log('All downloads completed!');
};

downloadAllImages(); 