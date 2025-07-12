const isDrawing = { current: false };
const startPos = { x: 0, y: 0 };

const RectangleTool = {
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

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const ctx = ctxRef.current;

    // Clear and redraw (optional: use offscreen canvas for better UX)
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
  },

  onMouseUp: (
  ) => {
    isDrawing.current = false;
  }
};

export default RectangleTool;
