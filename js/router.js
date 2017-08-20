import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// index: 框架页
const index = r => require.ensure([], () => r(require('./views/index.vue')), 'group-index');

//登录
// const login = resolve => require(['./views/login.vue'],resolve);

//page a
const pageHome = resolve => require(['./views/pageHome.vue'],resolve);

//page b
const b = resolve => require(['./views/b.vue'],resolve);

//page c
const c = resolve => require(['./views/c.vue'],resolve);

//page stateEvaluation
const stateEvaluation = resolve => require(['./views/stateEvaluation.vue'],resolve);

const routes = [
    {
        path: '/',
        redirect: '/index/pageHome'
    },
    {
        path: '/index',
        redirect: '/index/pageHome'
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            keepAlive: false
        },
        children: [
            { path: '',  component: pageHome },
            { path: 'pageHome', component: pageHome },
            { path: 'b', component: b },
            { path: 'c', component: c },
            { path: 'stateEvaluation', component: stateEvaluation }
            
        ]
    },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: login,
    //     meta: {
    //         keepAlive: false
    //     }
    // }
];

export default new Router({
    routes
});