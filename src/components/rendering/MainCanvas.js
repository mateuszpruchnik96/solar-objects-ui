import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { SphereGeometry, MeshBasicMaterial } from "three";
import { OrbitControls, Preload } from "@react-three/drei";
import Sphere from "./Sphere";
import { CylinderGeometry } from "three";
import Cylinder3d from "./Cylinder3d";
import * as THREE from "three";
import { useControls } from "leva";
import Lights from "./Lights";
extend({ OrbitControls });

const PinkSphere = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.z += 0.05));
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[1, 2]} />
      <meshStandardMaterial
        wireframe={props.wireframe}
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};

const SunCanvas = () => {
  return (
    <div className="sun-canvas">
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Lights />
        <OrbitControls />

        <Cylinder3d />
        <Sphere position={[5, 0, 0]} />
        <Sphere position={[12, 0, 0]} />

        {/* <PinkSphere position={[1, 2, 3]} /> */}

        {/* </Suspense> */}
        {/* <Preload all /> */}
      </Canvas>
    </div>
  );
};

const MainCanvas = () => {
  const controlsRef = useRef(null);

  return (
    <>
      <SunCanvas />
      <mesh>
        <hemisphereLight intensity={0.15} groundColor="black" />
        <Canvas
          width={800}
          height={600}
          camera={{ position: [0, 0, 5] }}
          onCreated={({ gl }) => {
            gl.setClearColor("white");
          }}
          onPointerMissed={() => controlsRef.current.reset()}
          // Pass the controlsRef to the OrbitControls component
          // so it can control the camera.
          orbitControls
          ref={controlsRef}
        >
          <pointLight position={[10, 10, 10]} />
          <ambientLight />
          <Sphere />
        </Canvas>
      </mesh>
    </>
  );
};

export default MainCanvas;
