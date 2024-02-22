import './index.css';
import { Button, Space } from 'antd';

export const Header = () => {
  return (
    <div className="header">
      <div className="logo">Big</div>
      <div>
        <Space>
          <Button type="primary">预览</Button>
          <Button type="primary">保存</Button>
        </Space>
      </div>
    </div>
  );
};