/* creat by sunhongkui */
function getPort(url){
    var commonInteface;
    var url = url || window.location.href;
    if(/(^localhost$)|(^10.10)|(^192.168)/.test(window.location.hostname) || (url.indexOf("stag.devops.ihangmei.com") > -1)){
        commonInteface = "http://139.217.26.23:8080";   //测试
    }else if(url.indexOf("api.stg.amol") > -1){
        commonInteface = "";    //预上线
    }else if(url.indexOf("prod.devops.ihangmei.com") > -1){
        commonInteface = "http://api.amol.com.cn";   //正式环境
    }
    return commonInteface;
}

const commonInteface = getPort();

/*************** confirm *********************/
const confirmFn = (function(){   //确认操作提示方法
    var o = {};
    o.init = function(callback,name,boolen){      //callback为一函数或字符串，函数时为提示确认操作，确认则执行此函数，为字符串时则只弹层提示文字信息
        // var name = boolen ? ("<span>" + name + "</span>") :("确认要<span>" + (name || "删除") + "</span>吗？");
        var name = boolen ? name :("确认要" + (name || "删除") + "吗？");
        var isCallbackFn = (typeof callback === "function") ? true : false;
        var id = isCallbackFn ? 1 : 2;
        var strId = "confirm"+ id;
        var $confirm = $("#" + strId);
        var html = "";
        if(!$confirm.length){
            if(isCallbackFn){    //confirm
                html +=`<div class="ui small modal" id="${strId}">
                            <div class="ui centered header" style="word-break: break-all">
                                ${name}
                            </div>
                            <div class="actions">
                                <div class="ui button cancel">
                                    取消
                                </div>
                                <div class="ui orange button ok">
                                    确定
                                </div>
                            </div>
                        </div>`;
            }else{      //tips
                html +=`<div class="ui small modal" id="${strId}">
                            <div class="ui centered header" style="word-break: break-all">
                                ${callback}
                            </div>
                            <div class="actions">
                                <div class="ui orange button ok">
                                    确定
                                </div>
                            </div>
                        </div>`;
            }
            $("body").append(html);
        }else{
            isCallbackFn ?  $("#confirm"+ id).find(".header").text(name) : $("#confirm"+ id).find(".header").html(callback);
        }
        $("#confirm"+ id).modal({
            detachable  : false,
            onApprove : function() {
                if(isCallbackFn){  //有回调则执行
                    callback();
                }
            },
        }).modal('show');

    };
    return o;
}());

/*************** file down *********************/
var DownLoadFile = function (url,options) {
    var config = $.extend(true, {}, options);
    var $iframe = $('<iframe id="down-file-iframe" name="down-file-iframe" style="display: none;"/>');
    var $form = $('<form target="down-file-iframe" method="post" onsubmit="alert()" />');
    $form.attr('action', url);
    for (var key in config) {
        $form.append('<input type="hidden" name="' + key + '" value="' + config[key] + '" />');
    }
    $iframe.append($form);
    $("body").append($iframe);
    $form[0].submit();
    setTimeout(function(){
        $iframe.remove();
    },10000)
}

/*************** 返回时间信息(用于jedate插件) *********************/
const getDataTime = (function(){
    var o = {};
    o.init = function(){
        this.date = this.setDate();
    }
    o.setDate = function(v){
        var v = (v > 0 && v) ? v : (new Date()).getTime();
        var myDate = new Date(v);
        var ms =  myDate.getTime();
        var Y = myDate.getFullYear();
        var M = myDate.getMonth()+1;
        var D = myDate.getDate();
        var h = myDate.getHours();
        var m = myDate.getMinutes();
        var s = myDate.getSeconds();
        var w = myDate.getDay();
        var wArray = ["日","一","二","三","四","五","六"];
        return {
            ms:ms,
            Y:Y,
            M:M < 10 ? "0"+ M : M,
            D:D < 10 ? "0"+ D : D,
            h:h < 10 ? "0"+ h : h,
            m:m < 10 ? "0"+ m : m,
            s:s < 10 ? "0"+ s : s,
            w:wArray[w],
        }
    }
    o.startTime = function(){   //返回当月1号
        return this.date.Y + "-" + this.date.M + "-01";
    }
    o.nowTime = function(){ //返回当日
        return this.date.Y + "-" + this.date.M + "-" + this.date.D;
    }
    o.getMyTime = function(v){  //正/负，返回当前时间的偏移日期
        if( v == 0){
            return this.nowTime();
        }else{
            var ms = 1000 * 60 * 60 * 24 * v;
            var myTime = this.date.ms + ms;
            var thisDate = this.setDate(myTime);
            return thisDate.Y + "-" + thisDate.M + "-" + thisDate.D;
        }
    }
    o.getMillForTime = function(format,v){ //毫秒转日期
        var thatData,format,formatArray,l,returnDate = "";
        thatData = this.setDate(v);
        format = format || "Y/M/D";
        formatArray = format.split(" ");
        l = formatArray.length;
        for(var i=0; i<l; i++){
            var thisVal = formatArray[i].split("/");
            var str = "";
            var icon = i== 0 ? "-" : ":";
            for(var j=0,len=thisVal.length; j < len; j++){
                str += j == 0 ? thatData[thisVal[j]] : icon + thatData[thisVal[j]] ;
            }
            returnDate += i == 0 ? str : " " + str;
        }
        return returnDate;
    }
    o.init();
    return o;
})();

/*************** 实例化日期插件 *********************/
function dateInitMethod(option){
    var o = {
        ele:"", //实例化的对象("str" || "str,str")
        isSpacDay:false,    //是否设置最大时间跨度
        spacDay:30, //默认最大间隔天数30
        format:"YYYY-MM-DD",    //默认只展示年月日
        insTrigger:true,
        ishmsVal:true,
        isinitVal:false,    //是否初始化时间
        multiple:false,     //是否有关联日期功能
        maxDate:"",
        minDate:"",
        sdv:"", //getDataTime.startTime(),     //开始日期默认值
        edv: "",     //结束日期默认值
        zIndex:3000,
        fixed:true,
        isdocScroll:false,
        timeObj:{
            "sTime":{},
            "eTime":{}
        },
        timeObjArray:["sTime","eTime"],
        callBack: null,  //选择日期后回调方法,调用时会传递两个参数val = 所选日期； n = 1/2， 1为开始日期，2为结束日期
    };
    o = $.extend(o,option);
    var $eleArray = o.ele.split(",");
    var l = $eleArray.length;

    var dateObj = {
        minDate:o.minDate,
        maxDate:o.maxDate,
        isinitVal:o.isinitVal,
        insTrigger:o.insTrigger,
        ishmsVal:o.ishmsVal,
        format:o.format,
        zIndex:o.zIndex,
        fixed:o.fixed,
    }

    function callBackMethod(n,boolen){
        return function(el,val){
            if(!o.multiple){
                o.callBack ? o.callBack(el.context.value) : "";
            }else{
                boolen ? o.linkDate(n,boolen) : o.linkDate(n,boolen,el.context.value);
            }
        }
    }

    function setStart(){
        o.timeObj.eTime.minDate = o.isSpacDay ? o.sdv : "";
        o.timeObj.eTime.maxDate = o.edv;
    }
    function setEnd(){
        o.timeObj.sTime.minDate = o.isSpacDay ? getDataTime.getMyTime(-o.spacDay) : "";
        o.timeObj.sTime.maxDate = o.edv;
    }
    o.linkDate = function(v,c,val){   // 1 开始时间 2 结束时间 c 清除
        var periodDay,starttime,HMtime,date,onTime;
        if(c){  //清除
            if(v == 1){
                setStart();
            }else if(v == 2){
                setEnd();
            }else{
                setStart();
                setEnd();
            }
        }else{
            if(o.isSpacDay){
                periodDay = 1000 * 60 * 60 * 24 * o.spacDay;
                starttime = val.replace(new RegExp("-","gm"),"/");
                onTime = new Date().getTime();
                HMtime = (new Date(starttime)).getTime();
                HMtime = v==1 ? (HMtime + periodDay) > onTime ? onTime : (HMtime + periodDay) : HMtime - periodDay;
                date = $.nowDate(HMtime.toString());
                if(v == 1){
                    o.timeObj.eTime.maxDate = date;
                }else{
                    o.timeObj.sTime.minDate = date;
                }
            }
            v == 1 ? o.timeObj.eTime.minDate = val : o.timeObj.sTime.maxDate = val;
        }
        if(o.callBack && typeof o.callBack == "function"){ o.callBack(val,v); }
    }
    for(var j=0; j<l; j++){
        var n = j + 1;
        var thisObj;
        thisObj = o.timeObj[o.timeObjArray[j]] = $.extend({},dateObj);
        thisObj.choosefun = callBackMethod(n,false);
        thisObj.okfun = callBackMethod(n,false);
        thisObj.clearfun = callBackMethod(n,true);
        $($eleArray[j]).jeDate(thisObj);
    }
    if(o.isSpacDay && o.sdv && o.edv){
        o.linkDate(0,true);
        if(o.callBack && typeof o.callBack == "function"){
            o.callBack(o.sdv,1);
            o.callBack(o.edv,2);
        }
    }
    return o;
}

const locateUrl = (function(){
    var o = {};
    o.param = {
        "":"list0",
        "index":"list0",
        "userManager":"list0",
        "planManager":"list1",
        "planDataView":"list2",
        "userData":"list2",
        "planData":"list2"
    };
    o.init = function(val){
        var uId = this.param[val];
        if(uId){
            var uIdList = uId.split("_");
            for(var i=0,len = uIdList.length; i<len; i++){
                var n=0, thisId = "";
                while(n<i+1){
                    if(n == 0){
                        thisId += uIdList[n];
                    }else{
                        thisId += "_" + uIdList[n];
                    }
                    n++;
                }
                (function(v){
                    setTimeout(function(){
                        $("#" + v).click();
                        // document.getElementById(v).click();
                    },10);
                })(thisId);
            }
        }
    }
    return o;
})();

const publicMethod = function(t) {
    var o = {
        "all" : "请选择",
        "vue" : t,
        "timeId":null,
        "loading":false
    };
    function isLoading(val){    //100ms请求未完成则展示loading
        val.loading = true;
        if(val.timeId){ clearInterval(val.timeId);}
        val.timeId = setTimeout(()=>{
            val.loading ? val.vue.isLoading = true : "";
        },100);
    }
    o.bootstrapTableOption = {  //请求表格数据option
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        dataType : "json",
        striped: true,
        sidePagination : "server", // 客户端处理分页
        pagination : true,
        pageNumber:1,
        pageSize : 10,
    };
    o.ajaxRequest = function (obj) {
        isLoading(this);
        var opt = {
            "data":{},
            "type":"post",
            "url":"",
            "callback":"",
            "errorback":""
        }
        opt = $.extend(true,opt,obj);
        if(!opt.dataType){
            opt.dataType = opt.type == "get" ? "jsonp" : "json";
        }
        $.ajax({
            type:opt.type,
            contentType: "application/x-www-form-urlencoded",
            url : commonInteface + opt.url,
            dataType: opt.dataType,
            data:opt.data,
            success:function(result){
                var status = result.status;
                if(status == 0){
                    if(opt.callback && (typeof opt.callback) == "function"){
                        opt.callback(result.data || []);
                    }
                }else if(status == 61003 || status == 61004){  //未登录
                    o.vue.$router.push("/login");
                }else{
                    //由于接口没有返回错误详细标识，增加判断，差评
                    (opt.errorback && typeof opt.errorback == "function") ? opt.errorback(true) : alert(result.message);
                }
            },
            error:function(){
                (opt.errorback && typeof opt.errorback == "function") ? opt.errorback() : "";
                alert("请求失败");
            },
            complete:function(){
                o.loading = false;
                o.vue.isLoading = false;
            }
        });
    };
    o.operateQuest = function(ele,url,name,data,callback){
        isLoading(this);
        var $ele = $(ele);
        var _this = this;
        $.ajax({
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            url : commonInteface + url,
            dataType: "json",
            data:data,
            success: function (result) {
                var status = result.status;
                if(status == 0){
                    if(result.data && result.data.flag != 1){
                        _this.alertFn(name + "失败");
                    }else{
                        _this.alertFn(name + "成功");
                    }
                    var v =  $ele.bootstrapTable("getOptions");
                    $ele.bootstrapTable("refreshOptions",{"pageNumber":v.pageNumber});
                    if(callback && (typeof callback) == "function"){
                        callback(result);
                    }
                }else if(status == 61003 || status == 61004){
                    o.vue.$router.push("/login");
                }else{
                    _this.alertFn(name + "失败");
                }
            },
            error: function (request) {
                _this.alertFn(name + "失败");
            },
            complete:function(){
                o.loading = false;
                o.vue.isLoading = false;
            }
        });
    };
    o.getSelectVal = function (obj) { //将option加载到html中
        var $this = this;
        var opt = {
            el:"",  //select容器
            url:"",
            data:{},
            paramName:"",   //返回数据的key值
            callback:"",
            errorback:"",
            defaultCallback:"",  //基于默认回调函数新增的执行代码
            paramOption:{
                key:"key",
                value:"value"
            }
        }
        opt = $.extend(true,opt,obj);
        if(!opt.el){ console.warn("el不能为空");return flase;}
        $this .ajaxRequest({
            "url":opt.url,
            "data":opt.data,
            "callback":(typeof opt.callback == "function") ? opt.callback : function(result){
                var result = opt.paramName ? result[opt.paramName] : result;
                var optionHtml = $this.setSelectVal(result,true,opt.paramOption.key,opt.paramOption.value);
                $(opt.el).html(optionHtml).dropdown({
                    match:"text",
                    fullTextSearch:true,
                    placeholder:false
                    // forceSelection:false,
                    // showOnFocus:false,
                });
                if(opt.defaultCallback && (typeof opt.defaultCallback) == "function"){
                    opt.defaultCallback(result);
                }
            },
            "errorback":(typeof opt.errorback == "function") ? opt.errorback :function () {
                var optionHtml = $this.setSelectVal([],true);
                $(opt.el).html(optionHtml).dropdown();
            }
        });
    };
    o.setSelectVal = function (result, boolean,k,v) {   //生成option字符串，key和value为兼容不规范接口字段
        var len = result.length;
        var selectHtml = "",key = k || "key",value = v || "value";
        !!boolean ? selectHtml += "<option value=''>" + this.all + "</option>" : "" ;
        for (var i = 0; i < len; i++) {
            var kVal = result[i][key];
            var vVal = result[i][value];
            if(kVal === undefined){  //过滤错误数据
                continue;
            }
            selectHtml += "<option value=" + kVal + ">" + vVal + "</option>";
        }
        return selectHtml;
    };
    o.alertFn =function(v){
        alert(v);
    }
    return o;
}

//dropdown-select 模糊查询时，点击无匹配项时不能触发input blur，暂无更好方式处理
const processDropdownSelect = function(){
    $("body").on("click","#search .message",function(){
        $(this).closest("div.search").find("input").focus();
    })
}

export {
    dateInitMethod,
    getDataTime,
    DownLoadFile,
    confirmFn,
    commonInteface,
    locateUrl,
    publicMethod,
    processDropdownSelect
}