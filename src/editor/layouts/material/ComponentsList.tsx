import { components } from '../../../mock/data.ts';
import { Card } from 'antd';
import { useComponents } from '../../stores/components.ts';

export const ComponentsList = () => {
  const { setCurrentComponent } = useComponents();
  
  const onDragStart = (component: Component) => {
    setCurrentComponent(component);
  };
  
  return (
    <div className='material-list'>
      { components.map((component) => {
        return (
          <div className="component-item-wrap"
               key={ component.name }
               draggable
               onDragStart={ () => onDragStart(component) }
          >
            <Card size="small">
              <div className='component-name-wrap'>
                { component.name }
              </div>
            </Card>
          </div>
        );
      }) }
    </div>
  );
};