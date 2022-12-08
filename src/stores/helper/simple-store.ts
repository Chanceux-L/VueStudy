import Observable from './observable';

interface Data {
  data?: Object | Array<Object>,
  mate?: Object,
  [key: string]: any,
}

export class SimpleStore extends Observable {
  private fetchPromies: Promise<any> | null = null;

  isFetching = false;
  isRejected = false;
  isFulfilled = false;

  // fetch 需要自行定义好
  fetch(params?: any): Promise<Data | void> {
    return Promise.resolve(params);
  }

  fetchData(params?: Object, isForce: boolean = false) {
    return this.fetching(params, isForce);
  }

  tryFetchData(params?: Object, isForce: boolean = false) {
    return !this.isFulfilled && this.fetchData(params, isForce);
  }

  async fetching(params?: Object, isForce: boolean = false) {
    if (!this.isFetching || isForce) {
      this.fetchPromies = this.fetch(params);
    }
    this.isFetching = true;
    try {
      const res = await this.fetchPromies;
      Object.assign(this, {
        isFetching: false,
        isRejected: false,
        isFulfilled: true,
      });
      return res;
    } catch (err) {
      Object.assign(this, {
        isFetching: false,
        isRejected: true,
      });
      throw err;
    }
  }
}
