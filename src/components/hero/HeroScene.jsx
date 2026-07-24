import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import HeroRobot from './HeroRobot';
import { theme } from '@/config/theme';

/**
 * Hoisted at module scope — Canvas expects stable references for `camera`
 * and `gl`. Passing object literals inline caused new object allocations on
 * every parent re-render, forcing R3F to diff them even though they never
 * change. These are effectively config, not state.
 */
const CAMERA = { position: [0, 0, 4.2], fov: 45 };
const GL = { antialias: true, alpha: true };
const DPR = [1, 1.75];
const SPARKLES_SCALE = [4, 4, 4];

/**
 * MouseLight — a point light that eases toward the pointer's projected
 * position, so the core's lit side visibly shifts as you move the cursor.
 * Kept separate from HeroRobot so lighting logic doesn't get tangled up
 * with mesh logic.
 */
function MouseLight() {
  const light = useRef();
  const { pointer, viewport } = useThree();

  useFrame((_, delta) => {
    if (!light.current) return;
    const targetX = (pointer.x * viewport.width) / 2.2;
    const targetY = (pointer.y * viewport.height) / 2.2;
    light.current.position.x += (targetX - light.current.position.x) * 3 * delta;
    light.current.position.y += (targetY - light.current.position.y) * 3 * delta;
  });

  return <pointLight ref={light} position={[0, 0, 2]} intensity={12} color={theme.colors.cyanCore} distance={6} />;
}

export default function HeroScene({ className }) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={CAMERA}
        dpr={DPR}
        gl={GL}
      >
        <ambientLight intensity={0.18} />
        <MouseLight />
        <pointLight position={[-3, 2, -2]} intensity={3} color={theme.colors.blueDeep} />

        <Suspense fallback={null}>
          <HeroRobot />
          <Sparkles count={45} scale={SPARKLES_SCALE} size={1.2} speed={0.18} color={theme.colors.cyanCore} opacity={0.45} />
        </Suspense>
      </Canvas>
    </div>
  );
}
