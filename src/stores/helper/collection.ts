import _ from 'lodash';
import { SimpleStore } from './simple-store';

interface Options {
  params?: object,
  [key: string]: any
}

type Params = {
  offset: number,
  per_page: number
  [propName: string]: any;
}

export class Collection extends SimpleStore {
  constructor(opts: Options = { params: {} }) {
    super();
    Object.assign(this, _.omit(opts, ['params']));
    this.params = Object.assign({}, this.defaultParams, opts.params);
  }

  private defaultParams: Params = {
    offset: 0,
    per_page: 50,
  };

  data: any[] = [];
  params: Params = {
    offset: 0,
    per_page: 50,
  };
  meta = { total: 0, page: 1, offset: 0, per_page: 50, next_page: '', prev_page: '' };

  get isComplete() {
    return this.isFulfilled && !this.meta.next_page;
  }

  get isEmpty() {
    return this.isFulfilled && this.data.length === 0;
  }

  // params 为零时调用参数，如需 fetchMoreData 中使用，直接修改 this.params
  async fetchData(params?: {[key: string]: any}, isForce: boolean = false) {
    const { data, meta } = await this.fetching({ ...this.params, ...params }, isForce);
    this.meta = meta;
    this.data = data;
  }

  async fetchMoreData() {
    if (this.isFetching || this.isComplete) {
      return ;
    }
    this.params.offset = this.data.length;
    const { data, meta } = await this.fetching(this.params);
    this.meta = meta;
    this.data.push(...data as Array<Object>);
  }

  resetData() {
    this.isFulfilled = false;
    this.data = [];
  }

  unshift(item: any) {
    this.data.unshift(item);
    this.meta.total += 1;
  }

  findItemById(id: number | string) {
    return this.data.find((item: any) => Number(item.id) === Number(id));
  }

  removeItemById(id: number | string) {
    const index = this.data.findIndex((item: any) => Number(item.id) === Number(id));
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  replaceItem(newItem: any) {
    const index = this.data.findIndex((item: any) => Number(item.id) === Number(newItem.id));
    if (index > -1) {
      this.data.splice(index, 1, newItem);
    }
  }
}
