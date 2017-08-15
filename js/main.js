import Vue from 'vue';

import store from './store';
import router from './router';
import App from './app';

// import {dataFormat} from 'method';

 // router.beforeEach((to, from, next) => {
 //     if(!(to.path.slice(1) == "login")){
 //         var userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
 //         if(!userInfo){
 //             router.push("login");
 //         }else{
 //             !store.state.userInfo ? store.commit("setUserInfo",userInfo) : "";
 //         }
 //     }
 //     next();
 // });

var appVue = new Vue({
    el: "#app",
    router,
    store,
    render: h=>h(App)
});