export interface BaseType {
  id: number;
  created_at: string;
  updated_at: string;
}

//  通过 function 获取默认数据，防止引用类型数据，改到默认数据
export function getBaseData(): BaseType {
  return {
    id: 0,
    created_at: '',
    updated_at: '',
  };
}
