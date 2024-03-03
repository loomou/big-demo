import { useComponents } from '../../stores/components.ts';
import { ComponentAttr } from './ComponentAttr.tsx';

export const Setting = () => {
  const { currentComponentId } = useComponents();

  return (
    <div>
      { currentComponentId ? <ComponentAttr/> : <div>背景</div> }
    </div>
  );
};