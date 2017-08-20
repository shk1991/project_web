<template>
	<article>
		<div class="state-nav-title">M/E</div>
	    <div class="state-left">
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
	        <h3 class="state-title">afadf</h3>
            <div id="echart-box" style="width: 600px;height:400px;"></div>
	    </div>
	    <div class="state-right">
	        
	    </div>
	</article>
</template>

<style lang="sass" scoped>
	.state-nav-title{ background-color:rgba(0,0,0,.2); color:#fff; font-size:15px; line-height: 20px}
	.state-left{ float: left;width: 576px; height:330px;background-color:rgba(0,0,0,.2); color:#fff;}
	.state-right{float: left;width: 1061px;background-color:rgba(0,0,0,.2); color:#fff;}
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
                this.drawGraph('echart-box')  
            })   

        }, 
        methods() {
            drawGraph(id) {  
                // 基于准备好的dom，初始化echarts实例
                this.chart = echarts.init(document.getElementById('echart-box'));
                this.chart.showLoading()  

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: 'ECharts 入门示例asdfsd'
                    },

                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                this.chart.setOption(option);


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