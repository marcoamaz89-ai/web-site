// Usage: node capture.js <reel.html> <seconds> <out.mp4> [fps]
// Renders window.render(t) frame by frame and assembles an Instagram-ready MP4 (1080x1920, H.264, silent AAC track).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

(async () => {
  const [html, secs, out, fpsArg] = process.argv.slice(2);
  const fps = Number(fpsArg || 30);
  const frames = Math.round(Number(secs) * fps);
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'reel-'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(html));
  await page.evaluate(() => document.fonts.ready);
  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.render(t), i / fps);
    await page.screenshot({ path: path.join(tmp, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
  }
  // cover = frame at 1.6s (hook fully visible)
  await page.evaluate(t => window.render(t), Number(process.env.COVER_AT || 1.8));
  await page.screenshot({ path: out.replace(/\.mp4$/, '-cover.jpg'), type: 'jpeg', quality: 92 });
  await browser.close();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(tmp, '%05d.jpg'),
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
    '-shortest', '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '18', '-r', String(fps),
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out]);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log('ok', out, frames, 'frames');
})();
