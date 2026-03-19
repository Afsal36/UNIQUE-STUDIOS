import { lazy, memo, Suspense, useCallback, useEffect, useMemo, useRef } from 'react';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo3.png';
// import { scrollSectionIntoView } from '../utils/scroll';

const FloatingShapes = lazy(() => import('../three/FloatingShapes'));
const ParticlesScene = lazy(() => import('../three/ParticlesScene'));

const counters = [
  { value: 250, suffix: '+', label: 'Projects' },
  { value: 120, suffix: '+', label: 'Clients' },
  { value: 8, suffix: '+', label: 'Years Experience' },
];

const canvasConfig = {
  dpr: [1, 1.5],
  frameloop: 'demand',
  gl: { antialias: false, alpha: true, powerPreference: 'high-performance' },
  performance: { min: 0.5 },
  camera: { position: [0, 0, 5], fov: 60 },
};

const SceneRig = memo(function SceneRig() {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) return;

    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.18;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.035;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.035;

    state.invalidate();
  });

  return (
    <group ref={group}>
      <Suspense fallback={null}>
        <ParticlesScene />
        <FloatingShapes />
      </Suspense>
    </group>
  );
});

function CounterCard({ item, index, setRef }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45 + index * 0.08 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="premium-frame luxury-card-hover px-6 py-7 text-left"
    >
      <div className="font-display text-4xl leading-none text-white sm:text-[2.75rem]">
        <span ref={setRef}>0</span>
        {item.suffix}
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#A855F7]/64">{item.label}</p>
    </motion.div>
  );
}

export default function Hero3D() {
  const counterRefs = useRef([]);
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.2 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.2 });
  const badgeX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const badgeY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const heroGlowStyle = useMemo(() => ({ x: badgeX, y: badgeY }), [badgeX, badgeY]);

  useEffect(() => {
    counterRefs.current.forEach((node, index) => {
      if (!node) return;
      const target = counters[index].value;
      gsap.fromTo(
        node,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.8,
          snap: { innerText: 1 },
          ease: 'power3.out',
          delay: 0.4 + index * 0.12,
        },
      );
    });
  }, []);

  const updatePointer = useCallback((clientX, clientY, currentTarget) => {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - rect.left) / rect.width - 0.5);
    mouseY.set((clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseMove = useCallback((event) => {
    updatePointer(event.clientX, event.clientY, event.currentTarget);
  }, [updatePointer]);

  const handleTouchMove = useCallback((event) => {
    const touch = event.touches[0];
    if (!touch) return;
    updatePointer(touch.clientX, touch.clientY, event.currentTarget);
  }, [updatePointer]);

const handlePortfolioClick = useCallback(() => {
  navigate('/portfolio');
}, [navigate]);

const handleProjectClick = useCallback(() => {
  navigate('/contact');
}, [navigate]);

  return (
    <section id="home" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} className="relative flex min-h-screen items-center overflow-hidden pt-28 scroll-mt-28">
      <div className="absolute inset-0 z-0 grid-overlay opacity-15" />
      <motion.div style={heroGlowStyle} className="pointer-events-none absolute inset-[12%_8%_20%_8%] z-0 rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.14),_rgba(124,58,237,0.04)_38%,_transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_22%_28%,_rgba(168,85,247,0.08),_transparent_22%),radial-gradient(circle_at_76%_20%,_rgba(124,58,237,0.08),_transparent_24%)]" />
      <div className="absolute inset-0 z-[1] opacity-80">
        <Canvas {...canvasConfig}>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <color attach="background" args={['#0B0B0F']} />
          <fog attach="fog" args={['#0B0B0F', 5.4, 12]} />
          <ambientLight intensity={1.05} color="#C084FC" />
          <directionalLight position={[3.5, 4.5, 3]} intensity={2.2} color="#7C3AED" />
          <SceneRig />
        </Canvas>
      </div>
      <div className="section-shell relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-left">
          <motion.div
            style={heroGlowStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-panel mb-8 inline-flex items-center gap-4 rounded-full border-[#7C3AED]/16 bg-black/28 px-4 py-3"
          >
            <img src={logo} alt="Unique Studios" className="h-9 w-auto object-contain" />
            <span className="text-xs uppercase tracking-[0.45em] text-[#A855F7]/72">Premium Creative Agency</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl font-display text-5xl font-semibold leading-[0.92] text-white sm:text-6xl lg:text-[5.5rem]"
          >
            Creative Digital Agency for <span className="gold-gradient-text">Modern Brands</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg"
          >
            Unique Studios crafts editorial-grade identities, cinematic launches, and refined digital experiences for brands that want to feel unmistakably premium.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <button
              type="button"
              onClick={handlePortfolioClick}
              data-cursor-hover
              data-magnetic="true"
              className="magnetic-target luxury-button"
            >
              View Portfolio
            </button>
            <button
              type="button"
              onClick={handleProjectClick}
              data-cursor-hover
              data-magnetic="true"
              className="magnetic-target luxury-button-secondary"
            >
              Start a Project
            </button>
          </motion.div>
        </div>
        <div className="grid gap-4 self-end sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {counters.map((item, index) => (
            <CounterCard
              key={item.label}
              item={item}
              index={index}
              setRef={(element) => { counterRefs.current[index] = element; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}





