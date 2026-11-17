// Deterministic animation helpers: every reel defines window.render(t) (t in seconds).
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const easeOut = x => 1 - Math.pow(1 - x, 3);
const easeInOut = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const prog = (t, start, dur, ease = easeOut) => ease(clamp((t - start) / dur));
const lerp = (a, b, p) => a + (b - a) * p;
const $ = s => document.querySelector(s);

// Fade/slide an element in at `inAt` and out at `outAt` (optional).
function show(el, t, inAt, outAt = null, { dy = 50, dur = 0.4, dx = 0, scale = false } = {}) {
  if (typeof el === 'string') el = $(el);
  const pi = prog(t, inAt, dur);
  const po = outAt == null ? 0 : prog(t, outAt, 0.3);
  el.style.opacity = pi * (1 - po);
  const s = scale ? lerp(0.85, 1, pi) : 1;
  el.style.transform = `translate(${(1 - pi) * dx}px, ${(1 - pi) * dy - po * 30}px) scale(${s})`;
}

// Word-by-word reveal: wraps each word of el in a span once, then reveals over time.
function words(el, t, start, perWord = 0.09) {
  if (typeof el === 'string') el = $(el);
  if (!el.dataset.split) {
    el.innerHTML = el.innerHTML.split(/(\s+|<br>)/).map(w =>
      w.trim() && w !== '<br>' ? `<span class="w" style="display:inline-block">${w}</span>` : w).join('');
    el.dataset.split = 1;
  }
  el.querySelectorAll('.w').forEach((w, i) => {
    const p = prog(t, start + i * perWord, 0.25);
    w.style.opacity = p;
    w.style.transform = `translateY(${(1 - p) * 30}px)`;
  });
}

// Tap indicator at (x, y) relative to the page, pulsing at time `at`.
function tap(el, t, at, x, y) {
  if (typeof el === 'string') el = $(el);
  const p = clamp((t - at) / 0.5);
  const visible = t >= at - 0.25 && t <= at + 0.6;
  el.style.left = (x - 55) + 'px';
  el.style.top = (y - 55) + 'px';
  el.style.opacity = visible ? (p < 1 ? 1 - p * 0.6 : 0) : 0;
  el.style.transform = `scale(${t < at ? 1.15 : lerp(0.8, 1.4, p)})`;
}
