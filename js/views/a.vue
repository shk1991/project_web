<template>
    <article id="page-home">
        <h3 class="ui-title">
            <i class="icon-title icon01"></i>
            M/E
        </h3>
    </article>
</template>

<style lang="sass" scoped>
    #page-home{
        .ui-title{
            display:flex;
            .icon-title{
                height: 100%;
                width: 35px;
                margin-right: 8px;
            }
            .icon01{
                background: url("../../images/tmp/data_title_icon1.png") no-repeat center;
            }
        }
    }
</style>

<script lang="ts">
    import "../../css/a.scss";
    import {formatTime,clone} from "../modules/method";
    import {confirmFn,publicMethod,processDropdownSelect} from "../modules/public";
    import {CreatTableMethod} from "../modules/public_ts";
    import {mapState,mapActions,mapMutations} from "vuex";

    let creatTableMethod;
    let pMethos;

    export default{
        data(){
            return {

            }
        },
        mounted(){
            pMethos = publicMethod(this);   //引入公共方法
            creatTableMethod = new CreatTableMethod({"vue":this});  //ajax请求table列表数据
        },
        methods: {

        },
        computed:{

        },
        filters:{

        }
    }


</script>
