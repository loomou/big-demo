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
  deleteComponent: () => void;
  getHistoryRecord: (isPrev: boolean) => void;
  addHistoryRecord: (components?: Component[]) => Promise<void>;
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
    const { addHistoryRecord } = get();
    component = {
      ...component,
      props: DefaultPropsMap[component.name](),
      id: Date.now()
    };
    const { components } = get();
    await addHistoryRecord([...components, component]);
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
    const { components, addHistoryRecord } = get();
    const findComponent = components.find((component) => component.id === id);
    if (findComponent) {
      findComponent.position = { ...position };
    }
    await addHistoryRecord(components);
    set({ components: [...components] });
  },
  updateLayer: async (startId, overId) => {
    const { components } = get();
    const startIndex = components.findIndex((item) => item.id === startId);
    const overIndex = components.findIndex((item) => item.id === overId);
    if (startIndex > -1 && overIndex > -1) {
      if (overIndex > startIndex) {
        components.splice(overIndex + 1, 0, components[startIndex]);
        components.splice(startIndex, 1);
      }
      if (overIndex < startIndex) {
        components.splice(overIndex, 0, components[startIndex]);
        components.splice(startIndex + 1, 1);
      }
    }
    set({ components: [...components] });
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
    const { currentComponentId, components, addHistoryRecord } = get();
    if (!currentComponentId) return;
    const { setCurrentComponent, setCurrentComponentId } = get();
    const filterComponents = components.filter((component) => component.id !== currentComponentId);
    await addHistoryRecord(filterComponents);
    setCurrentComponent(null);
    setCurrentComponentId(null);
    set({
      components: [...filterComponents]
    });
  },
  addHistoryRecord: async (componentsRecord) => {
    const { components } = get();
    console.log(components, componentsRecord);
    await dbWrapper.setHistoryRecord(componentsRecord || components);
  }
}));