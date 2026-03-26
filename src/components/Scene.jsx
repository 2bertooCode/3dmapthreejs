import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useState } from 'react';
import { Assets, ASSET_DATA } from './Assets';
import { Labels } from './Labels';
import { MapOutline } from './MapOutline';
import { Ocean } from './Ocean';

function CameraParallax() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const targetX = pointer.x * 1.1;
    const targetY = -pointer.y * 0.65 - 9;
    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0.4);
  });

  return null;
}

export function Scene() {
  const [hoveredId, setHoveredId] = useState(null);
  const assets = useMemo(() => ASSET_DATA, []);

  return (
    <>
      <color attach="background" args={['#021322']} />
      <fog attach="fog" args={['#021322', 8, 24]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, -6, 10]} intensity={1.2} color="#8be9ff" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#00e0ff" />

      <CameraParallax />
      <Ocean />
      <MapOutline />
      <Assets hoveredId={hoveredId} setHoveredId={setHoveredId} />
      <Labels assets={assets} hoveredId={hoveredId} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.4} intensity={0.65} radius={0.4} />
      </EffectComposer>
    </>
  );
}
