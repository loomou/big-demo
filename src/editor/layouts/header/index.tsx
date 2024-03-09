import './index.css';
import { Button, Space } from 'antd';
import { useComponents } from '../../stores/components.ts';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';

export const Header = () => {
  const { components, getHistoryRecord, deleteComponent} = useComponents();
  
  const withdraw = () => {
    getHistoryRecord(true);
  };
  
  const redo = () => {
    getHistoryRecord(false);
  };
  
  const deleteCom = () => {
    deleteComponent();
  };
  
  const goto = () => {
    localStorage.setItem('preview', JSON.stringify(components));
    window.open(`#/preview`, '_blank', 'noreferrer');
  };
  
  return (
    <div className="header">
      <div className="logo">Big</div>
      <div>
        <Space>
          <Button icon={ <ArrowLeftOutlined/> } onClick={ withdraw }></Button>
          <Button icon={ <ArrowRightOutlined/> } onClick={ redo }></Button>
          <Button icon={ <DeleteOutlined/> } onClick={ deleteCom }></Button>
        </Space>
      </div>
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