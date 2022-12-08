/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createApp,
  h,
  reactive,
} from 'vue';

let instance: any;

interface Options {
  value?: number,
  max?: number,
  visible?: boolean,
  showMask?: boolean,
}

export default function createLoadingComponent(options: Options = {}) {
  // TODO: 等待实现
  // if (instance) {
  //   Object.assign(instance.data, { visible: true }, options);
  //   return instance;
  // }
  // const data = reactive({
  //   value: 1,
  //   max: 2,
  //   visible: true,
  //   delayed: 600,
  //   ...options,
  // });

  // const ElLoadingComponent = {
  //   name: 'LoadingComponent',
  //   setup() {
  //     return () => {
  //       return h(LoadingComponent, data);
  //     };
  //   }
  // };
  // const contentDOM = document.createElement('div');
  // document.body.appendChild(contentDOM);
  // const vm = createApp(ElLoadingComponent).use(BootstrapVue3).mount(contentDOM);
  // return instance = {
  //   vm,
  //   data
  // };
}
