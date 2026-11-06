"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Environment } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function Sculpture() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const colors = useMemo(() => ["#a78bfa", "#fb7185", "#22d3ee", "#c4f15b"], []);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Ambient rotation plus subtle pointer-following parallax.
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.y += (state.pointer.x * 0.16 - group.current.rotation.y) * delta * 0.35;
    group.current.rotation.x += ( -state.pointer.y * 0.10 - group.current.rotation.x) * delta * 0.35;
    if (core.current) {
      core.current.rotation.x += delta * 0.16;
      core.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.15} rotationIntensity={0.3} floatIntensity={0.55}>
        <mesh ref={core} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.05, 5]} />
          <MeshDistortMaterial color={colors[0]} roughness={0.22} metalness={0.32} distort={0.32} speed={1.7} />
        </mesh>
      </Float>
      <Float speed={1.7} rotationIntensity={0.8} floatIntensity={1.1}>
        <Torus args={[1.55, 0.075, 24, 160]} rotation={[1.1, 0.2, 0.4]}>
          <meshStandardMaterial color={colors[2]} metalness={0.72} roughness={0.2} />
        </Torus>
      </Float>
      <Float speed={1.35} rotationIntensity={1} floatIntensity={0.8}>
        <Sphere args={[0.27, 48, 48]} position={[1.7, 0.72, 0.15]}>
          <meshStandardMaterial color={colors[1]} metalness={0.2} roughness={0.22} />
        </Sphere>
      </Float>
      <Float speed={1.8} rotationIntensity={1} floatIntensity={0.9}>
        <Icosahedron args={[0.28, 1]} position={[-1.55, -0.85, 0.45]}>
          <meshStandardMaterial color={colors[3]} metalness={0.18} roughness={0.28} />
        </Icosahedron>
      </Float>
      <Float speed={1.25} rotationIntensity={0.7} floatIntensity={0.75}>
        <Sphere args={[0.16, 32, 32]} position={[-1.35, 0.95, -0.2]}>
          <meshStandardMaterial color="#fb923c" emissive="#7c2d12" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="scene" aria-label="Animated abstract 3D sculpture">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        fallback={<div className="scene-fallback" />}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-3, -2, 2]} color="#a78bfa" intensity={18} />
        <Suspense fallback={null}>
          <Sculpture />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
