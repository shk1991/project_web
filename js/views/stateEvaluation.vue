<template>
	<article id="pageState">
		<div class="state-nav-title">Health Status Assessment   >>   M/E Health Status Overview</div>
	    <div class="state-left">
            
	        
            <div class="con-box">
                <h3 class="state-title">Fuel Efficiency Analysis</h3>
                <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
                <div id="stateLineChart" ></div>
            </div>
            
            <div class="engine-box">
                <h3 class="state-title">M/E Fault Alarms:</h3>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <div class="img-list">
                    <img src="../../images/tmp/img1.png">
                    <img src="../../images/tmp/img1.png">
                    <img src="../../images/tmp/img1.png">
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
	.state-left{ float: left;width: 576px; color:#fff;margin-top: 10px;}
	.state-right{float: left;width: 1061px;background-color:rgba(0,0,0,.2); color:#fff;}
    #pageState .con-box{ width:574px;height:330px;background-color:rgba(0,0,0,.2); }
    #pageState .con-box .state-title{ border-bottom:1px solid #535456; line-height: 56px; padding: 0 14px; font-weight: normal; font-size:15px;}
    #stateLineChart{height: 230px;}
    .engine-box{color:#555; line-height:24px;background-color:rgba(0,0,0,.2);margin-top:10px;}
    .engine-box .state-title{ border-bottom:1px solid #535456; line-height: 56px; padding: 0 14px; font-weight: normal; font-size:15px;}
    #stateLineChart{height: 230px;}
    .engine-box img{ margin:10px 0; display:block; text-align:center; margin:0 auto;}
    .img-list{height:640px; overflow-y:auto; }
    .engine-box .title{color:#b82a42; font-size:22px;}
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
                        //backgroundColor: '#2c343c',
                        title: {
                            text: 'Fuel Efficiency (g/kwh)',
                            textStyle: {
                               color: 'rgba(255, 255, 255, 0.8)',
                               fontSize:'12px'
                            },
                        },
                        tooltip: {
                            trigger: 'axis'
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
                            },
                            splitLine: {
                                show: false
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