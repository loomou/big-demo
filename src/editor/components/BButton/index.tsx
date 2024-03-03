import type { ButtonProps } from 'antd';
import { Button as AntdButton } from 'antd';
import { memo } from 'react';

interface BButtonProps extends ButtonProps {
  text: string;
}

export const BButton = memo((props: BButtonProps) => {
  return (
    <AntdButton { ...props }>{ props.text }</AntdButton>
  );
});