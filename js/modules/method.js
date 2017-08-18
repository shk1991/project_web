function dataFormat(time,formatStr){
    var nowDate = new Date(time);
    var str = formatStr;

    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, nowDate.getFullYear());
    str = str.replace(/yy|YY/, (nowDate.getYear() % 100) > 9 ? (nowDate.getYear() % 100).toString() : '0' + (nowDate.getYear() % 100));
    str = str.replace(/MM/, (nowDate.getMonth() + 1) > 9 ? (nowDate.getMonth() + 1).toString() : '0' + (nowDate.getMonth() + 1));
    str = str.replace(/M/g, (nowDate.getMonth() + 1));
    str = str.replace(/w|W/g, Week[nowDate.getDay()]);
    str = str.replace(/dd|DD/, nowDate.getDate() > 9 ? nowDate.getDate().toString() : '0' + nowDate.getDate());
    str = str.replace(/d|D/g, nowDate.getDate());
    str = str.replace(/hh|HH/, nowDate.getHours() > 9 ? nowDate.getHours().toString() : '0' + nowDate.getHours());
    str = str.replace(/h|H/g, nowDate.getHours());
    str = str.replace(/mm/, nowDate.getMinutes() > 9 ? nowDate.getMinutes().toString() : '0' + nowDate.getMinutes());
    str = str.replace(/m/g, nowDate.getMinutes());
    str = str.replace(/ss|SS/, nowDate.getSeconds() > 9 ? nowDate.getSeconds().toString() : '0' + nowDate.getSeconds());
    str = str.replace(/s|S/g, nowDate.getSeconds());
    return str;
}

var u = window.navigator.userAgent;
const isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(u);
const isMobile = 'ontouchstart' in window;
const clone = (origin) => JSON.parse(JSON.stringify(origin));

const format2Time = (time) => {
    var y = time.substr(0,4),
        M = time.substr(5,2)-1,
        d = time.substr(8,2),
        h = time.substr(11,2) || 0,
        m = time.substr(14,2) || 0,
        s = time.substr(17,2) || 0;
    var nowDate = new Date();
    nowDate.setFullYear(y,M,d);
    nowDate.setHours(h,m,s);
    return nowDate.getTime();
};
const formatTime = (time) => {
    return dataFormat(time,"YYYY/MM/DD hh:mm:ss");
}
const format3Time = (time) => {
    return dataFormat(time,"YYYY-MM-DD");
}

const format4Time = (time) => {
    return dataFormat(time,"YYYY.MM.DD hh：mm：ss");
}


export {
    isIos,
    isMobile,
    clone,
    dataFormat,
    formatTime,
    format2Time,
    format3Time,
    format4Time
};