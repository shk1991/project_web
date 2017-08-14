/* creat by sunhongkui */
import {commonInteface} from "./public.js";
let $ = (window as any).$;
class CreatTableMethod{
    vue:any;
    dataName:String = "result"; //由于不同接口返回的字段名称不一致，特加此变量区分，差评
    callback:any = null;    //如果需要回传data，则添加此回调方法
    tableOption:Object = {    //公共option
        striped: true,
        pagination : true,
        pageNumber:1,
        pageSize : 10,
    };
    defaultOption:any = {  //默认请求表格数据option
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        dataType : "json",
        sidePagination : "server", // 客户端处理分页
        responseHandler:(function(_this:any){
            return function(data:any){

                if(_this.callback && typeof _this.callback == "function"){
                    _this.callback(data);
                }

                if(data.status != 0){
                    alert(data.message);
                    _this.vue.$router.push("/login");
                }
                return{
                    "total":data.data.totalElements,
                    "rows":data.data[_this.dataName] || []
                }
            }
        }(this)),
    };

    constructor(param:any){
        if(param.defaultOption){
            Object.assign(this.tableOption,param.defaultOption)
        }else{
            Object.assign(this.tableOption,this.defaultOption)
        }
        this.vue = param.vue;
    }

    creatTableClient(obj:any):void{ //客户端分页 && 传数据进来

        let columnsArray:any = this.getColumnsArr(obj);
        let tableOption:Object = Object.assign({},this.tableOption,{
            data:obj.data,
            sidePagination:obj.sidePagination,
            queryParams: this.queryParams(),
            columns:columnsArray
        })

        $(obj.ele).bootstrapTable('destroy');
        $(obj.ele).bootstrapTable(tableOption);
    }

    creatTable(obj:any):void{   //ajax请求数据
        if(obj.dataName){
            this.dataName = obj.dataName;
        }
        if(obj.callback){
            this.callback = obj.callback;
        }
        let columnsArray:any = this.getColumnsArr(obj);
        let tableOption:Object = Object.assign({},this.tableOption,{
            url: commonInteface + obj.url,
            queryParams: this.queryParams(),
            columns:columnsArray
        })

        $(obj.ele).bootstrapTable('destroy');
        $(obj.ele).bootstrapTable(tableOption);
    }

    setColumnsObj(obj:any):Object{
        let columnsName:Array<string> = obj.columnsName;
        let fieldName:Array<string> = obj.fieldName;
        let columnsObj:any = obj.columnsObj || {};
        var _obj:any = {
            columnsName:columnsName,
            fieldName:fieldName,
            columnsObj:columnsObj
        }
        return _obj;
    }

    getColumnsArr(obj:any):Array<any>{
        let _obj:any = this.setColumnsObj(obj);
        let columnsArray:any = this.setColumnsArr(_obj);
        return columnsArray;
    }

    setColumnsArr(obj:any):Array<any>{
        let len:number = obj.columnsName.length;
        let arr:Array<Object> = [];
        for(var i=0; i<len; i++){
            let _o:any = {};
            _o.title = obj.columnsName[i];
            _o.field = obj.fieldName[i];
            _o.align = 'center';
            _o.valign = 'middle';
            if(obj.columnsObj[i]){
                _o.formatter = obj.columnsObj[i];
            }else{
                _o.formatter = function(value, row, index) { /*if(value === ""){ value = 0;}*/ return value}
            }
            arr.push(_o);
            _o = null;
        }
        return arr;
    }

    queryParams(){  //配置参数
        var _this = this;
        return function(params:any){
            var temp:any = {
                pageNumber: (params.offset - params.limit)/params.limit+2,
                pageSize: params.limit,
            };
            Object.assign(temp,_this.vue.userInfo,_this.vue.searchObj);
            return temp;
        }
    };
}

export {
    CreatTableMethod
}