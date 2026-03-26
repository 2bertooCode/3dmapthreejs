import { Html } from '@react-three/drei';

export function Labels({ assets, hoveredId }) {
  return (
    <group>
      {assets.map((asset) => {
        const isHovered = hoveredId === asset.id;
        const isDimmed = hoveredId && !isHovered;

        return (
          <Html
            key={asset.id}
            position={[asset.position[0], asset.position[1], asset.position[2] + 0.55]}
            center
            distanceFactor={9}
            transform
            sprite
            style={{
              pointerEvents: 'none',
              opacity: isDimmed ? 0.35 : 1,
              transition: 'opacity 200ms ease',
            }}
          >
            <div className={`label-chip ${isHovered ? 'is-hovered' : ''}`}>
              <span className="label-icon">◉</span>
              <span>{asset.name}</span>
            </div>
          </Html>
        );
      })}
    </group>
  );
}
