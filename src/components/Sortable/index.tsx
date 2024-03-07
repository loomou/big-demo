import type { ReactNode, DragEvent } from 'react';
import { useRef } from 'react';

interface SortableProps {
  update: (startId: number, overId: number) => void;
  children: ReactNode;
}

export const Sortable = (props: SortableProps) => {
  const { children, update } = props;
  
  const moveIdRef = useRef<string | null>(null)
  
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    const dragId = (e.target as HTMLElement).dataset.dragId;
    if (dragId) {
      moveIdRef.current = dragId;
    }
  };
  const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    const enterId = (e.target as HTMLElement).dataset.dragId;
    if (enterId) {
      if (enterId === moveIdRef.current) {
        return;
      }
      update(Number(moveIdRef.current), Number(enterId));
    }
  };
  const onDragEnd = () => {
    moveIdRef.current = null;
  };
  
  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  
  return (
    <div
      onDragStart={ onDragStart }
      onDragEnter={ onDragEnter }
      onDragOver={ onDragOver }
      onDrop={ onDragEnd }
    >
      { children }
    </div>
  );
};