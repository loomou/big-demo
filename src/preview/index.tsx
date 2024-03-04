import './index.css';
import type { ReactNode } from 'react';
import { ComponentMap } from '../editor/components';
import { createElement } from 'react';

const renderComponents = (component: Component): ReactNode => {
  if (!component) {
    return null;
  }
  
  return createElement(
    ComponentMap[component.name],
    { key: component.id, id: component.id, ...component.props }
  );
};

export const Preview = () => {
  const preview = localStorage.getItem('preview');
  const components: Component[] = preview ? JSON.parse(preview) : [];
  
  return (
    <div className="preview-container">
      {
        components.map((component) => {
          return <div
            key={ component.id }
            style={ {
              position: 'absolute',
              top: component?.position?.top,
              left: component?.position?.left
            } }
          >
            { renderComponents(component) }
          </div>;
        })
      }
    </div>
  );
};