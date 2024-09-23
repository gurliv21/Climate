import React, { useEffect, useRef, useState } from 'react';
import { SWATCHES } from './components/Constants';
import { ColorSwatch, Group } from '@mantine/core'
import { Button } from "@/components/ui/button"
import Draggable from 'react-draggable'
import axios from 'axios';

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}
interface GenerateResult {
  expression: string;
  answer: string;
}
declare global {
  interface Window {
    MathJax: any;
  }
}

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('rgb(255,255,255)');
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState<GenerateResult>();
  const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
  const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
  const [dictOfVars, setDictOfVars] = useState({});
  useEffect(() => {
    if (reset) {
      resetCanvas();
      setLatexExpression([]);
      setResult(undefined);
      setDictOfVars({});
      setReset(false);
    }
  }, [reset]);
  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, 0);
    }
  }, [latexExpression]);
  useEffect(() => {
    if (result) {
      renderLatexToCanvas(result.expression, result.answer);
    }
  }, [result])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.lineCap = 'round';
        ctx.lineWidth = 6;
      }
    }
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      window.MathJax.Hub.Queue(() => {
        window.MathJax.Hub.Config({
          tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }
        });
      });
    };
    return () => {
      document.head.removeChild(script);
    }
  }, []);

  const renderLatexToCanvas = (expression: string, answer: string) => {
    const latex = `\\(\\LARGE{${expression.replace(/ /g, '\\ ')} = ${answer}}\\)`;
    setLatexExpression([...latexExpression, latex]);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = 'black';
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const offsetX = (e as React.MouseEvent).nativeEvent?.offsetX || (e as React.TouchEvent).nativeEvent.touches[0].clientX;
        const offsetY = (e as React.MouseEvent).nativeEvent?.offsetY || (e as React.TouchEvent).nativeEvent.touches[0].clientY;

        ctx.beginPath();
        ctx.moveTo(offsetX - canvas.offsetLeft, offsetY - canvas.offsetTop);
        setIsDrawing(true);
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const offsetX = (e as React.MouseEvent).nativeEvent?.offsetX || (e as React.TouchEvent).nativeEvent.touches[0].clientX;
        const offsetY = (e as React.MouseEvent).nativeEvent?.offsetY || (e as React.TouchEvent).nativeEvent.touches[0].clientY;

        ctx.strokeStyle = color;
        ctx.lineTo(offsetX - canvas.offsetLeft, offsetY - canvas.offsetTop);
        ctx.stroke();
      }
    }
  };

  const sendData = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      console.log('sending data...', `${import.meta.env.VITE_API_URL}\calculate`)
      const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/calculate`,
        data: {
          image: canvas.toDataURL('image/png'),
          dict_of_vars: dictOfVars,

        }
      });
      const resp = await response.data;
      resp.data.forEach((data: Response) => {
        if (data.assign === true) {
          // dict_of_vars[resp.result] = resp.answer;
          setDictOfVars({
            ...dictOfVars,
            [data.expr]: data.result
          });


        }
      });
      const ctx = canvas.getContext('2d');
      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          if (imageData.data[i + 3] > 0) {  // If pixel is not transparent
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      setLatexPosition({ x: centerX, y: centerY });
      resp.data.forEach((data: Response) => {
        setTimeout(() => {
          setResult({
            expression: data.expr,
            answer: data.result
          });
        }, 1000);
      });
    }
  };

  return (
    <div className=''>
      <div className=' flex flex-row justify-evenly m-3 md:m-4'>
        <Button
          onClick={() => setReset(true)}
          className='z-20 bg-black font-bold text-lg border p-5 mx-3 '
          variant='default'
          color='black'
          style={{

            color: 'rgb(30, 144, 255)', // Custom blue color
            borderColor: 'rgb(0, 102, 204)' // Custom blue border color
          }}
        >
          Reset
        </Button>
        <Group className='z-20 '>
          {SWATCHES.map((swatchColor: string) => (
            <ColorSwatch
              key={swatchColor}
              color={swatchColor}
              onClick={() => setColor(swatchColor)}  // For mouse
              onTouchStart={() => setColor(swatchColor)}  // For touch
            />
          ))}
        </Group>

        <Button
          onClick={sendData}
          className='z-20 bg-black  font-bold text-lg border flex text-right p-5 '
          variant='default'
          color='black'
          style={{

            color: 'rgb(30, 144, 255)', // Custom blue color
            borderColor: 'rgb(0, 102, 204)' // Custom blue border color
          }}
        >
          Run
        </Button>

      </div>
      <canvas
        ref={canvasRef}
        id="canvas"
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={startDrawing}
        onMouseOut={stopDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
      />
      {latexExpression && latexExpression.map((latex, index) => (
        <Draggable
          key={index}
          defaultPosition={latexPosition}
          onStop={(_, data) => setLatexPosition({ x: data.x, y: data.y })}
        >
          <div className="absolute p-2 text-white rounded shadow-md">
            <div className="latex-content">{latex}</div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default Home;
