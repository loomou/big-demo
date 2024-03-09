import { create } from 'zustand';
import { DefaultPropsMap } from '../components';
import { transformToLink } from '../../utils';
import { cloneDeep } from 'lodash-es';
import { dbWrapper } from '../../utils/IndexedDB/IndexedDB.ts';

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
  getHistoryRecord: (isPrev: boolean) => void;
  deleteComponent: () => void;
}

export const useComponents = create<State & Action>((set, get) => ({
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
  addComponent: async (component) => {
    component = {
      ...component,
      props: DefaultPropsMap[component.name](),
      id: Date.now()
    };
    const { components } = get();
    await dbWrapper.setHistoryRecord([...components, component]);
    set({ components: [...components, component] });
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
  updateComponentPosition: async (id, position) => {
    const { components } = get();
    const findComponent = components.find((component) => component.id === id);
    if (findComponent) {
      findComponent.position = { ...position };
    }
    set({ components: [...components] });
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
  },
  getHistoryRecord: async (isPrev) => {
    const { setCurrentComponent, setCurrentComponentId } = get();
    const components = isPrev ? await dbWrapper.getPrevHistoryRecord() : await dbWrapper.getNextHistoryRecord();
    if (!isPrev && !components) return;
    setCurrentComponent(null);
    setCurrentComponentId(null);
    set(() => {
      return { components: [...components] };
    });
  },
  deleteComponent: async () => {
    const { currentComponentId, components } = get();
    if (!currentComponentId) return;
    const { setCurrentComponent, setCurrentComponentId } = get();
    const filterComponents = components.filter((component) => component.id !== currentComponentId);
    await dbWrapper.setHistoryRecord(filterComponents);
    setCurrentComponent(null);
    setCurrentComponentId(null);
    set({
      components: [...filterComponents]
    });
  },
  addHistoryRecord: async () => {
  
  }
}));