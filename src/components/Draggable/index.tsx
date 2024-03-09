import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { useRef, useState } from 'react';

interface DraggableProps {
  left: number;
  top: number;
  parent: string;
  scale: number;
  id: number;
  mouseUp: (id: number, position: { left: number; top: number; }) => void;
  children: ReactNode;
}

export const Draggable = (props: DraggableProps) => {
  const {
    children,
    parent,
    scale,
    id,
    mouseUp,
    left,
    top
  } = props;
  const [position, setPosition] = useState({ left, top });
  const draggableRef = useRef<HTMLDivElement>(null);
  
  const onMouseDown = (e: ReactMouseEvent) => {
    const wrapElem = document.getElementsByClassName(parent)[0];
    const canvas = document.getElementById('canvas');
    
    const mouseClientLeft = e.clientX;
    const mouseClientTop = e.clientY;
    
    let dragElemPositionLeft = 0;
    let dragElemPositionTop = 0;
    if (draggableRef.current) {
      const dragElemRect = draggableRef.current.getBoundingClientRect();
      dragElemPositionLeft = dragElemRect.left;
      dragElemPositionTop = dragElemRect.top;
    }
    
    let wrapScrollLeft = 0;
    let wrapScrollTop = 0;
    if (wrapElem) {
      wrapScrollLeft = wrapElem.scrollLeft;
      wrapScrollTop = wrapElem.scrollTop;
    }
    
    const mousePositionLeft = mouseClientLeft - dragElemPositionLeft;
    const mousePositionTop = mouseClientTop - dragElemPositionTop;
    
    let moveLeft = 0;
    let moveTop = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      moveLeft = (e.clientX - mousePositionLeft - 300 + wrapScrollLeft) / scale;
      moveTop = (e.clientY - mousePositionTop - 50 + wrapScrollTop) / scale;
      
      setPosition({
        left: moveLeft,
        top: moveTop
      });
    };
    
    const onMouseUp = () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', onMouseUp);
      }
      
      mouseUp && mouseUp(id, {
        left: moveLeft,
        top: moveTop
      });
    };
    
    if (canvas) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseup', onMouseUp);
    }
  };
  
  return (
    <div
      ref={ draggableRef }
      id={ `drag-${ id }` }
      style={ {
        position: 'absolute',
        ...position
      } }
      onMouseDown={ onMouseDown }
    >
      { children }
    </div>
  );
};