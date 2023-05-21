import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import textureImage from "./../../assets/2k_mercury.jpg";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Sphere = (props) => {
  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.z += 0.05));

  const texture = useLoader(
    TextureLoader,
    props.texture ? props.texture : textureImage
  );

  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <sphereGeometry args={[1, 20]} />
      <meshStandardMaterial
        map={texture}
        // wireframe={props.wireframe}
        // color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};

export default Sphere;
