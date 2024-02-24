import './index.css';
import { Segmented } from 'antd';
import { useState } from 'react';
import { Layer } from './Layer.tsx';
import { ComponentsList } from './ComponentsList.tsx';

export const Material = () => {
  const [key, setKey] = useState('组件');
  
  return (
    <div className="material">
      <Segmented
        block
        size="large"
        options={ ['组件', '图层'] }
        onChange={ setKey }
      />
      <div className="material-list-wrap">
        {
          key === '组件' ? <ComponentsList/> : <Layer/>
        }
      </div>
    </div>
  );
};