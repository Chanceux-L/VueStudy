
declare global  {
  interface Window {
    vanillaColorPicker: any;
    YubinBango: any;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $get: any
  }
}
// 如果有一个import引入，就不需要export｛｝
export {}
