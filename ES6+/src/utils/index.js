/**
 * 权限
 * @param {*} key
 */
export function hasPermission(key) {
  return window.APP_CONFIG.permissions.indexOf(key) !== -1 || false;
}

/**
 * 获取svg图标(id)列表
 */
export function getIconList() {
  const res = [];
  document.querySelectorAll('svg symbol').forEach((item) => {
    res.push(item.id);
  });
  return res;
}
