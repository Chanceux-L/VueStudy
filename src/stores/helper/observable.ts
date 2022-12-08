import { reactive } from 'vue';
import _ from 'lodash';

export default class Observable {
  static create<T>(state?: Object): T {
    const instance: T | any = new this();
    if (state) {
      _.forEach(Object.getOwnPropertyDescriptors(state), (descriptor, key) => {
        if ('value' in descriptor) {
          instance[key] = descriptor.value;
        } else {
          Object.defineProperty(instance, key, descriptor);
        }
      });
    }
    return reactive(instance);
  }
}
