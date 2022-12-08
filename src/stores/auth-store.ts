import { request } from '@/utils';
import { SimpleStore } from './helper/simple-store';
import { UserType, getUserDefaultData } from '@/models/user';
const { Storage } = require('@/utils/storage');

interface Data {
  access_token: string,
  user: UserType,
}

type passwordForm = {
  email: string
  password: string
  rucaptcha: string
}

const ACCESS_TOKEN_KEY = `${process.env.VUE_APP_ENV}_USER_ACCESS_TOKEN_DATA`;

class AuthStore extends SimpleStore {
  constructor() {
    super();
    this.storage = new Storage(ACCESS_TOKEN_KEY);
  }
  storage: Storage
  user: UserType = getUserDefaultData()
  $access_token: string = ''

  set access_token(v: string) {
    this.$access_token = v;
    this.storage.set(ACCESS_TOKEN_KEY, v);
  }

  get access_token(): string {
    this.$access_token = this.$access_token || this.storage.get(ACCESS_TOKEN_KEY) || '';
    return this.$access_token;
  }

  get isLogin() {
    return !!this.access_token;
  }

  async fetch() {
    const res = await request.get<UserType>('/mine');
    this.user = res.data;
    return res;
  }

  signOut() {
    this.access_token = '';
    this.user = getUserDefaultData();
    this.isFulfilled = false;
  }

  async signUp(body: any) {
    const { data } = await request.post<Data>('/auth/sign_up', body);
    this.access_token = data.access_token;
    this.user = data.user;
    return data;
  }

  async loginPassword(body: passwordForm) {
    const { data } = await request.post<Data>('auth/sign_in_via_password', body);
    this.access_token = data.access_token;
    this.user = data.user;
    return data;
  }
}

export const authStore = AuthStore.create<AuthStore>();
