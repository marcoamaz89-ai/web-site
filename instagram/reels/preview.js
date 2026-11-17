// Usage: node preview.js <reel.html> <out.jpg> t1 t2 ...  -> contact sheet of frames at those times
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
(async () => {
  const [html, out, ...times] = process.argv.slice(2);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'prev-'));
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(html));
  await p.evaluate(() => document.fonts.ready);
  for (let i = 0; i < times.length; i++) {
    await p.evaluate(t => window.render(t), Number(times[i]));
    await p.screenshot({ path: path.join(tmp, `${i}.jpg`), type: 'jpeg', quality: 80 });
  }
  await b.close();
  const cols = Math.min(times.length, 4);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(tmp, '%d.jpg'),
    '-vf', `scale=360:640,tile=${cols}x${Math.ceil(times.length / cols)}:padding=8:color=white`, '-frames:v', '1', out]);
  console.log('ok', out);
})();
