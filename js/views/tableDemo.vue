<template>
    <div class="common-body">
        <!-- tab -->
        <common-tab :tab-menu="tabMenu" :tab-click="tabClick"></common-tab>

        <div class="common-con">
            <template v-for="item in dataJson">
                <common-table
                    :table-title=item.title
                    :table-json=item.tableJson
                    :key-name=item.keyName
                    :column=item.column >
                </common-table>
            </template>
        </div>
    </div>
</template>

<script>
    import commonTab from "./common-tab.vue";
    import commonTable from "./common-table.vue";
    import {publicMethod} from "../modules/public";

    let pMethos;
    export default {
        data(){
            return {
                allJson:{},
                dataJson:[],
                shoTab:null
            }
        },
        mounted(){
            pMethos = publicMethod(this);   //引入公共方法
            this.getData();
        },
        methods:{
            tabClick(v){
                if(v == this.shoTab){ return false;}
                this.dataJson = [];
                setTimeout(()=>{
                    this.dataJson = this.allJson[v];
                    this.shoTab = v;
                },0)
            },
            getData(){
                var _this = this;
                var url = "json/tableDemo.json";
                pMethos.ajaxRequest({
                    url:url,
                    type:"get",
                    jsonpCallback:"funTableDemo",
                    callback(result){
                        console.log(result);
                        _this.allJson = result;
                    }
                });
            }
        },
        computed:{
            tabMenu(){
                var _arr = [];
                for(var _o in this.allJson){
                    _arr.push(_o);
                }
                this.dataJson = this.allJson[_arr[0]];
                return _arr;
            }
        },
        components:{
            commonTab,
            commonTable
        }
    }
</script>