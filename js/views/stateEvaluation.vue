<template>
	<article id="pageState">
		<div class="state-nav-title">M/E</div>
	    <div class="state-left">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
	        <h3 class="state-title">afadf</h3>
            <div class="con-box">
                <div id="stateLineChart" ></div>
            </div>
            
            <div class="news-context-box">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div>
                    <img src="../images/pc-banner2.jpg">
                    <img src="../images/pc-banner3.jpg">
                </div>
                
            </div>

	    </div>
	    <div class="state-right">
	        
	    </div>
	</article>
</template>

<style lang="sass" scoped>
   @import "../../css/common";
	.state-nav-title{ background-color:rgba(0,0,0,.2); color:#fff; font-size:15px; line-height: 20px}
	.state-left{ float: left;width: 576px; height:630px;color:#fff;}
	.state-right{float: left;width: 1061px;background-color:rgba(0,0,0,.2); color:#fff;}
    #pageState .con-box{ width:574px;height:330px;background-color:rgba(0,0,0,.2); border: 1px solid #fff; height:335px; }
    #stateLineChart{height: 230px;}
    .news-context-box{height:350px; overflow-y:auto; color:#555; line-height:24px;}
    .news-context-box img{ margin:10px 0; display:block; text-align:center; margin:0 auto;}
    .news-pop-box .close-btn{ width:36px; height:36px; position:absolute; right:10px; top:10px;z-index:1001;}
    .news-pop-box .title{color:#b82a42; font-size:22px;}
</style>

<script>
	//import {publicMethod} form '../modules/public.js'

	export default{
        data(){
            return {
                infoData:"sdasdf"
            }
        },
         mounted() {  
            this.$nextTick(function() {  
                this.drawGraph('stateLineChart')  
            })   

        }, 
        methods:{
            drawGraph(id) {  
                // 基于准备好的dom，初始化echarts实例
                this.chart = echarts.init(document.getElementById('stateLineChart'));
                this.chart.showLoading() ;

                var $lineColor = "#aeafaf"; 

                // 指定图表的配置项和数据
                var option = {
                        backgroundColor: '#2c343c',
                        title: {
                            text: 'Fuel Efficiency Analysis',
                            textStyle: {
                               color: 'rgba(255, 255, 255, 0.8)'
                            },
                            subtext: 'Fuel Efficiency (g/kwh)'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['最高气温']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},
                                magicType: {type: ['line', 'bar']},
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            data: ['0','9','14','23','29','36','43','52','60'],
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:$lineColor
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} °C'
                            },
                            axisLine:{
                                show:true,
                                lineStyle:{
                                    color:$lineColor
                                }
                            }
                        },
                        series: [
                            {
                                name:'最高气温',
                                type:'line',
                                data:[22.8, 23.5, 23, 24.5, 21.5, 22, 21.5,23.8,22.5],
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                }
                            }
                        ]
                };

                // 使用刚指定的配置项和数据显示图表。
                this.chart.setOption(option);
                this.chart.hideLoading()  


            }  
        },  
        computed:{

        },
        filters:{

        },
        components:{

        }


    }


</script>