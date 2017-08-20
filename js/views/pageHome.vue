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
                        <div class="ui form chart-tool-box">
                            <div class="inline field">
                                <div class="ui checkbox checked" v-for="(item,key) in chartSeleted" @click="refreshChart(key)">
                                    <input type="checkbox" tabindex="0" class="hidden" :checked="item">
                                    <label>{{key}}</label>
                                </div>

                            </div>
                        </div>
                        <div class="ui fluid" id="js-echart"></div>
                        <div class="chart-set-box" id="chart-select">
                            <div class="ui dropdown">
                                <div class="ui-title-button">SET</div>
                                <div class="menu">
                                    <div class="item ui checkbox checked" v-for="(item,key) in chartSeleted" @click="refreshChart(key)">
                                        <input type="checkbox" tabindex="0" class="hidden" :checked="item">
                                        <label>{{key}}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="ui-title-button padding nop">
                                <img src="../../images/tmp/refresh_icon.png" />
                            </div>

                        </div>
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
        .chart-tool-box{
            text-align: right;
            margin-top: -5px;
        }
        .chart-set-box{ text-align: right; margin-top: 10px;}
        #js-echart{
            height: 130px;
        }
        .page-con-box{
            @include blackBg(.2);
            /*overflow: hidden;*/
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

    let pMethos,vEcharts;

    export default{
        data(){
            return {
                infoData:{},
                chartLegend:[],
                chartOption:{},
                chartSeleted:{}
            }
        },
        mounted(){
            pMethos = publicMethod(this);   //引入公共方法
            vEcharts = echarts.init(document.getElementById("js-echart"),"macarons");
            this.getInfoData();
            this.drawChart();
            this.getChartData();
            this.$nextTick(()=>{
                $('.ui.checkbox').checkbox();
                $('#chart-select .dropdown').dropdown();
            })
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
            },
            getChartData(){
                var _this = this;
                var url = "json/homeChart.json";

                pMethos.ajaxRequest({
                    url:url,
                    type:"get",
                    jsonpCallback:"funHomeChart",
                    callback(result){
                        _this.drawChart(result);
                    }
                });
            },
            setChartLegend(obj){
                var _arr = [];
                var option = {};
                for(var _o in obj){
                    if(_o == "date"){
                        continue;
                    }
                    _arr.push(_o);
                    option[_o] = true;

                }
                this.chartSeleted = option;
                return _arr;
            },
            setSeriesData(arr){
                var _arr = [];
                var legendArray = this.chartLegend;
                var legendColor = ["#00cbfe","red","yellow"];
                for(var i= 0,l=legendArray.length; i<l; i++){
                    var obj = {
                        name:legendArray[i],
                        type:"line",
                        data:arr[i],
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        },
                        itemStyle:{
                            normal:{
                                color:legendColor[i]
                            }
                        }
                    }
                    _arr.push(obj);
                }
                return _arr;
            },
            refreshChart(key){
                this.chartSeleted[key] = !this.chartSeleted[key];
                vEcharts.setOption(this.chartOption);
            },
            drawChart(arr){
                var _this = this;
                var $lineColor = "#aeafaf";

                var xAxisData=[],seriesData=[],_arr = [];
                for(let i in arr){
                    var obj = arr[i];
                    if(i == 0){
                        this.chartLegend = this.setChartLegend(obj);
                    }
                    xAxisData.push(obj.date);

                    for(let x in this.chartLegend){
                        if(i == 0){
                            _arr[x] = [];
                        }
                        _arr[x].push(obj[this.chartLegend[x]]);
                    }
                }

                seriesData = this.setSeriesData(_arr);

                var option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        show:false,
                        data:_this.chartLegend,
                        selected:_this.chartSeleted
                    },
                    grid:{
                        top:20,
                        bottom:20,
                        left:20,
                        right:30
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : xAxisData,
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:$lineColor
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:$lineColor
                                }
                            },
                            splitLine:{
                                lineStyle:{
                                    color:"#404142"
                                }
                            }
                        }
                    ],
                    series : seriesData
                };

                _this.chartOption = Object.assign({},option);
                vEcharts.setOption(_this.chartOption);

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
