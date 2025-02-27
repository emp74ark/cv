const fs = require('fs');
const puppeteer = require('puppeteer');

const html = fs.readFileSync('index.html', 'utf-8');

const styles = fs.readFileSync('styles/pdf.css', 'utf-8');

const imagePath = './assets/photo.jpg';

const imageBase64 = fs.readFileSync(imagePath, 'base64');
const imageDataUri = `data:image/jpeg;base64,${imageBase64}`;

const htmlWithImage = html.replace(
    '<img alt="Photo" src="./assets/photo.jpg">',
    `<img alt="Photo" src="${imageDataUri}">`,
);

async function generatePdf(content, outputPath) {
  const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
  );
  const page = await browser.newPage();
  await page.setContent(content);
  await page.addStyleTag({content: styles});
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: {top: '1.5cm', bottom: '1.5cm', left: '0.5cm', right: '0.5cm'},
  });
  await browser.close();
}

generatePdf(htmlWithImage, 'andrei_yurkouski.pdf').then(() => {
  console.log('PDF generation finished');
}).catch(e => console.error(e));
