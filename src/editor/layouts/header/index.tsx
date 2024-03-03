import './index.css';
import { Button, Space } from 'antd';
import { useComponents } from '../../stores/components.ts';

export const Header = () => {
  const { components } = useComponents();
  
  const goto = () => {
    localStorage.setItem('preview', JSON.stringify(components));
    window.open(`#/preview`, '_blank', 'noreferrer');
  };
  
  return (
    <div className="header">
      <div className="logo">Big</div>
      <div>
        <Space>
          <Button type="primary" onClick={ goto }>
            预览
          </Button>
          <Button type="primary">保存</Button>
        </Space>
      </div>
    </div>
  );
};