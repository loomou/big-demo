import { components } from '../../../mock/data.ts';
import { Card } from 'antd';
import { useComponents } from '../../stores/components.ts';
import { cloneDeep } from 'lodash-es';

export const ComponentsList = () => {
  const { setCurrentComponent } = useComponents();
  
  const onDragStart = (component: Component) => {
    setCurrentComponent(cloneDeep(component));
  };
  
  return (
    <div style={ {
      display: 'flex'
    } }>
      { components.map((component) => {
        return (
          <div key={ component.name } draggable onDragStart={ () => onDragStart(component) }>
            <Card size="small">
              { component.name }
            </Card>
          </div>
        );
      }) }
    </div>
  );
};