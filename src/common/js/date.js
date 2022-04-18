// import { substr } from 'stylus/lib/functions';
export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) { // 用正则表达式
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); // 这个RegExp.$1就是4个y,代替成当前年份,
        // 再转为字符串,在截取对应的长度,如果是yy 2016,接截取16;
    }
    let o = { // 用正则表达式
        'M+': date.getMonth() + 1,
        'd+': date.getDay(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) { // 构造正则表达式
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : Leftaddzero(str));
        }
    }
    return fmt;
};

function Leftaddzero (str) {
    return ('00' + str).substr(str.length);
}
