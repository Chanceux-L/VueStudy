
import _ from 'lodash';
export interface IData {
  time: number,
  val: any,
}

interface OData {
  [key: string]: IData
}

class StorageParent {
  constructor(name: string, { isArrayData = false, duration = null }: { isArrayData?: boolean, duration?: number | null }) {
    this.name = name;
    try {
      this.data = JSON.parse(localStorage.getItem(name) || '');
    } catch (e) {
      this.data = isArrayData ? [] : {};
    }
    this.isArrayData = isArrayData;
    this.setDuration(duration);
    this.overdueData = this.checkOverdue();
  }

  name: string
  data: OData | IData[]
  duration: number | null = null
  isArrayData: boolean
  overdueData: OData | IData[]

  set(key: string, data: any) {
    (this.data as OData)[key] = {
      val: data,
      time: Date.now(),
    };
    this.saveStorage();
  }

  get(key: string) {
    this.checkOverdue();
    const data = (this.data as OData)[key];
    return data ? data.val : null;
  }

  // 每次登陆duration必然有值，此时给存起来；防止实例化的时候duration为undefined
  setDuration(val: number | null) {
    if (val) {
      this.duration = val;
      localStorage.setItem(this.name + '_DURATION', String(this.duration));
    } else {
      this.duration = Number(localStorage.getItem(this.name + '_DURATION'));
    }
  }

  remove(key: string) {
    if (key in this.data) {
      const data = (this.data as OData)[key];
      delete (this.data as OData)[key];
      this.saveStorage();
      return data;
    }
  }

  clear() {
    this.data = this.isArrayData ? [] : {};
    localStorage.removeItem(this.name);
  }

  saveStorage = _.debounce(() => {
    localStorage.setItem(this.name, JSON.stringify(this.data));
  }, 100)

  // 检查过期
  checkOverdue() {
    const { duration, isArrayData } = this;
    if (!duration) { return false; }
    const newData = isArrayData ? [] : {};
    const overdueData = isArrayData ? [] : {};
    _.forEach(this.data, (value: any | IData, key) => {
      const startTime = value.time;
      if ((Date.now() - startTime) < (this.duration as number)) {
        isArrayData ? (newData as IData[]).push(value) : (newData as OData)[key] = value;
      } else {
        isArrayData ? (overdueData as IData[]).push(value) : (overdueData as OData)[key] = value;
      }
    });
    if (!_.isEqual(this.data, newData)) {
      this.data = newData;
      this.saveStorage();
    }
    return overdueData;
  }
}

export class Storage extends StorageParent {
  constructor(name: string, duration: number) {
    super(name, { duration });
  }
}

export class ArrayStorage extends StorageParent {
  constructor(name: string, { maxLength, duration, isRepeat = true }: { maxLength?: number, duration?: number, isRepeat?: boolean } = {}) {
    super(name, { duration, isArrayData: true });
    this.maxLength = maxLength || Infinity;
    this.isRepeat = isRepeat;
    this.initMethods();
  }

  maxLength: number = Infinity
  isRepeat: boolean = true
  push: Function = function<T>(args: T): T { return args; }
  pop: Function = function<T>(args: T): T { return args; }
  shift: Function = function<T>(args: T): T { return args; }
  unshift: Function = function<T>(args: T): T { return args; }
  splice: Function = function<T>(args: T): T { return args; }
  sort: Function = function<T>(args: T): T { return args; }
  reverse: Function = function<T>(args: T): T { return args; }

  initMethods() {
    [
      'push',
      'pop',
      'shift',
      'unshift',
      'splice',
      'sort',
      'reverse',
    ].map((method) => {
      this[method] = (...args: any[] | ((a: IData, b: IData) => number)[]) => {
        let newData: IData | undefined = {
          val: (args as  any[])[0],
          time: Date.now(),
        };
        if (method === 'push' || method === 'unshift') {
          (this.data as IData[])[method](newData);
        }
        if (method === 'splice') {
          newData.val = (args as  any[])[2];
          (this.data as IData[])[method]((args as  any[])[0], (args as  any[])[1], newData);
        }
        if (method === 'pop' || method === 'shift') {
          newData = (this.data as IData[])[method]();
        }
        if (method === 'sort' || method === 'reverse') {
          (this.data as IData[])[method](...args as ((a: IData, b: IData) => number)[]);
        }
        !this.isRepeat && this.deduplication();
        (this.data as IData[]).splice(this.maxLength);
        this.saveStorage();
        return newData && newData.val;
      };
    });
  }

  get() {
    return (this.data as IData[]).map(item => item.val);
  }

  deduplication() {
    const obj: OData = {};
    const newData: IData[] = []; // 因为 对象无法保证数组的顺序，所以使用一个新数组保存
    (this.data as IData[]).map(item => {
      if (!obj[item.val]) {
        newData.push(item);
        obj[item.val] = item;
      }
    });
    this.data = newData;
    this.saveStorage();
  }
}
