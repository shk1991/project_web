<template>
    <div class="common-table">
        <span class="table-title" v-if="tableTitle">{{tableTitle}}</span>
        <div class="common-table-body">
            <table border="0" cellspacing="0" cellpadding="0" class="ui celled compact table unstackable">
                <thead v-if="column">
                    <tr class="center aligned">
                        <th v-for="item in column">{{item}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="center aligned" v-if="!tableData || !tableData.length">
                        <td :colspan="keyName.length">暂无数据</td>
                    </tr>
                    <tr class="center aligned" v-for="item in tableData">
                        <td v-for="key in keyName">{{item[key]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {publicMethod} from "../modules/public";
    let pMethos;
    export default{
        props:["tableTitle","keyName","column","src","tableJson"],
        data(){
            return{
                tableData:[]
            }
        },
        methods:{
            getData(){
                pMethos = publicMethod(this);   //引入公共方法
                var _this = this;
                var url = _this.src;
                pMethos.ajaxRequest({
                    url:url,
                    type:"get",
                    jsonpCallback:"funRight",
                    callback(result){
                        _this.tableData = result.Tool;
                    }
                });
            }
        },
        created(){
            try{
                if(this.tableJson){
                    this.tableData = this.tableJson;
                }else if(this.src){
                    this.getData();
                }else{
                    console.log("table参数有误");
                }
            }catch (e){
                console.log("table数据有误");
            }
        }
    }
</script>