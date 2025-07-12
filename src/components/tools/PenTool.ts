const isDrawing = { current: false };

const PenTool = {
    onMouseDown: (
        e: React.MouseEvent,
        ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>
    ) => {
        if (!ctxRef.current) return;
        isDrawing.current = true;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    },
    onMouseMove: (
        e: React.MouseEvent,
        ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>
    ) => {
        if (!isDrawing.current || !ctxRef.current) return;
        ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctxRef.current.stroke();
    },
    onMouseUp: (
       
        ctxRef: React.MutableRefObject<CanvasRenderingContext2D | null>
    ) => {
        isDrawing.current = false;
        ctxRef.current?.closePath();
    },
};

export default PenTool;
