'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Extend JSX namespace to include waveMaterial
declare module '@react-three/fiber' {
  interface ThreeElements {
    waveMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial>;
      uColor?: string | THREE.Color;
      uTime?: number;
      uMouse?: THREE.Vector2;
      uDarkMode?: boolean;
      transparent?: boolean;
      [key: string]: any;
    };
  }
}

// Custom Shader Material for Wave Effect
const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColor: new THREE.Color('#ffffff'),
    uDarkMode: true,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Wave effect based on UV coordinates, time, and mouse
      float wave = sin(pos.x * 5.0 + uTime) * cos(pos.y * 5.0 + uTime) * 0.1;
      wave += sin(distance(vec2(pos.x, pos.y), uMouse) * 10.0 - uTime) * 0.05;
      pos.z += wave;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uColor;
    uniform bool uDarkMode;
    varying vec2 vUv;

    void main() {
      // Adjust color opacity for subtle effect
      vec3 color = uDarkMode ? uColor : vec3(0.2, 0.2, 0.2);
      gl_FragColor = vec4(color, 0.3);
    }
  `,
  (material) => {
    material.side = THREE.DoubleSide;
  }
);

export default function ThreeBackground() {
  const { theme, resolvedTheme } = useTheme();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Update mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update shader uniforms
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
      materialRef.current.uniforms.uDarkMode.value = (resolvedTheme || theme) === 'dark';
    }
  });

  // Fallback for theme not yet resolved
  const effectiveTheme = resolvedTheme || theme || 'dark';

  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={[effectiveTheme === 'dark' ? '#0D0D0D' : '#FFFFFF']} />
        <mesh>
          <planeGeometry args={[10, 10, 32, 32]} />
          <waveMaterial
            ref={materialRef}
            uColor={effectiveTheme === 'dark' ? '#ffffff' : '#333333'}
            transparent
          />
        </mesh>
      </Canvas>
    </div>
  );
}