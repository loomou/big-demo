import './index.css';
import type { DragEvent, ReactNode } from 'react';
import { useState, createElement } from 'react';
import { CanvasBG } from './CanvasBG.tsx';
import { Slider } from 'antd';
import { useComponents } from '../../stores/components.ts';
import { ComponentMap } from '../../components';

const renderComponents = (component: Component): ReactNode => {
  if (!component) {
    return null;
  }
  
  return createElement(
    ComponentMap[component.name],
    { key: component.id, id: component.id, ...component.props }
  );
};

export const Stage = () => {
  const { currentComponent, components, addComponent, setCurrentComponent, setCurrentComponentId } = useComponents();
  const [canvasScale, setScale] = useState(1);
  
  const changeScale = (value: number) => {
    setScale(value / 100);
  };
  
  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const stageWrap = document.getElementsByClassName('stage-wrap');
    const scrollTop = stageWrap[0].scrollTop;
    const scrollLeft = stageWrap[0].scrollLeft;
    const endLeft = (e.clientX - 300 + scrollLeft) / canvasScale;
    const endTop = (e.clientY - 50 + scrollTop) / canvasScale;
    if (currentComponent !== null) {
      currentComponent.position = {
        top: endTop,
        left: endLeft
      };
      addComponent(currentComponent);
    }
    setCurrentComponent(null);
  };
  
  const setCurrent = (id: number) => {
    setCurrentComponentId(id);
    setCurrentComponent(components.find((component) => component.id === id) || null);
  };
  
  const clearCurrent = () => {
    setCurrentComponent(null);
    setCurrentComponentId(null);
  };
  
  return (
    <>
      <div className="canvas-wrap">
        <div className="canvas"
             style={ {
               transform: `scale(${ canvasScale }, ${ canvasScale })`,
             } }
             onDragOver={ onDragOver }
             onDrop={ onDrop }
             onClick={ clearCurrent }
        >
          <CanvasBG/>
          {
            components.map((component) => {
              return <div
                key={ component.id }
                style={ {
                  position: 'absolute',
                  top: component?.position?.top,
                  left: component?.position?.left
                } }
                onClick={ (e) => {
                  e.stopPropagation();
                  setCurrent(component.id);
                } }
              >
                { renderComponents(component) }
                {/*<div className="component-mask"></div>*/ }
              </div>;
            })
          }
        </div>
      </div>
      <div className="slider-wrap">
        <Slider defaultValue={ canvasScale * 100 } max={ 200 } onChange={ changeScale }/>
      </div>
    </>
  );
};