import { useComponents } from '../../stores/components.ts';
import { ErrorBoundary } from 'react-error-boundary';
import { Card, Space } from 'antd';
import { BarChartOutlined, PieChartOutlined, BorderOutlined } from '@ant-design/icons';
import { Sortable } from '../../../components/Sortable';

const renderIcon = (name: string) => {
  switch (name) {
    case 'Column':
      return <BarChartOutlined/>;
    case 'Pie':
      return <PieChartOutlined/>;
    default:
      return <BorderOutlined/>;
  }
};

export const Layer = () => {
  const { components, updateLayer } = useComponents();
  
  return (
    <div>
      <Sortable update={updateLayer}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          {
            components.map((component) => (
              <ErrorBoundary fallback={ <div>error</div> } key={ component.id }>
                <div
                  draggable
                  data-drag-id={ component.id }
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Space data-drag-id={ component.id }>
                    <Card size="small">
                      { renderIcon(component.name) }
                    </Card>
                    <div style={ { userSelect: 'none' } }>{ component.name + component.id }</div>
                  </Space>
                </div>
              </ErrorBoundary>
            ))
          }
        </div>
      </Sortable>
    </div>
  );
};