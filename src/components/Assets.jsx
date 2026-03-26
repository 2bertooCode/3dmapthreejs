import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export const ASSET_DATA = [
  { id: 'wahoo', name: 'WAHOO', position: [-1.7, 1.3, 0.2], size: [0.5, 0.5, 0.2], offset: 0.0 },
  { id: 'frade', name: 'FRADE', position: [0.4, 1.4, 0.22], size: [0.6, 0.45, 0.24], offset: 1.2 },
  { id: 'albacora', name: 'ALBACORA', position: [1.7, 0.2, 0.2], size: [0.58, 0.45, 0.23], offset: 2.0 },
  { id: 'polvo', name: 'POLVO', position: [-0.5, -0.4, 0.2], size: [0.48, 0.35, 0.18], offset: 2.8 },
  { id: 'peregrino', name: 'PEREGRINO', position: [1.1, -1.0, 0.2], size: [0.55, 0.42, 0.2], offset: 0.7 },
  { id: 'tubarao-martelo', name: 'TUBARÃO MARTELO', position: [-1.3, -1.3, 0.2], size: [0.6, 0.5, 0.2], offset: 1.8 },
];

function AssetBlock({ asset, hoveredId, setHoveredId }) {
  const meshRef = useRef(null);
  const [x, y, z] = asset.position;
  const isHovered = hoveredId === asset.id;
  const isDimmed = hoveredId && !isHovered;

  useFrame((state) => {
    if (!meshRef.current) return;

    const elapsed = state.clock.elapsedTime;
    const bob = Math.sin(elapsed + asset.offset) * 0.1;
    meshRef.current.position.z = z + bob;

    const targetScale = isHovered ? 1.2 : 1;
    const nextScale = meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1;
    meshRef.current.scale.setScalar(nextScale);
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHoveredId(asset.id);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHoveredId(null);
      }}
      castShadow
    >
      <boxGeometry args={asset.size} />
      <meshStandardMaterial
        color="#7CFC00"
        emissive="#7CFC00"
        emissiveIntensity={isHovered ? 0.55 : 0.22}
        transparent
        opacity={isDimmed ? 0.25 : 0.9}
        roughness={0.35}
        metalness={0.08}
      />
    </mesh>
  );
}

export function Assets({ hoveredId, setHoveredId }) {
  return (
    <group>
      {ASSET_DATA.map((asset) => (
        <AssetBlock key={asset.id} asset={asset} hoveredId={hoveredId} setHoveredId={setHoveredId} />
      ))}
    </group>
  );
}
