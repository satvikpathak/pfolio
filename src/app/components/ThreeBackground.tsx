'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import dynamic from 'next/dynamic';

// Extend shader material
const ComplexSkyMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uDarkMode: true,
    uResolution: new THREE.Vector2(),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader with added complexity: fbm noise for clouds, twinkling stars, atmosphere, etc.
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform bool uDarkMode;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simple hash function
    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    // 3D simplex noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) { 
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // Fractal Brownian Motion for clouds
    float fbm(vec3 p) {
      float f = 0.0;
      float amp = 0.5;
      for (int i = 0; i < 4; i++) {
        f += amp * snoise(p);
        p *= 2.0;
        amp *= 0.5;
      }
      return f;
    }

    // Star field with twinkling
    float stars(vec2 uv) {
      vec2 gv = fract(uv * 200.0) - 0.5;
      vec2 id = floor(uv * 200.0);
      float h = hash21(id);
      if (h < 0.03) {
        float twinkle = sin(uTime * 3.0 + h * 10.0) * 0.5 + 0.5;
        return smoothstep(0.01, 0.0, length(gv)) * twinkle;
      }
      return 0.0;
    }

    // Clouds
    vec3 clouds(vec2 uv) {
      vec3 p = vec3(uv * 2.0, uTime * 0.1);
      float cloudDensity = fbm(p) * 0.5 + 0.5;
      cloudDensity = smoothstep(0.2, 0.8, cloudDensity);
      return vec3(cloudDensity);
    }

    // Atmosphere scattering approximation
    vec3 atmosphere(vec2 uv, vec2 sunPos) {
      float sunDist = length(uv - sunPos);
      float scatter = exp(-sunDist * 5.0) * 0.5;
      return vec3(1.0, 0.8, 0.6) * scatter;
    }

    void main() {
      vec2 uv = (vUv - 0.5) * (uResolution.x / uResolution.y, 1.0) + 0.5;
      vec3 color = vec3(0.0);
      vec2 mouseUV = (uMouse + 1.0) * 0.5;

      if (uDarkMode) {
        // Night sky: deep space with stars, galaxy hint, moon
        color = vec3(0.01, 0.02, 0.05);
        color += vec3(stars(uv)) * 1.2;
        color += vec3(stars(uv * 1.5 + 0.5)) * 0.8; // Layered stars
        // Galaxy band
        float galaxy = exp(-abs(uv.y - 0.2 * sin(uv.x * 2.0)) * 10.0);
        color += vec3(0.2, 0.1, 0.3) * galaxy * (0.5 + 0.5 * sin(uTime));
        // Moon
        float moonDist = length(uv - mouseUV);
        color += vec3(0.9, 0.95, 1.0) * exp(-moonDist * 20.0) * 1.5;
        // Clouds at night
        vec3 nightClouds = clouds(uv) * vec3(0.1, 0.1, 0.2);
        color += nightClouds;
      } else {
        // Day sky: gradient with sun, clouds, atmosphere
        color = mix(vec3(0.2, 0.5, 1.0), vec3(0.8, 0.9, 1.0), uv.y * 1.2);
        // Sun
        float sunDist = length(uv - mouseUV);
        color += vec3(1.0, 0.9, 0.7) * exp(-sunDist * 30.0) * 2.0;
        // Atmosphere
        color += atmosphere(uv, mouseUV);
        // Clouds
        vec3 dayClouds = clouds(uv) * vec3(1.0);
        color = mix(color, dayClouds, dayClouds.r * 0.8);
      }

      // Mouse interaction effect
      float mouseDist = length(uv - mouseUV);
      float ripple = sin(mouseDist * 20.0 - uTime * 5.0) * exp(-mouseDist * 5.0);
      color += vec3(0.2, 0.3, 0.5) * ripple * 0.2;

      // Vignette
      float vig = smoothstep(1.5, 0.5, length(uv - 0.5));
      color *= vig;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Extend
extend({ ComplexSkyMaterial });

// Particles Component
function InteractiveParticles({ isDark }) {
  const particlesRef = useRef();
  const { count } = useMemo(() => ({ count: 2000 }), []);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);
  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      col[i * 3] = Math.random();
      col[i * 3 + 1] = Math.random();
      col[i * 3 + 2] = Math.random();
    }
    return col;
  }, [count]);

  useFrame(({ mouse, clock }) => {
    if (!particlesRef.current) return;
    const time = clock.getElapsedTime();
    const posArray = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;
      posArray[ix] += Math.sin(time + posArray[iz]) * 0.001;
      posArray[iy] += Math.cos(time + posArray[ix]) * 0.001;
      // Mouse repulsion
      const dx = posArray[ix] - mouse.x * 20;
      const dy = posArray[iy] - mouse.y * 20;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) {
        posArray[ix] += dx / dist * 0.05;
        posArray[iy] += dy / dist * 0.05;
      }
      // Wrap around
      if (posArray[ix] > 20) posArray[ix] = -20;
      if (posArray[ix] < -20) posArray[ix] = 20;
      if (posArray[iy] > 20) posArray[iy] = -20;
      if (posArray[iy] < -20) posArray[iy] = 20;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} itemSize={3} array={positions} />
        <bufferAttribute attach="attributes-color" count={count} itemSize={3} array={colors} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={isDark ? 0.8 : 0.5}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Atmospheric Glow Layer
function AtmosphericGlow({ isDark }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.01;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial
        color={isDark ? '#020510' : '#87CEEB'}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Sky Mesh
function SkyMesh({ mouse, isDark }) {
  const materialRef = useRef();
  const { viewport } = useThree();
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
      materialRef.current.uMouse.set(mouse.x, mouse.y);
      materialRef.current.uDarkMode = isDark;
      materialRef.current.uResolution.set(viewport.width, viewport.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[40, 40]} />
      <complexSkyMaterial ref={materialRef} />
    </mesh>
  );
}

// Main Component
function ComplexSkyBackground() {
  const { theme, resolvedTheme } = useTheme();
  const mouse = useRef({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (!gl) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setIsDark((resolvedTheme || theme || 'dark') === 'dark');
  }, [theme, resolvedTheme]);

  if (!webGLSupported) {
    return (
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-blue-500 to-blue-900" />
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: true }}>
        <SkyMesh mouse={mouse.current} isDark={isDark} />
        <InteractiveParticles isDark={isDark} />
        <AtmosphericGlow isDark={isDark} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
      </Canvas>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ComplexSkyBackground), { ssr: false });