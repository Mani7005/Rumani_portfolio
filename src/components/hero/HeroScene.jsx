import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import HeroRobot from './HeroRobot';
import { theme } from '@/config/theme';

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
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.18} />
        <MouseLight />
        <pointLight position={[-3, 2, -2]} intensity={3} color={theme.colors.blueDeep} />

        <Suspense fallback={null}>
          <HeroRobot />
          <Sparkles count={45} scale={[4, 4, 4]} size={1.2} speed={0.18} color={theme.colors.cyanCore} opacity={0.45} />
        </Suspense>
      </Canvas>
    </div>
  );
}
