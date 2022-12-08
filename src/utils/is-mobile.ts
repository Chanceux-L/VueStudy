/**
 * 判断是否是小屏幕设备
 */
 export function isMobile(): boolean {
  return /Android|WindowsPhone|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent);
}
