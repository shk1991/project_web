<template>
    <article>
        <!-- public head -->
        <common-head></common-head>

        <div class="main-container" id="main-container">

            <!--左侧菜单栏-->
            <menu-nav></menu-nav>

            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
    </article>
</template>

<script>
    import commonHead from "./common-head.vue";
    import menuNav from "./menu-nav.vue";
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
            commonHead,
            menuNav
        }
    }
</script>