<template>
    <div class="ui accordion" id="menu-nav">
        <div class="ui-title">
            VESSEL EQUIPMENT
        </div>
        <div :class="['title',item.type == 0 ? 'type0' : 'type1']" v-for="item in menuArray">
            <div class="mark mark0" v-if="item.type == 0">
                <span>{{item.codeNumber}}</span>
            </div>
            <div class="mark mark1" v-if="item.type == 1">
                <span>{{item.firstNumber}}</span>
                <span>{{item.secondNumber}}</span>
            </div>
            <router-link tag="a" exact :to="item.path">{{item.title}}</router-link>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions,mapMutations} from "vuex";
    import {publicMethod} from "../modules/public";
    let pMethos;
    export default{
        mounted(){
            pMethos = publicMethod(this);   //引入公共方法
            this.getMenuArray();    //获取menu数据
        },
        computed:{
            ...mapState([
                "menuArray"
            ])
        },
        methods:{
            getMenuArray(){
                var _this = this;
                var url = "json/menu.json";
                pMethos.ajaxRequest({
                    url:url,
                    type:"get",
                    jsonpCallback:"fun",
                    callback(result){
                        _this.$store.commit("setMenuArray",result);
                    }
                });
            }
        }
    }
</script>