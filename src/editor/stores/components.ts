import { create } from 'zustand';
import { DefaultPropsMap } from '../components';

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
  props: any;
  /**
   * 子组件
   */
  children?: Component[];
  position?: Position;
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
  }
}));