 <template>
    <div class="top-header">
        <div class="logo-box">
            <img src="../../images/tmp/logo.png" alt="logo" />
            <time>{{nowTime}}</time>
        </div>
        <dl class="head-info">
            <dt></dt>
            <dd>
                <div class="head-info-box1">
                    <i></i>
                    {{headInfo.time.split(" ")[0] + "&nbsp;&nbsp;&nbsp;&nbsp;" + headInfo.time.split(" ")[1]}}    WCU07 ROS2   MESS ROS2
                    <span class="dropdown-icon">
                        <i class="angle double down icon"></i>
                    </span>
                </div>
                <div class="head-info-box2">
                    <i></i>
                    {{headInfo.time.split(" ")[0] + "&nbsp;&nbsp;&nbsp;&nbsp;" + headInfo.time.split(" ")[1]}}    WCU07 ROS2   MESS ROS2
                    <span class="dropdown-icon">
                        <i class="angle double down icon"></i>
                    </span>
                </div>
            </dd>
        </dl>
        <ul class="head-tool-menu clr">
            <li :class="item" v-for="item in headToolMenu"></li>
        </ul>
    </div>
</template>

<script>
    import {formatTime,format4Time} from "../modules/method";
    export default{
        data(){
            return {
                nowTime:formatTime((new Date()).getTime()),
                headInfo:{
                    time:format4Time((new Date()).getTime())
                },
                headToolMenu:["home","prev","next","user","set","tool6","tool7","tool8","tool9","close"]    //head-tool-menu类名
            }
        }
    }
</script>