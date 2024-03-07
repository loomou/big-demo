import { create } from 'zustand';
import { DefaultPropsMap } from '../components';
import { transformToLink } from '../../utils';
import { cloneDeep } from 'lodash-es';

interface Position {
  top: number;
  left: number;
}

export interface Component {
  /**
   * 组件唯一标识
   */
  id: number;
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件属性
   */
  props?: any;
  /**
   * 子组件
   */
  children?: Component[];
  position?: Position;
  isRemote?: boolean;
}

interface State {
  currentComponent: Component | null;
  currentComponentId: number | null,
  components: Component[];
}

interface Action {
  setCurrentComponent: (component: Component | null) => void;
  setCurrentComponentId: (id: number | null) => void;
  /**
   * 添加组件
   * @param component 组件属性
   * @returns
   */
  addComponent: (component: Component) => void;
  updateComponentProps: (props: any) => void;
  updateComponentPosition: (id: number, position: { left: number, top: number }) => void;
  updateLayer: (startId: number, overId: number) => void;
}

export const useComponents = create<State & Action>((set) => ({
  currentComponent: null,
  currentComponentId: null,
  components: [],
  setCurrentComponent: (component) => {
    set(() => ({
      currentComponent: component
    }));
  },
  setCurrentComponentId: (id) => {
    set(() => ({
      currentComponentId: id
    }));
  },
  addComponent: (component) => {
    set((state) => {
      component = {
        ...component,
        props: DefaultPropsMap[component.name](),
        id: Date.now()
      };
      return { components: [...state.components, component] };
    });
  },
  updateComponentProps: (props) => {
    set((state) => {
      if (state.currentComponent) {
        const key = Object.keys(props)[0];
        const currentProps = cloneDeep(state.currentComponent.props);
        if (key.includes('.')) {
          props = transformToLink(key.split('.'), currentProps, props[key]);
        }
        state.currentComponent.props = {
          ...state.currentComponent.props,
          ...props
        };
      }
      return { components: [...state.components] };
    });
  },
  updateComponentPosition: (id, position) => {
    set((state) => {
      const component = state.components.find((item) => item.id === id);
      if (component) {
        component.position = { ...position };
      }
      return { components: [...state.components] };
    });
  },
  updateLayer: (startId, overId) => {
    set((state) => {
      const startIndex = state.components.findIndex((item) => item.id === startId);
      const overIndex = state.components.findIndex((item) => item.id === overId);
      if (startIndex > -1 && overIndex > -1) {
        if (overIndex > startIndex) {
          state.components.splice(overIndex + 1, 0, state.components[startIndex]);
          state.components.splice(startIndex, 1);
        }
        if (overIndex < startIndex) {
          state.components.splice(overIndex, 0, state.components[startIndex]);
          state.components.splice(startIndex + 1, 1);
        }
      }
      return { components: [...state.components] };
    });
  }
}));