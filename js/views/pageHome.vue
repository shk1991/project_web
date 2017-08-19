<template>
    <article>
        <!--公共右边栏-->
        <common-right></common-right>

        <div id="page-home">
            <h3 class="ui-title">
                <i class="icon-title icon01"></i>
                M/E
            </h3>
            <div class="page-con-box clearfix">
                <div class="con-box-data">
                    <span>M/E Data</span>
                    <div>
                        echart
                    </div>
                </div>
                <div class="con-box-tool">
                    <span>Analyzing Tool</span>
                    <ul class="ui-tool-list">
                        <li class="tool01">FUEL ECONOMY ANALYSIS</li>
                        <li class="tool02">CYLINDER PRESSURE ANALYSIS</li>
                        <li class="tool03">TREND ANALYSIS</li>
                        <li class="tool04">PERFORMANCE DECLINATION ANALYSIS</li>
                    </ul>
                </div>
                <div class="con-box-warn">
                    <span>Alarm / Warning Event</span>
                    <div class="ui-warn-list">
                        <p v-for="i in 4" :class="i == 1 ? 'orange': i == 4 ? '':'yellow'">气缸健康状态： WCU07 ROS2   MESS ROS2</p>
                    </div>
                    <a href="#" class="more-link">MORE</a>
                </div>
                <div class="con-box-report">
                    <span>Report</span>
                    <div class="ui-report-list clearfix">
                        <div class="ship-icon"></div>
                        <div class="ship-icon2"></div>
                    </div>
                </div>
            </div>

            <h3 class="ui-title">
                <i class="icon-title icon01"></i>
                M/E
            </h3>
            <div class="page-con-box clearfix">
                <div class="con-box-data">
                    <span>M/E Data</span>
                    <div class="data-list" v-for="item in infoData.info1">
                        <dl>
                            <dt class="green-font">{{item.greenFont}}</dt>
                            <dd>
                                <p>
                                    <strong>{{item.value}}</strong>
                                    <em>{{item.unitStr}}</em>
                                </p>
                                <p class="small-font">{{item.ext}}</p>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="con-box-tool">
                    <span>Analyzing Tool</span>
                    <ul class="ui-tool-list">
                        <li class="tool01">FUEL ECONOMY ANALYSIS</li>
                        <li class="tool02">CYLINDER PRESSURE ANALYSIS</li>
                        <li class="tool03">TREND ANALYSIS</li>
                        <li class="tool04">PERFORMANCE DECLINATION ANALYSIS</li>
                    </ul>
                </div>
                <div class="con-box-warn">
                    <span>Alarm / Warning Event</span>
                    <div class="ui-warn-list">
                        <p v-for="i in 4" :class="i == 1 ? 'orange': i == 4 ? '':'yellow'">气缸健康状态： WCU07 ROS2   MESS ROS2</p>
                    </div>
                    <a href="#" class="more-link">MORE</a>
                </div>
                <div class="con-box-report">
                    <span>Report</span>
                    <div class="ui-report-list clearfix">
                        <div class="ship-icon"></div>
                        <div class="ship-icon2"></div>
                    </div>
                </div>
            </div>

            <h3 class="ui-title">
                <i class="icon-title icon03"></i>
                G/E
            </h3>
            <div class="page-con-box clearfix">
                <div class="con-box-data">
                    <div class="data-list" v-for="item in infoData.ge">
                        <span>{{item.title}}</span>
                        <dl v-for="detail in item.list">
                            <dt></dt>
                            <dd>
                                <p>
                                    <strong>{{detail.value}}</strong>
                                    <em>{{detail.unitStr}}</em>
                                </p>
                                <p class="small-font">{{detail.ext}}</p>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="con-box-tool">
                    <span>Analyzing Tool</span>
                    <ul class="ui-tool-list">
                        <li class="tool01">FUEL ECONOMY ANALYSIS</li>
                        <li class="tool02">CYLINDER PRESSURE ANALYSIS</li>
                        <li class="tool03">TREND ANALYSIS</li>
                        <li class="tool04">PERFORMANCE DECLINATION ANALYSIS</li>
                    </ul>
                </div>
                <div class="con-box-warn">
                    <span>Alarm / Warning Event</span>
                    <div class="ui-warn-list">
                        <p v-for="i in 4" :class="i == 1 ? 'orange': i == 4 ? '':'yellow'">气缸健康状态： WCU07 ROS2   MESS ROS2</p>
                    </div>
                    <a href="#" class="more-link">MORE</a>
                </div>
                <div class="con-box-report">
                    <span>Report</span>
                    <div class="ui-report-list clearfix">
                        <div class="ship-icon"></div>
                        <div class="ship-icon2"></div>
                    </div>
                </div>
            </div>

            <h3 class="ui-title">
                <i class="icon-title icon04"></i>
                SHAFT health status
            </h3>
            <div class="page-con-box clearfix">
                <div class="con-box-data">
                    <div style=" width: 400px;">
                        <div class="data-list" v-for="item in infoData.health">
                            <dl>
                                <dt></dt>
                                <dd>
                                    <p>
                                        <strong>{{item.value}}</strong>
                                        <em>{{item.unitStr}}</em>
                                    </p>
                                    <p class="small-font">{{item.ext}}</p>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="con-box-tool">
                    <span>Analyzing Tool</span>
                    <ul class="ui-tool-list">
                        <li class="tool03">TREND ANALYSIS</li>
                        <li class="tool04">PERFORMANCE DECLINATION ANALYSIS</li>
                    </ul>
                </div>
                <div class="con-box-warn">
                    <span>Alarm / Warning Event</span>
                    <div class="ui-warn-list">
                        <p v-for="i in 4" :class="i == 1 ? 'orange': i == 4 ? '':'yellow'">气缸健康状态： WCU07 ROS2   MESS ROS2</p>
                    </div>
                    <a href="#" class="more-link">MORE</a>
                </div>
                <div class="con-box-report">
                    <span>Report</span>
                    <div class="ui-report-list clearfix">
                        <div class="ship-icon"></div>
                        <div class="ship-icon2"></div>
                    </div>
                </div>
            </div>

        </div>
    </article>
</template>

<style lang="sass" scoped>
    @import "../../css/common";
    #page-home{
        overflow:hidden;
        .ui-title{
            margin-bottom: 0;
            display:flex;
            &:not(:first-child){ margin-top: 18px;}
            .icon-title{
                height: 100%;
                width: 35px;
                margin-right: 8px;
            }
            .icon01{
                background: url("../../images/tmp/data_title_icon1.png") no-repeat center;
            }
            .icon03{
                background: url("../../images/tmp/data_title_icon2.png") no-repeat center;
            }
            .icon04{
                background: url("../../images/tmp/data_title_icon3.png") no-repeat center;
            }
        }
        .page-con-box{
            @include blackBg(.2);
            overflow: hidden;
            padding: 10px;
            > div{
                position: relative;
                margin-right: 30px;
                float: left;
                span{
                    border-bottom:1px solid $lineColor;
                    display: block;
                    line-height:2;
                    padding-bottom: 3px;
                    margin-bottom: 15px;
                }
            }
            .con-box-data{
                width: 530px;
                margin-left:5px;
                .data-list{
                    width: 33.3%;
                    min-width: 170px;
                    float: left;
                    dl{
                        margin-bottom:8px;

                        dt{
                            height: 19px;
                            margin-bottom: 6px;
                        }
                    }
                    >span{
                        margin-right: 30px;
                     }
                    .green-font{
                        color: #14a10d;
                        font-size: 12px;
                    }
                    p{
                        font-size: 12px;
                        margin-bottom:0;
                        >strong{
                            font-weight: bold;
                            font-size: 30px;
                         }
                         >em{
                            font-size: 11px;
                            margin-left: 5px;
                          }
                    }
                }
            }
            .con-box-tool{
                width: 204px;
                margin-right: 50px;
            }
            .con-box-warn{
                width: 360px;
            }
            .con-box-report{
                width: 186px;
                margin-right: 0;
            }
        }
    }
    .ui-tool-list{
        li{
            @include blackBg;
            margin-bottom: 7px;
            font-size: 12px;
            line-height: 1;
            padding: 11px 0;
            padding-left: 28px;
            background-repeat:no-repeat;
            background-position:4px 7px;
            &.tool01{
                background-image: url("../../images/tmp/tool_icon_0.png");
             }
             &.tool02{
                 background-image: url("../../images/tmp/tool_icon_1.png");
             }
            &.tool03{
                 background-image: url("../../images/tmp/tool_icon_2.png");
             }
            &.tool04{
                 background-image: url("../../images/tmp/tool_icon_3.png");
             }

        }
    }
    .ui-warn-list{
        font-size: $f15;
        line-height: 2;
        padding: 10px 0;
    }
    .ui-report-list{
        margin-top:-15px;
        .ship-icon{
            background: url("../../images/tmp/nav_icon6.png") no-repeat center center;
        }
        .ship-icon2{
            background: url("../../images/tmp/nav_icon7.png") no-repeat center center;
        }
        >div{
            float: left;
            width: 48px;
            height: 59px;
         }
    }
</style>

<script lang="ts">
    import commonRight from "./common-right.vue";
    import {publicMethod} from "../modules/public";
    import {mapState,mapActions,mapMutations} from "vuex";

    let pMethos;

    export default{
        data(){
            return {
                infoData:{}
            }
        },
        mounted(){
            pMethos = publicMethod(this);   //引入公共方法
            this.getInfoData();
        },
        methods: {
            getInfoData(){
                var _this = this;
                var url = "json/pageHome.json";
                pMethos.ajaxRequest({
                    url:url,
                    type:"get",
                    jsonpCallback:"funHome",
                    callback(result){
                        _this.infoData = result || {};
                    }
                });
            }
        },
        computed:{

        },
        filters:{

        },
        components:{
            commonRight
        }
    }


</script>
