<template>
    <div class="ui accordion" id="commonRight">
        <div class="ui-con-list" v-for="(item,key) in commonRight">
            <div class="ui-title">
                {{key}}
            </div>
            <ul>
                <li v-for="list in item">
                    <i v-if="list.img"><img :src="list.img"></i>
                    {{list.title}}
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="sass" scoped>
    @import "../../css/common";
    #commonRight{
        float: right;
        width: 217px;
        margin:0 12px 0 10px;
        .ui-con-list{
            margin-bottom:15px;
            padding-bottom: 6px;
            @include blackBg(.2);
            ul{
                padding:0 12px;
                li{
                    width: 100%;
                    height: 38px;
                    line-height: 1;
                    border-top:2px solid $gery;
                    border-right:2px solid $gery;
                    margin-top: 22px;
                    padding: 8px 0 2px;
                    box-sizing: border-box;
                    i{
                        vertical-align: middle;
                        float: left;
                        width: 33px;
                        text-align: center;
                        margin-right: 4px;
                    }
                }
            }
        }
    }
</style>

<script>
    import {mapState,mapActions,mapMutations} from "vuex";
    import {publicMethod} from "../modules/public";
    let pMethos;
    export default{
        mounted(){
            pMethos = publicMethod(this);   //引入公共方法
            this.commonRight ? "" : this.getRightData();
        },
        computed:{
            ...mapState([
                "commonRight"
            ])
         },
        methods:{
            getRightData(){
                var _this = this;
                var url = "json/commonRight.json";
                pMethos.ajaxRequest({
                    url:url,
                    type:"get",
                    jsonpCallback:"funRight",
                    callback(result){
                        _this.$store.commit("setCommonRight",result)
                    }
                });
            }
        }
    }
</script>