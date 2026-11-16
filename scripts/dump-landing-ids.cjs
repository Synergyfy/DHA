const fs = require('fs');
for (const f of ['src/features/landing/landingDesktopHtml.ts', 'src/features/landing/landingMobileHtml.ts']) {
  const src = fs.readFileSync(f, 'utf8');
  const html = src.slice(src.indexOf('`') + 1, src.lastIndexOf('`'));
  console.log('== ids in ' + f + ' ==');
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  console.log(ids.join(', '));
}
