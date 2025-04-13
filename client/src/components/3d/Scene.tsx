// 'use client';
// import { useFrame, useThree } from '@react-three/fiber';
// import React from 'react';
// import {
//   Environment,
//   // OrbitControls,
//   PerspectiveCamera,
// } from '@react-three/drei';
// import { Physics, RigidBody } from '@react-three/rapier';
// import { Model as Mars } from '@/components/3d/Mars';
// import { Model as Rocket } from '@/components/3d/Rocket';
// import { useScroll, useTransform } from 'motion/react';
// // import * as THREE from 'three';

// const Scene: React.FC = () => {
//   const { camera } = useThree();
//   const { scrollYProgress } = useScroll();

//   const px = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.5, 0.75, 1],
//     [3, -5, 0, 4, 0]
//   );
//   const pz = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.5, 0.75, 1],
//     [0, 0, 0, 2, 0]
//   );
//   const py = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.5, 0.75, 1],
//     [5, 5, -5, 6, 5]
//   );
//   const Lookx = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.5, 0.75, 1],
//     [0, 0, -0.8, 0, 0]
//   );
//   const Lookz = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.5, 0.75, 1],
//     [0, 0, 0, 0, 0]
//   );
//   const Looky = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.5, 0.75, 1],
//     [0, 0, 0, 0, 0]
//   );

//   useFrame(() => {
//     const xPos = px.get();
//     const zPos = pz.get();
//     const yPos = py.get();
//     const xLook = Lookx.get();
//     const zLook = Lookz.get();
//     const yLook = Looky.get();
//     camera.position.set(xPos, zPos, yPos);
//     camera.lookAt(xLook, zLook, yLook);
//   });

//   return (
//     <Physics>
//       <axesHelper args={[100]} />
//       <PerspectiveCamera makeDefault fov={window.innerWidth < 768 ? 40 : 20} />

//       <Environment preset='city' environmentIntensity={0.2} />

//       <directionalLight
//         position={[-5, 5, -5]}
//         intensity={1}
//         // castShadow
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//         shadow-camera-near={0.1}
//         shadow-camera-far={50}
//       />

//       <directionalLight
//         position={[5, 5, 5]}
//         intensity={2}
//         castShadow
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//         shadow-camera-near={0.1}
//         shadow-camera-far={50}
//       />

//       {/* Ground */}
//       <RigidBody type='fixed'>
//         <mesh position={[0, -1, 0]} receiveShadow>
//           <cylinderGeometry args={[100, 100, 1]} />
//           <meshStandardMaterial color='#000000' />
//         </mesh>
//       </RigidBody>

//       {/* Model */}
//       <RigidBody colliders='trimesh'>
//         <Mars castShadow receiveShadow />
//       </RigidBody>

//       <RigidBody colliders='trimesh'>
//         <Rocket castShadow receiveShadow />
//       </RigidBody>
//     </Physics>
//   );
// };

// export default Scene;

'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Environment } from '@react-three/drei';

// import { Physics, RigidBody } from '@react-three/rapier';
import { Model as Mars } from '@/components/3d/Mars';
import { Model as Rocket } from '@/components/3d/Rocket';
import Stars from './Stars';

export default function Scene() {
  return (
    <Canvas
      style={{ backgroundColor: 'black' }}
      camera={{ position: [0, 0, 3] }}>
      <OrbitControls />
      <Stats />
      <Environment preset='city' environmentIntensity={0.2} />
      <axesHelper args={[100]} />
      <Rocket castShadow receiveShadow />
      <Mars castShadow receiveShadow />
      <ambientLight intensity={0.1} />
      <directionalLight position={[1, 1, 1]} intensity={2} />
      <Stars />
    </Canvas>
  );
}
