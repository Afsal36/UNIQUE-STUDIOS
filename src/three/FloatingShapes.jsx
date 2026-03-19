import { memo, useEffect, useMemo } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const shapeConfigs = [
  { key: 'sphere', position: [-3.1, 1.5, -1.6], scale: 1.05, color: '#7dd3fc', emissive: '#38bdf8', speed: 1.5, geometry: 'sphere' },
  { key: 'octa', position: [3.0, -0.6, -0.8], scale: 1.2, color: '#8b5cf6', emissive: '#8b5cf6', speed: 1.35, geometry: 'octahedron' },
  { key: 'icosa', position: [0.1, -2.0, -1.4], scale: 1.45, color: '#dbeafe', emissive: '#7dd3fc', speed: 1.7, geometry: 'icosahedron' },
  { key: 'tetra', position: [1.7, 2.1, -2.2], scale: 0.95, color: '#c4b5fd', emissive: '#a78bfa', speed: 1.25, geometry: 'tetrahedron' },
];

const Shape = memo(function Shape({ config, geometry, material }) {
  return (
    <Float position={config.position} speed={config.speed} rotationIntensity={0.95} floatIntensity={1.4}>
      <mesh scale={config.scale} geometry={geometry} material={material} frustumCulled />
    </Float>
  );
});

export default function FloatingShapes() {
  const geometries = useMemo(() => ({
    sphere: new THREE.SphereGeometry(1, 16, 16),
    octahedron: new THREE.OctahedronGeometry(1.15, 0),
    icosahedron: new THREE.IcosahedronGeometry(1.1, 0),
    tetrahedron: new THREE.TetrahedronGeometry(1.1, 0),
  }), []);

  const materials = useMemo(
    () => shapeConfigs.reduce((accumulator, config) => {
      accumulator[config.key] = new THREE.MeshPhysicalMaterial({
        color: config.color,
        roughness: 0.22,
        metalness: 0.42,
        transmission: 0.12,
        thickness: 0.8,
        emissive: config.emissive,
        emissiveIntensity: 0.82,
        clearcoat: 0.8,
        clearcoatRoughness: 0.18,
      });
      return accumulator;
    }, {}),
    [],
  );

  useEffect(() => () => {
    Object.values(geometries).forEach((geometry) => geometry.dispose());
    Object.values(materials).forEach((material) => material.dispose());
  }, [geometries, materials]);

  return (
    <group>
      {shapeConfigs.map((config) => (
        <Shape
          key={config.key}
          config={config}
          geometry={geometries[config.geometry]}
          material={materials[config.key]}
        />
      ))}
    </group>
  );
}
