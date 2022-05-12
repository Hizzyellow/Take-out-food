/**
 * 解析url字符串,解析成一个对象
 * @example ?id=12345
 * @return Object {id:12345}
 *
*/
export function urlParse () {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g; // 正则表达式 ?或&符号加上非?或&符号用等号连接,再加上非?或&符号,g就是全局匹配
    let arr = url.match(reg); // 返回一个数组
    // 拿到的数组就是 ['?id=12345']
    if (arr) { // 如果有数组
        arr.forEach((item) => { // 遍历每一个数组元素
            let tempArr = item.substring(1).split('='); // 把第一个?去了,然后从=开始分开截取
            let key = decodeURIComponent(tempArr[0]); // decodeURIComponent可以解码URI特殊字符（如#，/，￥等）
            let value = decodeURIComponent(tempArr[1]);
            obj[key] = value; // key=id,value=12345
        });
    }
    return obj;
}
