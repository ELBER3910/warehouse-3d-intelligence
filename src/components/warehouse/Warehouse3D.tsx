import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import {
  AISLES, RACKS_PER_AISLE, RACK_LEN, RACK_DEPTH, LEVELS_PER_RACK, LEVEL_H, BAYS_PER_RACK, BAY_W,
  rackOrigin, buildPositions, type StoragePosition,
} from "@/lib/warehouse-layout";

const C_FREE = new THREE.Color("#2b6fd6");
const C_HOVER = new THREE.Color("#7fc4ff");
const C_SEL = new THREE.Color("#ffb020");

function Positions({ positions, selected, onSelect }: { positions: StoragePosition[]; selected: number | null; onSelect: (i: number) => void }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const [hover, setHover] = useState<number | null>(null);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    positions.forEach((p, i) => {
      m.setPosition(p.x, p.y, p.z);
      ref.current!.setMatrixAt(i, m);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useEffect(() => {
    const mesh = ref.current!;
    positions.forEach((_, i) => mesh.setColorAt(i, i === selected ? C_SEL : i === hover ? C_HOVER : C_FREE));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [positions, selected, hover]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, positions.length]}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); setHover(e.instanceId ?? null); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHover(null); document.body.style.cursor = ""; }}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); if (e.instanceId != null) onSelect(e.instanceId); }}
    >
      <boxGeometry args={[RACK_DEPTH * 0.82, LEVEL_H * 0.62, BAY_W * 0.84]} />
      <meshStandardMaterial transparent opacity={0.55} roughness={0.4} metalness={0.1} />
    </instancedMesh>
  );
}

function Rack({ x, z }: { x: number; z: number }) {
  const h = LEVELS_PER_RACK * LEVEL_H + 0.3;
  const uprights = [];
  for (let b = 0; b <= BAYS_PER_RACK; b++)
    for (const dx of [-RACK_DEPTH / 2, RACK_DEPTH / 2])
      uprights.push(<mesh key={`${b}${dx}`} position={[x + dx, h / 2, z + b * BAY_W]}><boxGeometry args={[0.07, h, 0.07]} /><meshStandardMaterial color="#1d3a66" metalness={0.6} roughness={0.35} /></mesh>);
  const beams = [];
  for (let l = 0; l < LEVELS_PER_RACK; l++)
    for (const dx of [-RACK_DEPTH / 2, RACK_DEPTH / 2])
      beams.push(<mesh key={`${l}${dx}`} position={[x + dx, l * LEVEL_H + 0.18, z + RACK_LEN / 2]}><boxGeometry args={[0.06, 0.1, RACK_LEN]} /><meshStandardMaterial color="#e07b1a" metalness={0.4} roughness={0.5} /></mesh>);
  return <group>{uprights}{beams}</group>;
}

function Floor() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#1a2638"; g.fillRect(0, 0, 256, 256);
    g.strokeStyle = "#24344d"; g.lineWidth = 2; g.strokeRect(0, 0, 256, 256);
    for (let i = 0; i < 600; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`; g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2); }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(20, 20); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial map={tex} roughness={0.85} />
    </mesh>
  );
}

function AisleMarkings() {
  const items = [];
  const { z: z0 } = rackOrigin(0, 0);
  const len = RACKS_PER_AISLE * RACK_LEN + (RACKS_PER_AISLE - 1) * 1.6;
  for (let a = 0; a < AISLES; a++) {
    const { x } = rackOrigin(a, 0);
    const cx = x + 2.6;
    items.push(
      <group key={a}>
        {a < AISLES - 1 && <mesh rotation-x={-Math.PI / 2} position={[cx, 0.01, z0 + len / 2]}><planeGeometry args={[0.08, len]} /><meshBasicMaterial color="#d9a21a" /></mesh>}
      </group>,
    );
  }
  return <>{items}</>;
}

export default function Warehouse3D({ selected, onSelect }: { selected: number | null; onSelect: (p: StoragePosition | null) => void }) {
  const positions = useMemo(() => buildPositions(), []);
  const [ready, setReady] = useState(false);
  return (
    <div className="h-full w-full" data-scene-ready={ready ? "" : undefined}>
      <Canvas shadows camera={{ position: [30, 28, 40], fov: 45 }} onCreated={() => setReady(true)} onPointerMissed={() => onSelect(null)} gl={{ antialias: true }}>
        <color attach="background" args={["#0b1424"]} />
        <fog attach="fog" args={["#0b1424", 45, 95]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[20, 30, 10]} intensity={1.4} castShadow shadow-mapSize={[2048, 2048]} />
        <pointLight position={[0, 12, 0]} intensity={40} color="#9cc8ff" />
        <Environment resolution={64}>
          <Lightformer intensity={2} position={[0, 8, 0]} rotation-x={Math.PI / 2} scale={[30, 30, 1]} />
          <Lightformer intensity={1} color="#8bb8ff" position={[-10, 3, 0]} rotation-y={Math.PI / 2} scale={[30, 2, 1]} />
        </Environment>
        <Floor />
        <AisleMarkings />
        {Array.from({ length: AISLES }).flatMap((_, a) => Array.from({ length: RACKS_PER_AISLE }).map((_, r) => { const o = rackOrigin(a, r); return <Rack key={`${a}-${r}`} x={o.x} z={o.z} />; }))}
        <Positions positions={positions} selected={selected} onSelect={(i) => onSelect(positions[i] ?? null)} />
        <ContactShadows position={[0, 0.02, 0]} opacity={0.5} scale={70} blur={2} far={10} />
        <OrbitControls makeDefault enableDamping maxPolarAngle={Math.PI / 2.1} minDistance={6} maxDistance={80} target={[0, 2, 0]} />
      </Canvas>
    </div>
  );
}
