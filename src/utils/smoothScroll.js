// src/utils/smoothScroll.js
export function smoothScrollTo(targetY, duration = 600) {
  const startY = window.scrollY || window.pageYOffset || 0;
  const distance = targetY - startY;
  const startTime = performance.now();

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  return new Promise((resolve) => {
    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      window.scrollTo(0, Math.round(startY + distance * eased));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}
