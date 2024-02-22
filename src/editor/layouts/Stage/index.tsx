import './index.css';
import { CanvasBG } from './CanvasBG.tsx';
import { useState } from 'react';
import { Slider } from 'antd';

export const Stage = () => {
  const [canvasScale, setScale] = useState(1);
  
  const changeScale = (value: number) => {
    setScale(value / 100);
  };
  
  return (
    <>
      <div className="canvas-wrap">
        <div className="canvas" style={ {
          transform: `scale(${ canvasScale }, ${ canvasScale })`,
          transformOrigin: '0 0'
        } }>
          <CanvasBG/>
        </div>
        <div style={ {
          width: '100px',
          position: 'fixed',
          right: '320px',
          bottom: '20px'
        } }>
          <Slider defaultValue={ canvasScale * 100 } max={ 200 } onChange={ changeScale }/>
        </div>
      </div>
    </>
  );
};