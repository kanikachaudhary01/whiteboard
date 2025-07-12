const isDrawing = { current: false };
const startPos = { x: 0, y: 0 };

const CircleTool = {
  onMouseDown: (
    e: React.MouseEvent,
    ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
   
  ) => {
    if (!ctxRef.current) return;
    isDrawing.current = true;
    startPos.x = e.nativeEvent.offsetX;
    startPos.y = e.nativeEvent.offsetY;
  },

  onMouseMove: (
    e: React.MouseEvent,
    ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>
  ) => {
    if (!isDrawing.current || !ctxRef.current || !canvasRef.current) return;

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;

    const radius = Math.sqrt(
      Math.pow(currentX - startPos.x, 2) + Math.pow(currentY - startPos.y, 2)
    );

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  },

  onMouseUp: (
    
    ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>
  ) => {
    if (!ctxRef.current) return;
    isDrawing.current = false;
    ctxRef.current.closePath();
  }
};

export default CircleTool;
