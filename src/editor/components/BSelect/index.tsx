import type { SelectProps } from 'antd';
import { Select as AntdSelect } from 'antd';
import { memo } from 'react';

export const BSelect = memo((props: SelectProps) => {
  return (
    <AntdSelect { ...props }></AntdSelect>
  );
});