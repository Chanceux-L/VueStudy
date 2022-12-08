import { AxiosRequestConfig } from 'axios'
declare module 'axios' {
  interface Loading {
    showMask?: boolean,
    silent?: boolean,
  }

  export interface AxiosRequestConfig {
    loading?: Loading | boolean
  }
}
