import { BButton } from './BButton';
import { BColumn } from './BColumn';
import { BSelect } from './BSelect';
import { BButtonDefaultProps, BButtonProps } from './BButton/BButtonProps.ts';
import { BColumnDefaultProps, BColumnProps } from './BColumn/BColumnProps.ts';
import { BSelectDefaultProps, BSelectProps } from './BSelect/BSelectProps.ts';

export const ComponentMap: { [key: string]: any } = {
  Button: BButton,
  Select: BSelect,
  Column: BColumn
};

export const DefaultPropsMap: any = {
  Button: BButtonDefaultProps,
  Select: BSelectDefaultProps,
  Column: BColumnDefaultProps
};

export const PropsMap: any = {
  Button: BButtonProps,
  Select: BSelectProps,
  Column: BColumnProps
};