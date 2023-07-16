import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { TextureLoader } from "three";
// import autoTexture from "./../../assets/2k_mercury.jpg";

const Cylinder3d = (props) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [texture, setTexture] = useState(null);
  const [position, setPosition] = useState(props.position);
  const [proba, setProba] = useState({});
  const defaultImageUrl = `./../../assets/2k_mercury.jpg`;

  useEffect(() => {
    console.log(position);

    const loadImage = async () => {
      try {
        const imageUrl = `./../../assets/2k_${props.name}.jpg`;

        const loader = new TextureLoader();
        loader.setCrossOrigin("");
        const texture = await new Promise((resolve, reject) => {
          loader.load(imageUrl, resolve, undefined, reject);
        });

        setTexture(texture);
      } catch (error) {
        const loader = new TextureLoader();
        const texture = await new Promise((resolve, reject) => {
          loader.load(defaultImageUrl, resolve, undefined, reject);
        });

        setTexture(texture);
        console.error("Error occurred while loading the texture:", error);
      }
    };

    loadImage();
  }, [props.name]);

  useEffect(() => {
    setPosition(props.position);
    console.log("Position changed:", position);
  }, [props.position]);

  useEffect(() => {
    setProba(props.proba);
  }, []);

  useFrame((state, delta) => {
    // ref.current.rotation.x += 0.01;
  });

  return (
    <mesh
      {...props}
      position={position}
      onChangePosition={(position) => setPosition(position)}
      ref={ref}
      onClick={(event) => {
        setClicked(!clicked);
        console.log(event.target);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <cylinderGeometry args={[1, 1, 1]} />
      {texture ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color="gray" />
      )}
    </mesh>
  );
};

export default Cylinder3d;
