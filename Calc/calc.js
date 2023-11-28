/**
 * @Author:chenyuxiang
 * @Date:2023/11/27
 * @LastEditTime:
 * @LastEditors: chenyuxiang
 * @Description:
 */


/**
 * 计算小数位的长度
 * @param {*} num
 * @returns {number}
 */
const countDecimals = (num) => {
    let len = 0;
    try {
        num = Number(num);
        let str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // 科学记数法
            //是否是小数
            let isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // 十进制
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
}

/**
 * 将小数转成整数
 * @param {*} num
 * @returns {*}
 */
const convertToInt =  (num) => {
    num = Number(num);
    let newNum = num;
    let times = this.countDecimals(num);
    let temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
}

/**
 * 确认我们的计算结果无误，以防万一
 * @param {string} type
 * @param {number} num1
 * @param {number} num2
 * @param {number} result
 * @returns {number}
 */
const getCorrectResult(type, num1 , num2 , result ) {
    let temp_result = 0;
    switch (type) {
        case "add":
            temp_result = num1 + num2;
            break;
        case "sub":
            temp_result = num1 - num2;
            break;
        case "div":
            temp_result = num1 / num2;
            break;
        case "mul":
            temp_result = num1 * num2;
            break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
}

/**
 * 加法运算
 * @param {number} num1
 * @param {number} num2
 * @returns {*}
 */
export const addDecimal = (num1,num2) => {
    num1 = Number(num1);
    num2 = Number(num2);
    let dec1 , dec2 , times ;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    const result = (mulDecimal(num1, times) + mulDecimal(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
}

/**
 * 减法运算
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
export const subDecimal = (num1, num2) => {
    num1 = Number(num1);
    num2 = Number(num2);
    let dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    const result = Number((mulDecimal(num1, times) - mulDecimal(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
}

/**
 * 除法运算
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
export const divDecimal = (num1, num2) => {
    num1 = Number(num1);
    num2 = Number(num2);
    let t1 = 0, t2 = 0, dec1, dec2;
    try { t1 = countDecimals(num1); } catch (e) { }
    try { t2 = countDecimals(num2); } catch (e) { }
    dec1 = convertToInt(num1);
    dec2 = convertToInt(num2);
    const result = mulDecimal((dec1 / dec2), Math.pow(10, t2 - t1));
    return getCorrectResult("div", num1, num2, result);
}

/**
 * 乘法运算
 * @param {number} num1
 * @param {number} num2
 * @returns {number}
 */
export const mulDecimal = (num1, num2) => {
    num1 = Number(num1);
    num2 = Number(num2);
    let times = 0, s1 = num1.toString(), s2 = num2.toString();
    try { times += countDecimals(s1); } catch (e) { }
    try { times += countDecimals(s2); } catch (e) { }
    const result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
}

export const calc = {
    addDecimal,
    subDecimal,
    divDecimal,
    mulDecimal
}