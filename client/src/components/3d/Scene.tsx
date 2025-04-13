'use client';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef } from 'react';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { Model } from '@/components/3d/RocketNew';
import { Model as Mars } from '@/components/3d/Mars';
import { useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';
import Stars from './Stars';

const Scene: React.FC = () => {
  // Camera position animations with more complex movements

  const { camera } = useThree();
  const { scrollYProgress } = useScroll();

  const px = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
    [3, 6, -5, -8, 0, 2, 4, -3, 0]
  );

  const py = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
    [5, 8, 5, 0, -5, -3, 6, 7, 2]
  );

  const pz = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
    [0, 2, 0, -3, 0, 4, 2, 1, 0]
  );

  // Camera rotation/lookAt animations
  const Lookx = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
    [0, 0.5, 0, -0.5, -0.8, 0.3, 0, -0.4, 0]
  );

  const Looky = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
    [0, 0.2, 0.5, 0, 0, -0.5, 0.3, 0.7, -2]
  );

  const Lookz = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
    [0, 0, 0.3, -0.2, 0, 0.4, 0.1, -0.3, 0]
  );

  // Optional: Add camera roll for even more dynamic effect
  const cameraRoll = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.35, 0.5, 0.65, 0.75, 0.85, 1],
    [0, 0.1, 0, -0.2, 0.15, 0, -0.1, 0.05, 0]
  );

  useFrame(() => {
    // console.log('camera', camera.position);
    const xPos = px.get();
    const yPos = py.get();
    const zPos = pz.get();
    const xLook = Lookx.get();
    const yLook = Looky.get();
    const zLook = Lookz.get();
    const roll = cameraRoll.get();

    // Set camera position
    camera.position.set(xPos, zPos, yPos);

    // Set camera look target
    camera.lookAt(xLook, zLook, yLook);

    // Apply roll rotation (optional, for more dramatic effect)
    camera.rotation.z = roll;
  });
  return (
    // <Physics>
    <>
      <axesHelper args={[100]} />
      <PerspectiveCamera makeDefault fov={window.innerWidth < 768 ? 40 : 20} />
      <Environment preset='city' environmentIntensity={0.2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={1}
        // castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
      />

      {/* Ground */}
      {/* <RigidBody type='fixed'>
        <mesh position={[0, -1, 0]} receiveShadow>
          <cylinderGeometry args={[100, 100, 1]} />
          <meshStandardMaterial color='#000000' />
        </mesh>
      </RigidBody> */}

      {/* Model */}
      {/* <RigidBody colliders='trimesh'> */}
      <Model castShadow receiveShadow />
      <Mars castShadow receiveShadow />
      <Stars />
      {/* </RigidBody> */}
      {/* </Physics> */}
    </>
  );
};

export default Scene;

// 'use client';

// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import {
//   Stats,
//   OrbitControls,
//   Environment,
//   PerspectiveCamera,
// } from '@react-three/drei';

// // import { Physics, RigidBody } from '@react-three/rapier';
// import { Model as Mars } from '@/components/3d/Mars';
// import { Model as Rocket } from '@/components/3d/Rocket';

// import { useFrame, useThree } from '@react-three/fiber';
// import { useScroll, useTransform } from 'motion/react';
// import Stars from './Stars';
// import * as THREE from 'three';

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
//     console.log('camera', camera.position);
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
//     <>
//       {/* camera={{ position: [10, 0, 0], rotation: [Math.PI / 2, 0, 0] }} */}
//       <PerspectiveCamera
//         makeDefault
//         position={[10, 0, 0]}
//         rotation={[Math.PI / 2, 0, 0]}
//         // fov={window.innerWidth < 768 ? 40 : 20}
//       />
//       {/* <OrbitControls /> */}
//       <Stats />
//       <Environment preset='city' environmentIntensity={0.2} />
//       <axesHelper args={[100]} />
//       <Rocket castShadow receiveShadow />
//       <Mars castShadow receiveShadow />
//       <ambientLight intensity={0.1} />
//       <directionalLight position={[1, 1, 1]} intensity={2} />
//       <Stars />
//     </>
//   );
// };
// export default Scene;
