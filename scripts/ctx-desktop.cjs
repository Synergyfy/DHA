const fs = require('fs');
const f = 'src/features/landing/landingDesktopHtml.ts';
const src = fs.readFileSync(f, 'utf8');
const html = src.slice(src.indexOf('`') + 1, src.lastIndexOf('`'));
// split into lines for context
const lines = html.split('\n');
const targets = ['>Manage<', 'Book Slot', 'View Profile', 'View Centre', 'Find Dental Care Near You', 'Clinic Access', 'Organisation Access', 'Professional Access', 'Explore DHA', 'Create Your Patient Account'];
lines.forEach((ln, i) => {
  for (const t of targets) {
    if (ln.includes(t)) {
      console.log('--- line ' + (i + 1) + ' contains: ' + t + ' ---');
      console.log(ln.trim().slice(0, 400));
      break;
    }
  }
});
