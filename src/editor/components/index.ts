import { BButton } from './BButton';
import { BColumn } from './BColumn';
import { BSelect } from './BSelect';
import { BButtonDefaultProps } from './BButton/BButtonProps.ts';
import { BColumnDefaultProps } from './BColumn/BColumnProps.ts';
import { BSelectDefaultProps } from './BSelect/BSelectProps.ts';

export const ComponentMap: { [key: string]: any } = {
  Button: BButton,
  Select: BSelect,
  Column: BColumn
};

export const DefaultPropsMap: any = {
  Button: BButtonDefaultProps,
  Select: BSelectDefaultProps,
  Column: BColumnDefaultProps
}