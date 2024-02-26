import type { SelectProps } from 'antd';
import { Select as AntdSelect } from 'antd';

export const BSelect = (props: SelectProps) => {
  return (
    <AntdSelect { ...props }></AntdSelect>
  );
};