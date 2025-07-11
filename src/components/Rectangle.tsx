import React, { useRef, useEffect, useState } from "react";

const RectangleTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        setCanvasCtx(ctx);
      }
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    startPos.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current || !canvasCtx) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const { x: startX, y: startY } = startPos.current;

    canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

 
    canvasCtx.strokeRect(startX, startY, x - startX, y - startY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing.current || !canvasCtx) return;

    isDrawing.current = false;

    const endX = e.nativeEvent.offsetX;
    const endY = e.nativeEvent.offsetY;
    const { x: startX, y: startY } = startPos.current;

    canvasCtx.strokeRect(startX, startY, endX - startX, endY - startY);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: "1px solid #ccc", cursor: "crosshair" }}
    />
  );
};

export default RectangleTool;
