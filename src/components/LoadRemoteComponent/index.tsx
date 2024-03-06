import React from 'react';
import { Pie } from '@ant-design/charts';

export const LoadRemoteComponent = async (url: string) => {
  const script = await fetch(url).then(res => res.text());
  
  const module = {
    exports: {}
  };
  const exports = {};
  
  const require = (id: string) => {
    if (id === 'react') {
      return React;
    }
    if (id === '@ant-design/charts') {
      return { Pie };
    }
  };
  
  const func = new Function('module', 'exports', 'require', script);
  
  func(module, exports, require);
  
  return { default: module.exports } as any;
};

