const fs = require('fs');
const TurndownService = require('turndown');

const turndownService = new TurndownService();

const html = fs.readFileSync('index.html', 'utf-8');

turndownService.remove('title');

const markdown = turndownService.turndown(html).split('\n').slice(2).join('\n');

fs.writeFileSync('andrei_yurkouski.md', markdown);
