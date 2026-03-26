import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';

function App() {
  return (
    <main className="app-shell">
      <Canvas dpr={[1, 2]} camera={{ position: [0, -9, 5.5], fov: 42 }}>
        <Scene />
      </Canvas>
    </main>
  );
}

export default App;
