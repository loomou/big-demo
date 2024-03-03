import type { ColumnConfig } from '@ant-design/charts';
import { Column } from '@ant-design/charts';
import { memo } from 'react';

export const BColumn = memo((props: ColumnConfig) => {
  console.log('column update')
  return (
    <div style={ {
      width: '400px',
      height: '400px'
    } }>
      <Column { ...props } autoFit/>
    </div>
  );
});