import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticlesScene() {
  const points = useRef(null);

  const particleState = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const count = isMobile ? 420 : 840;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#dff6ff'),
      size: isMobile ? 0.04 : 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
    });

    return { geometry, material };
  }, []);

  useEffect(() => () => {
    particleState.geometry.dispose();
    particleState.material.dispose();
  }, [particleState]);

  useFrame((state) => {
    if (!points.current) return;
    const elapsed = state.clock.elapsedTime;
    points.current.rotation.y = elapsed * 0.04;
    points.current.rotation.x = Math.sin(elapsed * 0.15) * 0.06;
    points.current.position.y = Math.sin(elapsed * 0.22) * 0.14;
  });

  return <points ref={points} geometry={particleState.geometry} material={particleState.material} frustumCulled />;
}
