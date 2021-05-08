import React, { useEffect, useRef } from "react";

import { WebglPlot, WebglLine, ColorRGBA } from "webgl-plot";

let webglp: WebglPlot;
let line: WebglLine;

type prop = {
  freq: number;
  amp: number;
  noise?: number;
};

export default function WebglAppSin({ freq, amp, noise }: prop) {
  //
  //const [freq, setFreq] = useState(0.001);
  //const [amp, setAmp] = useState(0.5);

  //let canvas: HTMLCanvasElement;

  const canvasMain = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasMain.current) {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvasMain.current.width =
        canvasMain.current.clientWidth * devicePixelRatio;
      canvasMain.current.height =
        canvasMain.current.clientHeight * devicePixelRatio;

      webglp = new WebglPlot(canvasMain.current);
      const numX = 1000;

      line = new WebglLine(new ColorRGBA(1, 0, 0, 1), numX);
      webglp.addLine(line);

      line.lineSpaceX(-1, 2 / numX);

      //this.setState({ Amp: 0.5 });
    }
  }, []);

  useEffect(() => {
    let id = 0;
    let renderPlot = () => {
      //const freq = 0.001;
      //const noise = 0.1;
      //const amp = 0.5;
      const noise1 = noise || 0.1;

      for (let i = 0; i < line.numPoints; i++) {
        const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
        const yNoise = Math.random() - 0.5;
        line.setY(i, ySin * amp + yNoise * noise1);
      }
      id = requestAnimationFrame(renderPlot);
      webglp.update();
    };
    id = requestAnimationFrame(renderPlot);

    return () => {
      renderPlot = () => {};
      cancelAnimationFrame(id);
    };
  }, [freq, amp, noise]);

  const canvasStyle = {
    width: "100%",
    height: "70vh"
  };

  return (
    <div>
      <canvas style={canvasStyle} ref={canvasMain} />
    </div>
  );
}
