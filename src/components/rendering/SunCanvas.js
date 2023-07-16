import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import Sphere from "./Sphere";
import Cylinder3d from "./Cylinder3d";
import Lights from "./Lights";
import Grid from "./Grid";
import Controls from "./Controls";
extend({ OrbitControls });

const SunCanvas = ({ planetsData }) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [zPosition, setZPosition] = useState(0);

  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const [zRotation, setZRotation] = useState(0);

  const [xScale, setXScale] = useState(1);
  const [yScale, setYScale] = useState(1);
  const [zScale, setZScale] = useState(1);

  const [planets, setPlanets] = useState({});
  const scale = 10_000_000;

  let data = require("./../../example.json");

  useEffect(() => {
    data = require("./../../example.json");
    setPlanets(data.planets);

    // setPlanets(planetsData);
    console.log(planets);
  });

  useEffect(() => {
    const temp = JSON.stringify(planets);
    console.log("temp " + JSON.stringify(temp));
    console.log(temp);

    updateAllPositions(planetsData);

    // setPlanets(planetsData);
  }, [planetsData]);

  console.log(planetsData);

  const updateAllPositions = (planetsData) => {
    const updatedPlanets = { ...planets };

    let planetsDataJSON = {};
    planetsData && planetsData.charAt(0) == "{"
      ? (planetsDataJSON = JSON.parse(planetsData))
      : (planetsDataJSON = {});
    Object.keys(planetsDataJSON).forEach((key) => {
      console.log(JSON.parse(planetsData));
      updatedPlanets[planetsDataJSON[key].name].position = [
        planetsDataJSON[key].position.x / scale,
        planetsDataJSON[key].position.y / scale,
        planetsDataJSON[key].position.z / scale,
      ];
    });

    setPlanets(updatedPlanets);
  };

  const generatePlanets = function (planets) {
    if (planets !== {}) {
      console.log(
        <>
          {Object.keys(planets).map((key, i) => (
            <Cylinder3d
              scale={largestDistance * 100}
              position={[...(planets[key].position / scale)]}
              // position={[...(planetsData.position / scale)]}

              // texture={()=>{textures.filter(texture=>texture.)}}
            />
          ))}
        </>
      );
    }
  };

  function calcDistanceToSun([x, y, z]) {
    return Math.sqrt(x * x + y * y + z * z);
  }
  console.log(planets);
  let farPlanet;
  console.log(Object.getPrototypeOf(planets));
  if (planets !== {}) {
    console.log(planets);

    farPlanet = Object.keys(planets).map((key, i) => {
      console.log(planets[key].position);
      console.log(i);
      return calcDistanceToSun([...planets[key].position]);
    });
  } else {
    farPlanet = [];
  }
  console.log(farPlanet);
  let largestDistance = Math.max(...farPlanet) / scale;
  // let largestDistance = 1000;

  console.log(largestDistance);

  return (
    <div className="sun-canvas">
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [largestDistance * 1, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Lights />
        <OrbitControls />

        <Sphere scale={largestDistance / 100} position={[0, 0, 0]} />
        {Object.keys(planets).map((key, i) => {
          console.log(
            key + ": " + calcDistanceToSun(planets[key].position) / 1_000_000
          );
          return (
            <Cylinder3d
              key={key + i}
              name={key}
              scale={largestDistance / 100}
              position={[
                planets[key].position[0] / scale,
                planets[key].position[1] / scale,
                planets[key].position[2] / scale,
              ]}
              proba={planetsData}

              // onChangePosition={on}
              // onClick={(e) => console.log(e.target)}
            />
          );
        })}
      </Canvas>
      <Controls
        controls={{
          xPosition,
          yPosition,
          zPosition,
          xRotation,
          yRotation,
          zRotation,
          xScale,
          yScale,
          zScale,
          setXPosition,
          setYPosition,
          setZPosition,
          setXRotation,
          setYRotation,
          setZRotation,
          setXScale,
          setYScale,
          setZScale,
        }}
      />
    </div>
  );
};

export default SunCanvas;
