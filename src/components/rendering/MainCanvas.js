import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import SunCanvas from "./SunCanvas.js";
extend({ OrbitControls });

const MainCanvas = () => {
  const controlsRef = useRef(null);

  return (
    <>
      <SunCanvas />
    </>
  );
};

export default MainCanvas;
