<template>
    <div class="ui top attached tabular menu">
        <a :class="['item',{'active':index == 0}]" v-for="(item,index) in tabMenu" @click="tabClick(item)">{{item}}</a>
    </div>
</template>

<script>
    export default{
        props:["tabMenu","tabClick"],
        mounted(){
            this.$nextTick(()=>{
                $("body").on("click",".ui.menu a.item",function(){
                    $(this).addClass('active').siblings().removeClass('active');
                })
            });
        }
    }
</script>