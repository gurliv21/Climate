import React, { useEffect, useRef, useState } from 'react';
import { SWATCHES } from './components/Constants';
import {ColorSwatch, Group} from '@mantine/core'
import { Button } from "@/components/ui/button"
import axios from 'axios';

interface Response {
    exp: string;
    result: string;
    assign: boolean;
}
interface GenerateResult {
    expression: string;
    answer:string;
}
function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('rgb(255,255,255)');
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState<GenerateResult>();
  const [dictOfVars, setDictOfVars] = useState({});
  useEffect(()=> {
    if(reset) {
        resetCanvas();
        setReset(false);
    }
  },[reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
      }
    }
  }, []);
  const sendData = async () =>{
    const canvas = canvasRef.current;
    if(canvas){
        console.log('sending data...', `${import.meta.env.VITE_API_URL}\calculate`)
        const response = await axios({
            method:'post',
            url:`${import.meta.env.VITE_API_URL}/calculate`,
            data:{
                image: canvas.toDataURL('image/png'),
                dict_of_vars: dictOfVars,
    
            }
        });
        const resp = await response.data;
        console.log('Response:', resp);
    }
  }
  const resetCanvas = () =>{
    const canvas = canvasRef.current;
    if(canvas){
        const ctx = canvas.getContext('2d');
        if(ctx){
            ctx.clearRect(0,0, canvas.width, canvas.height);
        }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = 'black';
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      }
    }
  };

  return (
    <>
    <div className=' grid grid-cols-3 gap-8 m-4 md:m-8 lg:m-8  '>
        <Button 
        onClick={() => setReset(true)}
        className='z-20 md:w-1/3 lg:w-1/3 bg-black font-bold text-lg border '
        variant ='default'
        color='black'
        style={{
          
          color: 'rgb(0, 102, 204)', // Custom blue color
          borderColor: 'rgb(0, 102, 204)' // Custom blue border color
        }}
        >
            Reset
        </Button>
        <Group className='z-20'>
            {SWATCHES.map((swatchColor: string)=> (
                <ColorSwatch
                 key={swatchColor}
                 color={swatchColor}
                 onClick={() => setColor(swatchColor)}
                 />

            ) )}
        </Group>
        <Button 
        onClick={sendData}
        className='z-20 md:w-1/3 lg:w-1/3 bg-black  font-bold text-lg border '
        variant ='default'
        color='black'
        style={{
          
          color: 'rgb(0, 102, 204)', // Custom blue color
          borderColor: 'rgb(0, 102, 204)' // Custom blue border color
        }}
        >
            Calculate
        </Button>

    </div>
    <canvas
      ref={canvasRef}
      id="canvas"
      className="absolute top-0 left-0 w-full h-full"
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
    />
    </>
  );
}

export default Home;

