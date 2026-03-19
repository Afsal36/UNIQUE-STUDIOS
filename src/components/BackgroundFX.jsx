import { useEffect, useRef } from 'react';

const RIPPLE_LIFETIME = 1300;
const MAX_RIPPLES = 10;

export default function BackgroundFX() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return undefined;

    const ripples = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addRipple = (x, y) => {
      ripples.push({ x, y, start: performance.now(), radius: 16 });
      if (ripples.length > MAX_RIPPLES) {
        ripples.shift();
      }
    };

    const render = (time) => {
      context.clearRect(0, 0, width, height);

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        const progress = (time - ripple.start) / RIPPLE_LIFETIME;

        if (progress >= 1) {
          ripples.splice(index, 1);
          continue;
        }

        const eased = 1 - (1 - progress) * (1 - progress);
        const radius = ripple.radius + eased * 140;
        const alpha = (1 - progress) * 0.16;

        const gradient = context.createRadialGradient(ripple.x, ripple.y, 0, ripple.x, ripple.y, radius);
        gradient.addColorStop(0, `rgba(168,85,247,${alpha})`);
        gradient.addColorStop(0.24, `rgba(124,58,237,${alpha * 0.95})`);
        gradient.addColorStop(0.58, `rgba(255,255,255,${alpha * 0.14})`);
        gradient.addColorStop(1, 'rgba(10,10,10,0)');

        context.beginPath();
        context.fillStyle = gradient;
        context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    let lastTouch = 0;
    const handlePointerMove = (event) => {
      if (event.pointerType === 'mouse') {
        addRipple(event.clientX, event.clientY);
      }
    };

    const handlePointerDown = (event) => {
      addRipple(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      const now = performance.now();
      if (now - lastTouch < 90) return;
      const touch = event.touches[0];
      if (!touch) return;
      lastTouch = now;
      addRipple(touch.clientX, touch.clientY);
    };

    resize();
    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-[15] opacity-70" aria-hidden="true" />;
}



