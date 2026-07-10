import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { theme } from '@/config/theme';

export default function HeroRobot() {
  const group = useRef();
  const core = useRef();
  const shell = useRef();
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (group.current) {
      const targetY = pointer.x * 0.5;
      const targetX = -pointer.y * 0.3;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 2 * delta;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 2 * delta;
    }
    if (shell.current) {
      shell.current.rotation.y += delta * 0.12;
      shell.current.rotation.z += delta * 0.04;
    }
    if (core.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.05;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      {/* Outer wireframe shell — softer opacity */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={theme.colors.cyanCore} wireframe transparent opacity={0.22} />
      </mesh>

      {/* Inner emissive core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.52, 2]} />
        <meshStandardMaterial
          color={theme.colors.cyanCore}
          emissive={theme.colors.cyanCore}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Primary halo ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.05, 0.009, 16, 100]} />
        <meshBasicMaterial color={theme.colors.blueDeep} transparent opacity={0.5} />
      </mesh>

      {/* Secondary ring */}
      <mesh rotation={[Math.PI / 2.4, 0, Math.PI / 3]}>
        <torusGeometry args={[1.22, 0.006, 16, 100]} />
        <meshBasicMaterial color={theme.colors.cyanCore} transparent opacity={0.2} />
      </mesh>

      {/* Third ring — subtle */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.8, 0.005, 16, 100]} />
        <meshBasicMaterial color={theme.colors.cyanCore} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
