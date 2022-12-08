import _ from 'lodash';
import qs from 'qs';
import axios, { AxiosRequestConfig } from 'axios';
import decoder from './decoder';
import urlJoin from 'url-join';
import { authStore } from '@/stores';
// import createLoadingComponent from './loading';
// interface LoadingData {
//   maxCount: number,
//   loadingInstance: any,
//   loadingSet: Set<any>,
// }

// const loadingData: LoadingData = {
//   maxCount: 0,
//   loadingInstance: null,
//   loadingSet: new Set(),
// };

const request = axios.create({
  baseURL: urlJoin(String(process.env.VUE_APP_WEB_API), '/app_api/v1'),
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer(params: object) {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

request.interceptors.request.use(config => {
  if (config.headers && !config.headers['Authorization']) {
    config.headers['Authorization'] = authStore.access_token;
  }
  handleLoadingStart(config);
  return config;
});

request.interceptors.response.use(
  (res: any) => {
    res.isResponse = true;
    res.meta = {};
    handleLoadingStop(res.config);
    _.forEach(res.headers, (v, k) => {
      if (/^x-/i.test(k)) {
        const key = _.snakeCase(k.replace(/^x-/i, ''));
        res.meta[key] = decoder(v);
      }
    });
    return res;
  },
  async (err: { message: any; code: number; status: any; [key: string]: any }) => {
    const response = _.get(err, 'response', {});
    handleLoadingStop(err.config);
    if (response.data) {
      const { error_message, messages, error, code } = response.data;
      err.message = error_message || messages || error || err.message;
      err.code = code;
    }
    err.status = response.status;
    if (response.status === 401) {
      _.set(err.config, 'headers[Authorization]', '');
      await authStore.signOut();
      return Promise.reject(err);
    }
    if (_.get(err.config.loading, 'silent') !== true) {
      // TODO:
      // alert({ content: err.message });
    }
    return Promise.reject(err);
  }
);

function handleLoadingStart(config: AxiosRequestConfig = {}) {
  if (config.loading === false) {
    return;
  }
  // TODO:
  // const showMask = config.loading && config.loading instanceof Object
  //   ? config.loading.showMask || true
  //   : true;
  // const { loadingSet } = loadingData;
  // loadingSet.add(config);
  // loadingData.maxCount++;
  // loadingData.loadingInstance = createLoadingComponent({
  //   value: loadingSet.size,
  //   max: loadingData.maxCount + 1,
  //   showMask,
  // });
}

function handleLoadingStop(config: AxiosRequestConfig) {
  if (config.loading === false) {
    return;
  }
  // TODO:
  // const { loadingSet } = loadingData;
  // if (loadingSet.has(config)) {
  //   loadingSet.delete(config);
  //   loadingData.loadingInstance.data.value = loadingData.maxCount - loadingSet.size + 1;
  // }
  // if (loadingSet.size === 0) {
  //   loadingData.loadingInstance.data.visible = false;
  //   loadingData.maxCount = 0;
  // }
}

export { request };
