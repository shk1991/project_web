import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// index: 框架页
const index = r => require.ensure([], () => r(require('./views/index.vue')), 'group-index');

//登录
// const login = resolve => require(['./views/login.vue'],resolve);

//page a
const a = resolve => require(['./views/a.vue'],resolve);

//page b
const b = resolve => require(['./views/b.vue'],resolve);

//page c
const c = resolve => require(['./views/c.vue'],resolve);

const routes = [
    {
        path: '/',
        redirect: '/index/a'
    },
    {
        path: '/index',
        redirect: '/index/a'
    },
    {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            keepAlive: false
        },
        children: [
            { path: '',  component: a },
            { path: 'a', component: a },
            { path: 'b', component: b },
            { path: 'c', component: c }
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