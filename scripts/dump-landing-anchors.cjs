const fs = require('fs');
for (const f of ['src/features/landing/landingDesktopHtml.ts', 'src/features/landing/landingMobileHtml.ts']) {
  const src = fs.readFileSync(f, 'utf8');
  const html = src.slice(src.indexOf('`') + 1, src.lastIndexOf('`'));
  console.log('\n===== ' + f + ' =====');
  const re = /<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
  let m, i = 0;
  while ((m = re.exec(html))) {
    const tag = m[1], attrs = m[2];
    const href = (attrs.match(/href="([^"]*)"/) || [,''])[1];
    const dp = (attrs.match(/data-path="([^"]*)"/) || [,''])[1];
    const label = (m[3].replace(/<[^>]+>/g, ' ').replace(/&amp;/g,'&').replace(/\s+/g, ' ').trim());
    console.log(`[${i++}] <${tag}> href="${href}" data-path="${dp}" :: ${label}`);
  }
}
