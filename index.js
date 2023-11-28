/**
 * @Author:chenyuxiang
 * @Date:2023/11/23
 * @LastEditTime:
 * @LastEditors: chenyuxiang
 * @Description:
 */

/**
 * @param {*} fn
 * @param {*} delay
 * @returns
 * @description 防抖函数,多次点击只执行最后一次,类似于回城
 * 使用方法 xxx.debounce(() => , num)
 */
export function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 * @param {*} fn
 * @param {*} delay
 * @returns fn
 * @description 节流函数,多次点击只执行第一次
 */
export function throttle(fn, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * @description 扁平化对象,成为一个数组
 * @returns Array
 */
export function flattenObjectToArray(obj, key = "children", result = []) {
  if (!obj) return result;
  if (obj[key] && obj[key].length > 0) {
    obj[key].forEach((item) => {
      result.push(item);
      if (item[key] && item[key].length > 0) {
        flattenObjectToArray(item, key, result);
      }
    });
  }
  return result;
}
