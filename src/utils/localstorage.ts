// 本地数据处理

/**
 * 保存数据
 * @param key
 * @param value
 */
export const setItem = (key: string, value: any) => {
  if (typeof value === 'object') {
    // eslint-disable-next-line no-param-reassign
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

/**
 * 获取数据
 * @param key
 * @returns {string|any}
 */
export const getItem = (key: string) => {
  const data: any = window.localStorage.getItem(key) || '';
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

/**
 * 删除单条数据
 * @param key
 */
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear();
};
