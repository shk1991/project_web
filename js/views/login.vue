<template>
    <article class="login bg" :style="{height:height+'px', width:'100%'}">
        <form class="ui form">
            <h1>管理员登录</h1>
            <div class="field">
                <label>用户名</label>
                <input @input="input($event,'username')" type="text" name="userName" placeHolder="" v-model.trim="username">
            </div>
            <div class="field">
                <label>密码</label>
                <input @input="input($event,'password')" type="password" name="userPsd" placeHolder="" v-model.trim="password">
            </div>
            <div class="errMessage">{{errMessage}}</div>
            <div class="submit-btn">
                <a v-if="!isLoading" class="ui button" @click="submitForm()">登录</a>
                <button v-if="isLoading" type="button" class="qc-log-btn lg" style="display:block;">
                    <div class="m-loading">
                        <div class="lo ading">
                            <div class="one"></div>
                            <div class="two"></div>
                            <div class="three"></div>
                        </div>
                    </div>
                </button>
            </div>
        </form>
    </article>
</template>


<script>
    import {confirmFn,commonInteface} from "../../js/modules/public.js";
    var urlObj = {
        "login":"/wx/manage/login",    //登陆
    }
    export default {
        data(){
            return {
                "isLoading":false,
                "username":"",
                "password":"",
                "errMessage":"",
                "height":'',
            }
        },
        mounted(){
            this.height=window.innerHeight>window.screen.availHeight?window.innerHeight:window.screen.availHeight;
            window.addEventListener('resize',()=>{
                this.height=window.innerHeight>window.screen.availHeight?window.innerHeight:window.screen.availHeight;
            })
        },
        methods:{
            input(obj,name){    //兼容中文输入法时，选择历史记录
                var value = obj.target.value;
                if(this[name] != value){
                    this[name] = $.trim(value);
                }
            },
            submitForm(){
                var _this=this;
;                if(this.username == ""){
                    this.errMessage="请输入用户名"
                    return
                }
                if(this.password == ""){
                    this.errMessage="请输入密码"
                    return
                }
                var _data={
                    "username":this.username,
                    "password":this.password
                }
                _this.isLoading = true;
                $.ajax({
                    type:"post",
                    contentType: "application/x-www-form-urlencoded",
                    url : commonInteface + urlObj.login,
                    dataType: "json",
                    data:_data,
                    success:function(result){
                        let errorCode = result.error_code;
                        if(errorCode == 0 && result.data.token){
                            var userInfo={
                                "username":_this.username,
                                "token":result.data.token
                            }
                            try{
                                window.localStorage.setItem("userInfo",JSON.stringify(userInfo));
                                _this.$store.commit("setUserInfo",userInfo);
                                _this.$router.push('/index');
                            }catch (error){
                                alert("请取消浏览器无痕模式");
                            }
                        }else{
                            if(errorCode == 61000){
                                confirmFn.init("您的账号已被冻结，请联系管理员解除限制");
                            }else if(errorCode == 61002){
                                var errorCount = Number(result.data.errorCount);
                                var tipInfo = errorCount == 5 ? `您的密码有误账号已被冻结，请联系管理员解除限制"` : `您的密码有误，再输错${5-errorCount}次，账号将会被冻结`;
                                confirmFn.init(tipInfo);
                            }else{
                                confirmFn.init(result.error_msg || "请求失败");
                            }
                        }
                    },
                    error:function(error){
                        console.log(error);
                    },
                    complete:function(){
                        _this.isLoading = false;
                    }
                });
            }
        }
    }

</script>
<style lang="sass">

    .login{
        &.bg{
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: center top;
            background-color: #2d2d2c;
            //background-attachment:fixed;
            background-image: url('../../images/bg2.png');
        }
        form{
            width:23%;
            min-width: 250px;
        //height:46%;
            background-color:#fff;
            position:absolute;
            top:31%;
            left:58%;
            padding:20px 30px;
            border-radius:4px;
            border-top:3px solid #ff9933;
            h1{
                color:#585858;
                font-size:22px;
                margin-bottom:35px;

            }
            p{
                color:#ff4f1a;
                font-size:16px;
            }
            input:focus{
                outline:none!important;
            }
        }
        .ui.form input[type=text]:focus,.ui.form input[type=password]:focus{
            border-color:#ff9933;
        }
        .ui.button{
            width:100%;
            background-color:#ff9933;
            color:#fff;
            font-size:21px;
            font-weight:normal;
            line-height:40px;
            padding:0;
            margin:0;
            transform: scale(1,1);
        }
        .ui.button:hover,.ui.button:focus,.ui.button:active{
            background-color:#ff9933;
            color:#fff;
        }
        .ui.button:active{
            transform: scale(0.95,0.95);
        }
        .ui.form .field>label{
            color:#808080;
            font-size:16px;
            font-weight:normal;
        }
        .ui.error.message{
            box-shadow:none;
            background-color:#fff;
            padding:0;
            color:#ff4f1a;
            font-size:16px;
            margin:0;
        }
        .errMessage{
            color:#ff4f1a;
            font-size:14px;
        }

        .submit-btn{
            margin:20px 0 40px 0;
        }

        /*登陆loging*/
        .qc-log-btn {
            width: 100%;
            height: 40px;
            -webkit-appearance: none;
            background-color: #ff9933;
            border: none;
            color: #fff;
            outline: 0;
            border-radius: .28571429rem;
        }

        /*.qc-log-btn:hover {*/
            /*background-color: #0097ee*/
        /*}*/

        .qc-log-btn.disabled,.qc-log-btn.disabled:hover {
            background-color: #d0d0d0;
            color: #fff
        }
        .m-loading {
            text-align: center
        }

        .m-loading .loading>div {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 100%;
            background-color: #fff;
            -webkit-animation: bouncedelay .7s infinite ease-in-out both;
            animation: bouncedelay .7s infinite ease-in-out both;
            text-align: center;
            margin-left: 4px;
            margin-right: 4px
        }

        .m-loading .loading .one {
            -webkit-animation-delay: -.32s;
            animation-delay: -.32s
        }

        .m-loading .loading .two {
            -webkit-animation-delay: -.16s;
            animation-delay: -.16s
        }

        @-webkit-keyframes bouncedelay {
            0%,100%,80% {
                -webkit-transform: scale(.5);
                opacity: 1
            }

            40% {
                -webkit-transform: scale(1);
                opacity: .8
            }
        }

        @keyframes bouncedelay {
            0%,100%,80% {
                -webkit-transform: scale(.5);
                transform: scale(.5);
                opacity: 1
            }

            40% {
                transform: scale(1);
                -webkit-transform: scale(1);
                opacity: .8
            }
        }
    }



</style>