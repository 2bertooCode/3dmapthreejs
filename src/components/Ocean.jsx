import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float waveA = sin((pos.x * 0.2) + (uTime * 0.2)) * 0.10;
    float waveB = cos((pos.y * 0.16) + (uTime * 0.14)) * 0.08;
    pos.z += waveA + waveB;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  void main() {
    vec3 blue = vec3(0.01, 0.20, 0.42);
    vec3 cyan = vec3(0.00, 0.88, 1.00);
    float gradient = smoothstep(0.0, 1.0, vUv.y);
    vec3 color = mix(blue, cyan, gradient * 0.8);
    gl_FragColor = vec4(color, 0.95);
  }
`;

export function Ocean() {
  const materialRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.8]}>
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
