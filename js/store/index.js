import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
    state: {
        operateObj:{
            view:"查看",
            edit:"编辑",
            new:"新增",
            up:"上架",
            down:"下架",
            del:"删除"
        },
        userInfo:null
    },
    // getters,
    actions,
    mutations,
    strict: debug
});

if(module.hot){
    module.hot.accept([
        // './getters',
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            // getters: require('./getters').default,
            actions: require('./actions').default,
            mutations: require('./mutations').default
        })
    })
}

export default store;