import type { ColumnConfig } from '@ant-design/charts';
import { Column } from '@ant-design/charts';

export const BColumn = (props: ColumnConfig) => {
  return (
    <div style={ {
      width: '400px',
      height: '400px'
    } }>
      <Column { ...props } />
    </div>
  );
};