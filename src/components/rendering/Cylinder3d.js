import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import textureImage from "./../../assets/2k_mercury.jpg";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Cylinder3d = (props) => {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  console.log(props.name);
  const texture = useLoader(
    TextureLoader,
    props.texture ? props.texture : `/2k_${props.name}.jpg`
  );

  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => {
        click(!clicked);
        console.log(event.target);
      }}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <cylinderGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
export default Cylinder3d;
