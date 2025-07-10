import React, { useRef, useEffect } from "react";
const WhiteBoard = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDraw = useRef(false)
    const prevPos = useRef({x:0,y:0})
    useEffect(() => {
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    }, []);

    function handleMouseDown (e:React.MouseEvent){
        isDraw.current = true
        prevPos.current = {x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY}
    }
    function handleMouseUp (e:React.MouseEvent){
        isDraw.current = false

    }
    function handleMouseMove (e:React.MouseEvent){
        if(!isDraw.current || !canvasRef.current) return ;
          const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        const {offsetX,offsetY} = e.nativeEvent
        ctx.beginPath()
        ctx.moveTo(prevPos.current.x , prevPos.current.y)
        ctx.lineTo(offsetX , offsetY)
        ctx.stroke()
    }
    return (
        <>
            <canvas
                ref={canvasRef}

                style={{ border: "1px solid #ccc", cursor: "crosshair" }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            ></canvas>
        </>
    );
};

export default WhiteBoard;
