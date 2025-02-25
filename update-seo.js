const fs = require('fs');
const path = require('path');

const currentDate = new Date().toISOString();

const indexPath = path.join(__dirname, 'index.html');
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

function updateFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    const updatedContent = data.replace(/__LAST_MODIFIED__/g, currentDate);

    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        return;
      }
      console.log(`Updated ${filePath} with current date: ${currentDate}`);
    });
  });
}


updateFile(indexPath);
updateFile(sitemapPath);