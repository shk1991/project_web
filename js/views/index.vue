<template>
    <article>
        <!-- public head -->
        <common-head></common-head>

        <div class="main-container" id="main-container">

            <div class="ui accordion" id="menu-nav">
                <div class="title"><i class="edit icon"></i> <router-link tag="a" exact to="/index/a">page A</router-link></div>
                <div class="title"><i class="edit icon"></i> <router-link tag="a" exact to="/index/b">page B</router-link></div>
                <div class="title"><i class="edit icon"></i> <router-link tag="a" exact to="/index/c">page C</router-link></div>
            </div>

            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </article>
</template>

<script>
    import commonHead from "./common-head.vue";
    import {locateUrl} from "../modules/public.js"
    export default {
        data(){
            return {}
        },
        mounted(){
            var path = this.$route.path.split("/").pop();
            locateUrl.init(path);
        },
        components:{
            commonHead
        }
    }
</script>