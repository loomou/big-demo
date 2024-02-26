import { useComponents } from '../../stores/components.ts';
import { Button } from 'antd';


export const Setting = () => {
  const { currentComponentId } = useComponents();
  
  return (
    <div>
      { currentComponentId === null ? <Button>123</Button> : <Button>456</Button> }
    </div>
  );
};