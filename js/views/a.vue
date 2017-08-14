<template>
    <article>
        A page 内容
    </article>
</template>

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
