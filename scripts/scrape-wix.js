/**
 * scrape-wix.js
 * Extrae texto e imágenes del sitio Wix actual de Fundación Rubato
 * y los guarda localmente.
 *
 * Uso: node scripts/scrape-wix.js
 */

const axios = require('axios');
const cheerio = require('cheerio');
const { writeFile, mkdir } = require('node:fs/promises');
const { existsSync } = require('node:fs');
const path = require('node:path');

const BASE_URL = 'https://www.fundacionrubato.com';
const OUT_DIR = 'docs/content';
const IMG_DIR = 'docs/images';

const PAGES = [
  { path: '/', name: 'inicio' },
  { path: '/acerca-de-nosotros', name: 'acerca-de-nosotros' },
  { path: '/festival-rubato', name: 'festival-rubato' },
  { path: '/mision-vision', name: 'mision-vision' },
  { path: '/invitados', name: 'invitados' },
  { path: '/cronograma', name: 'cronograma' },
  { path: '/inscripciones', name: 'inscripciones' },
  { path: '/conservatorio', name: 'conservatorio' },
  { path: '/cursos-libres', name: 'cursos-libres' },
  { path: '/filarmonica-juvenil', name: 'filarmonica-juvenil' },
  { path: '/audiciones', name: 'audiciones' },
  { path: '/requisitos', name: 'requisitos' },
  { path: '/copia-de-requisitos', name: 'preparacion-audicion' },
  { path: '/repertorio', name: 'repertorio' },
  { path: '/riomar-quartet', name: 'riomar-quartet' },
  { path: '/orquesta-de-camara', name: 'orquesta-de-camara' },
  { path: '/apoyanos', name: 'apoyanos' },
  { path: '/eventos', name: 'eventos' },
  { path: '/contactanos', name: 'contacto' },
  { path: '/team', name: 'portal-estudiantes' },
  { path: '/book-online', name: 'reserva-online' },
];

async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

function cleanText(text) {
  return text.replace(/\s+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
}

function extractContent($) {
  // Remover navegación, header, footer, scripts
  $('header, footer, nav, script, style, iframe, noscript, link, svg').remove();

  const blocks = [];

  // Headings
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const level = el.tagName.toLowerCase();
    const text = cleanText($(el).text());
    if (text && text.length > 2) blocks.push({ type: 'h', level, text });
  });

  // Párrafos y list items
  $('p, li').each((_, el) => {
    const text = cleanText($(el).text());
    if (text && text.length > 8) blocks.push({ type: 'p', text });
  });

  // Imágenes
  const images = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    const alt = $(el).attr('alt') || '';
    if (src && !src.includes('icon') && !src.includes('svg') && !src.includes('social')) {
      images.push({ src, alt });
    }
  });

  return { blocks, images };
}

function toMarkdown(blocks) {
  const lines = [];
  for (const b of blocks) {
    if (b.type === 'h') {
      lines.push(`\n${'#'.repeat(parseInt(b.level))} ${b.text}\n`);
    } else {
      lines.push(b.text);
    }
  }
  return lines.join('\n\n');
}

async function downloadImage(url, pageName, index) {
  try {
    const cleanUrl = url.startsWith('//') ? `https:${url}` : url;
    const urlObj = new URL(cleanUrl);
    if (urlObj.hostname.includes('wixstatic.com')) {
      // ponytail: Wix urls embed resize/quality params in the pathname
      // via /v1/fill/w_396,h_281,... — strip from /v1/ to get full-res original.
      const v1idx = urlObj.pathname.indexOf('/v1/');
      if (v1idx !== -1) urlObj.pathname = urlObj.pathname.substring(0, v1idx);
      urlObj.search = '';
    }

    const finalUrl = urlObj.toString();
    const ext = path.extname(urlObj.pathname).split('?')[0] || '.jpg';
    const filename = `${pageName}-img-${index}${ext}`;
    const filepath = path.join(IMG_DIR, filename);

    if (existsSync(filepath)) return filename;

    const resp = await axios.get(finalUrl, { responseType: 'arraybuffer', timeout: 10000 });
    await writeFile(filepath, Buffer.from(resp.data));
    return filename;
  } catch {
    return null;
  }
}

async function scrapePage(page) {
  const url = `${BASE_URL}${page.path}`;
  process.stdout.write(`  ${url} ... `);

  try {
    const resp = await axios.get(url, { timeout: 15000 });
    const $ = cheerio.load(resp.data);
    const { blocks, images } = extractContent($);

    if (blocks.length === 0) {
      console.log('sin contenido');
      return null;
    }

    const md = toMarkdown(blocks);
    await writeFile(path.join(OUT_DIR, `${page.name}.md`), md);

    let downloaded = 0;
    // descargar hasta 20 imágenes por página
    for (let i = 0; i < Math.min(images.length, 20); i++) {
      const f = await downloadImage(images[i].src, page.name, i);
      if (f) downloaded++;
    }

    console.log(`${blocks.length} bloques, ${downloaded} imágenes`);
    return { page: page.name, blocks: blocks.length, images: downloaded };
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Scrapeando sitio Fundación Rubato ===\n');
  await ensureDir(OUT_DIR);
  await ensureDir(IMG_DIR);

  const results = [];
  for (const page of PAGES) {
    const r = await scrapePage(page);
    if (r) results.push(r);
  }

  console.log('\n=== Resumen ===');
  let tb = 0, ti = 0;
  for (const r of results) {
    console.log(`  ${r.page}: ${r.blocks} bloques, ${r.images} imágenes`);
    tb += r.blocks; ti += r.images;
  }
  console.log(`\n${results.length}/${PAGES.length} páginas · ${tb} bloques · ${ti} imágenes`);
  console.log(`  Texto → docs/content/`);
  console.log(`  Imágenes → docs/images/`);

  // Cleanup: borrar .mjs que no sirvió
  const oldMjs = path.join(__dirname, 'scrape-wix.mjs');
  if (existsSync(oldMjs)) {
    const { unlink } = require('node:fs');
    unlink(oldMjs, () => {});
  }
}

main().catch(console.error);
