import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Float, Sparkles, OrbitControls } from '@react-three/drei';

function F1Model(props) {
  // This loads the file from frontend/public/car.glb
  const { scene } = useGLTF('/car.glb');
  
  return (
    <primitive 
      object={scene} 
      {...props} 
      scale={0.5} // TWEAK THIS NUMBER if car is too big/small
      rotation={[0, -0.5, 0]}
    />
  );
}

export default function Experience() {
  return (
    <>
      {/* --- CONTROLS: Allows you to Move/Zoom --- */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        minPolarAngle={0.5} 
        maxPolarAngle={1.5}
        autoRotate={true} 
        autoRotateSpeed={0.5} 
      />

      {/* Premium Lighting Studio */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      
      {/* Red Rim Light (The "Red Bull" vibe) */}
      <spotLight position={[-5, 2, 5]} angle={0.5} penumbra={1} intensity={5} color="#ff1e00" />
      <spotLight position={[5, 5, 5]} angle={0.5} penumbra={1} intensity={2} color="white" />

      {/* Floating Effect */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        <F1Model position={[0, -0.5, 0]} />
      </Float>

      {/* Atmosphere Particles */}
      <Sparkles count={50} scale={5} size={4} speed={0.4} opacity={0.5} color="#ff1e00" />
      
      {/* Floor Shadow */}
      <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.7} far={10} color="#000" />
    </>
  );
}