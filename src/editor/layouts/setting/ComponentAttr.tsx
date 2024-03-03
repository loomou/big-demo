import { Form, Input, Select, Switch } from 'antd';
import { useComponents } from '../../stores/components.ts';
import { PropsMap } from '../../components';
import { useEffect } from 'react';
import { parseObj } from '../../../utils';

export const ComponentAttr = () => {
  const { currentComponent, currentComponentId, updateComponentProps } = useComponents();
  
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (currentComponent && currentComponent.props) {
      form.setFieldsValue(parseObj(currentComponent.props));
    } else {
      form.setFieldsValue(undefined);
    }
  }, [currentComponent]);
  
  function renderFormElement(setting: any) {
    const { type } = setting;
    
    if (type === 'select') {
      const { options } = setting;
      return (
        <Select options={ options }/>
      );
    } else if (type === 'input') {
      return (
        <Input/>
      );
    } else if (type === 'switch') {
      return (
        <Switch/>
      );
    }
  }
  
  function valueChange(changeValues: any) {
    if (currentComponentId) {
      updateComponentProps(changeValues);
    }
  }
  
  if (!currentComponent) return null;
  
  return (
    <div style={ {
      padding: '20px'
    } }>
      <Form
        form={ form }
        labelCol={ { span: 8 } }
        wrapperCol={ { span: 14 } }
        onValuesChange={ valueChange }
      >
        {
          (PropsMap[currentComponent.name] || []).map((setting: any, index: number) => {
            return (
              <Form.Item name={ setting.name } label={ setting.label } key={ index }>
                { renderFormElement(setting) }
              </Form.Item>
            );
          })
        }
      </Form>
    </div>
  );
};