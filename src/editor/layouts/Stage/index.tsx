import './index.css';
import type { DragEvent, ReactNode } from 'react';
import { CanvasBG } from './CanvasBG.tsx';
import { useState, createElement } from 'react';
import { Slider } from 'antd';
import { useComponents } from '../../stores/components.ts';
import { BButton } from '../../components/BButton';
import { DemoColumn } from '../../components/BChart';

const ComponentMap: { [key: string]: any } = {
  Button: BButton,
  Column: DemoColumn
};

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
  // const currentComponent = useComponents((state) => state.currentComponent);
  const { currentComponent, components, addComponent, setCurrentComponent } = useComponents();
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
  
  return (
    <>
      <div className="canvas-wrap">
        <div className="canvas"
             style={ {
               transform: `scale(${ canvasScale }, ${ canvasScale })`,
             } }
             onDragOver={ onDragOver }
             onDrop={ onDrop }
        >
          <CanvasBG/>
          { components.map((component, index) => {
            return <div
              key={ index }
              style={ {
                position: 'absolute',
                top: component?.position?.top,
                left: component?.position?.left
              } }>
              { renderComponents(component) }
              <div className="component-mask"></div>
            </div>;
          }) }
        </div>
      </div>
      <div className="slider-wrap">
        <Slider defaultValue={ canvasScale * 100 } max={ 200 } onChange={ changeScale }/>
      </div>
    </>
  );
};