const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// directory containing webp images
const inputDir = './webp-images';
const outputDir = './png-images';

// ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// convert images
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, path.basename(file, '.webp') + '.png');

        // check if the file is a webp image
        if (path.extname(file).toLowerCase() === '.webp') {
            sharp(inputFilePath)
                .toFormat('png')
                .toFile(outputFilePath)
                .then(() => console.log(`Converted: ${file} -> ${outputFilePath}`))
                .catch(err => console.error(`Error converting ${file}:`, err));
        }
    });
});
