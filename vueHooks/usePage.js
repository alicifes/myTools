/**
 * @Author:chenyuxiang
 * @Date:
 * @LastEditTime:
 * @LastEditors: chenyuxiang
 * @Description:
 */

import { reactive, watch } from 'vue'

/**
 * @Author: chenyuxiang
 * @Date:  2023/09/04
 * @description: 分页hooks
 */
export const usePage = (fn, pageData = { pageSize: 10, pageIndex: 1, total: 0 }) => {
    const pages = reactive(pageData)
    watch([() => pages.pageIndex, () => pages.pageSize], () => {
        fn && fn()
    })
    return pages
}