import { lazy } from 'react';
import { LoadRemoteComponent } from '../../components/LoadRemoteComponent';

import { BButton } from './BButton';
import { BColumn } from './BColumn';
import { BSelect } from './BSelect';
import { BButtonDefaultProps, BButtonProps } from './BButton/BButtonProps.ts';
import { BColumnDefaultProps, BColumnProps } from './BColumn/BColumnProps.ts';
import { BSelectDefaultProps, BSelectProps } from './BSelect/BSelectProps.ts';
import { PieProps, PieDefaultProps } from './RemoteTest/RemoteTestProps.ts';

export const ComponentMap: { [key: string]: any } = {
  Button: BButton,
  Select: BSelect,
  Column: BColumn,
  Pie: lazy(() => LoadRemoteComponent('https://cdn.jsdelivr.net/npm/big-demo-remote-components-lib@1.0.0/dist/bundle.umd.js'))
};

export const DefaultPropsMap: any = {
  Button: BButtonDefaultProps,
  Select: BSelectDefaultProps,
  Column: BColumnDefaultProps,
  Pie: PieDefaultProps
};

export const PropsMap: any = {
  Button: BButtonProps,
  Select: BSelectProps,
  Column: BColumnProps,
  Pie: PieProps
};