import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { theme } from '@/config/theme';

/**
 * Geometry arg arrays hoisted to module scope.
 * R3F geometry constructors compare args by array reference — new inline
 * arrays on every render force unnecessary geometry rebuilds.
 */
const SHELL_ARGS = [1.5, 1];
const CORE_ARGS = [0.52, 2];
const HALO_ARGS = [1.05, 0.009, 16, 100];
const RING2_ARGS = [1.22, 0.006, 16, 100];
const RING3_ARGS = [0.8, 0.005, 16, 100];

/**
 * Static mesh rotations — hoisted so R3F doesn't see new Euler objects
 * on every reconcile pass for elements that never change rotation.
 */
const HALO_ROTATION  = [Math.PI / 2.4, 0, 0];
const RING2_ROTATION = [Math.PI / 2.4, 0, Math.PI / 3];
const RING3_ROTATION = [0, 0, Math.PI / 4];

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
        <icosahedronGeometry args={SHELL_ARGS} />
        <meshBasicMaterial color={theme.colors.cyanCore} wireframe transparent opacity={0.22} />
      </mesh>

      {/* Inner emissive core */}
      <mesh ref={core}>
        <icosahedronGeometry args={CORE_ARGS} />
        <meshStandardMaterial
          color={theme.colors.cyanCore}
          emissive={theme.colors.cyanCore}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Primary halo ring */}
      <mesh rotation={HALO_ROTATION}>
        <torusGeometry args={HALO_ARGS} />
        <meshBasicMaterial color={theme.colors.blueDeep} transparent opacity={0.5} />
      </mesh>

      {/* Secondary ring */}
      <mesh rotation={RING2_ROTATION}>
        <torusGeometry args={RING2_ARGS} />
        <meshBasicMaterial color={theme.colors.cyanCore} transparent opacity={0.2} />
      </mesh>

      {/* Third ring — subtle */}
      <mesh rotation={RING3_ROTATION}>
        <torusGeometry args={RING3_ARGS} />
        <meshBasicMaterial color={theme.colors.cyanCore} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
