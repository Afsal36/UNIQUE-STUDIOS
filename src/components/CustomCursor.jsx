import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
      return undefined;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let glowScale = 1;
    let visible = false;
    let hoveredMagnetic = null;
    let rafId;

    const resetMagnetic = (element) => {
      if (!element) return;
      element.style.setProperty('--mx', '0px');
      element.style.setProperty('--my', '0px');
    };

    const update = () => {
      glowX += (mouseX - glowX) * 0.16;
      glowY += (mouseY - glowY) * 0.16;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) scale(${glowScale})`;
        glowRef.current.style.opacity = visible ? '1' : '0';
      }

      rafId = window.requestAnimationFrame(update);
    };

    const handleMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      visible = true;

      const target = event.target.closest('[data-cursor-hover], [data-magnetic]');
      glowScale = target ? 1.45 : 1;

      if (hoveredMagnetic && hoveredMagnetic !== target) {
        resetMagnetic(hoveredMagnetic);
      }

      hoveredMagnetic = target?.matches('[data-magnetic]') ? target : null;

      if (hoveredMagnetic) {
        const rect = hoveredMagnetic.getBoundingClientRect();
        const offsetX = (event.clientX - (rect.left + rect.width / 2)) * 0.14;
        const offsetY = (event.clientY - (rect.top + rect.height / 2)) * 0.14;
        hoveredMagnetic.style.setProperty('--mx', `${offsetX}px`);
        hoveredMagnetic.style.setProperty('--my', `${offsetY}px`);
      }
    };

    const handleLeave = () => {
      visible = false;
      glowScale = 1;
      resetMagnetic(hoveredMagnetic);
      hoveredMagnetic = null;
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleMove, { passive: true });
    window.addEventListener('pointerleave', handleLeave);
    rafId = window.requestAnimationFrame(update);

    return () => {
      resetMagnetic(hoveredMagnetic);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className="custom-cursor-glow" aria-hidden="true" />;
}
