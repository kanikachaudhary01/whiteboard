import React, { useRef, useEffect } from "react";

const WhiteBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDraw = useRef(false);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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

    function handleMouseDown(e: React.MouseEvent) {
        if (!ctxRef.current) return;
        isDraw.current = true;
        ctxRef.current.beginPath(); 
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDraw.current || !ctxRef.current) return;
        ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctxRef.current.stroke();
    }

    function handleMouseUp() {
        if (!ctxRef.current) return;
        isDraw.current = false;
        ctxRef.current.closePath();
    }

    return (
        <canvas
            ref={canvasRef}
            style={{ border: "1px solid #ccc", cursor: "crosshair" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        />
    );
};

export default WhiteBoard;
