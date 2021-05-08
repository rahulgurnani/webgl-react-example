import React, { useState } from "react";
//import "./index.css";
import SimpleSlider from "simple-slider-react";

import WebglAppSin from "./webglAppSin";

export default function SinApp() {
  //const freq = useParam();

  let [freq, setFreq] = useState(0.001);
  let [amp, setAmp] = useState(0.5);

  const onUpdate = (value: number) => {
    setFreq(value / 100);
  };

  return (
    <div className="mainapp" style={{ width: "90%" }}>
      <WebglAppSin freq={freq} amp={amp} />
      <SimpleSlider min={1} max={100} onDrag={onUpdate} onUpdate={onUpdate} />
    </div>
  );
}
