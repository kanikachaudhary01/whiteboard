import  { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import PenTool from "./tools/PenTool";
import RectangleTool from "./tools/RectangleTool";
import CircleTool from "./tools/CircleTool";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement >(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null >(null);
  const [tool, setTool] = useState("pen");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;
  }, []);

  return (
    <>
      <Navbar  setCurrentTool={setTool} />
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", cursor: "crosshair" }}
        onMouseDown={(e:React.MouseEvent) => {
          if (tool === "pen") PenTool.onMouseDown(e, ctxRef);
          if (tool === "rectangle") RectangleTool.onMouseDown(e, ctxRef);
          if (tool === "circle") CircleTool.onMouseDown(e, ctxRef);
        }}
        onMouseMove={(e:React.MouseEvent) => {
          if (tool === "pen") PenTool.onMouseMove(e, ctxRef);
          if (tool === "rectangle") RectangleTool.onMouseMove(e, ctxRef, canvasRef);
           if (tool === "circle") CircleTool.onMouseMove(e, ctxRef, canvasRef);
        }}
        onMouseUp={() => {
          if (tool === "pen") PenTool.onMouseUp( ctxRef);
          if (tool === "rectangle") RectangleTool.onMouseUp();
          if (tool === "circle") CircleTool.onMouseUp( ctxRef);
        }}
      />
    </>
  );
};

export default Whiteboard;
