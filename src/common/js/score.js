export function saveToLocal (id, key, value) { // 存
    let seller = window.localStorage.__seller__; // 下划线风格说明是一个私有的
    if (!seller) { // 第一次没有seller
        seller = {}; // 设置为空
        seller[id] = {}; // 设置为空
    } else {
        seller = JSON.parse(seller); // JSON.parse解析成一个对象
        if (!seller[id]) { // 比如A商家保存了B商家没有保存
            seller[id] = {};
        }
    }
    seller[id][key] = value; // 这个一定要放在这里 把id和key放在每一个商家内
    window.localStorage.__seller__ = JSON.stringify(seller); // JSON.stringify说白了就是把对象的类型转换为字符串类型
    // console.log(window.localStorage.__seller__);
};
export function loadFromLocal (id, key, def) { // 取
    let seller = window.localStorage.__seller__;
    if (!seller) { // 如果没有存过的话
        return def; // 返回默认值
    }
    seller = JSON.parse(seller)[id]; // 转换为JSON对象
    if (!seller) { // 如果id为空的话
        return def;
    }
    let ret = seller[key];
    return ret || def;
};
