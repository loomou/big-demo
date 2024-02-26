import type { ButtonProps } from 'antd';
import { Button as AntdButton } from 'antd';

export const BButton = (props: ButtonProps) => {
  return (
    <AntdButton { ...props }>{ props.name }</AntdButton>
  );
};