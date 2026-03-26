import { Line } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { Box2, Vector2, Vector3 } from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

export function MapOutline() {
  const svgData = useLoader(SVGLoader, '/bacia.svg');

  const { lines } = useMemo(() => {
    const allPoints = [];

    const lineSets = svgData.paths
      .map((path) => path.subPaths)
      .flat()
      .map((subPath) => {
        const points = subPath.getPoints(48);
        points.forEach((p) => allPoints.push(p));
        return points;
      });

    const bounds = new Box2();
    allPoints.forEach((p) => bounds.expandByPoint(new Vector2(p.x, p.y)));

    const centerPoint = bounds.getCenter(new Vector2());
    const size = bounds.getSize(new Vector2());
    const fitScale = 6 / Math.max(size.x, size.y);

    const mappedLines = lineSets.map((points) =>
      points.map(
        (point) =>
          new Vector3((point.x - centerPoint.x) * fitScale, -(point.y - centerPoint.y) * fitScale, 0.03),
      ),
    );

    return { lines: mappedLines };
  }, [svgData]);

  if (!lines.length) return null;

  return (
    <group>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#00E0FF"
          lineWidth={1}
          transparent
          opacity={0.45}
        />
      ))}
    </group>
  );
}
