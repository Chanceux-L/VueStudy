import { BaseType, getBaseData } from './base';

export interface ProfileType extends BaseType {
  age: number;
  email: string;
  gender: string;
  nick_name: string;
}

export interface UserType extends BaseType  {
  avatar: string,
  profile: ProfileType,
}

/**
 * 通过 function 获取默认数据，防止引用类型数据，改到默认数据
 *
 * @return {UserType}[return description]
 */
export function getUserDefaultData(): UserType {
  return {
    ...getBaseData(),
    avatar: '',
    profile: {
      ...getBaseData(),
      age: 0,
      email: '',
      gender: '',
      nick_name: '',
    }
  };
}
