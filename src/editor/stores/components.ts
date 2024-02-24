import { create } from 'zustand';

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
  components: Component[];
}

interface Action {
  setCurrentComponent: (component: Component | null) => void;
  /**
   * 添加组件
   * @param component 组件属性
   * @returns
   */
  addComponent: (component: Component) => void;
}

export const useComponents = create<State & Action>((set) => ({
  currentComponent: null,
  components: [],
  setCurrentComponent: (component) => {
    set(() => ({
      currentComponent: component
    }));
  },
  addComponent: (component) => {
    set((state) => {
      return { components: [...state.components, component] };
    });
  }
}));