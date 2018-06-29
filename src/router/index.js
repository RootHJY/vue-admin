import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'


const demoComponents = r => require.ensure([], () => r(require('../views/demo')), 'demo');
const notFound = r => require.ensure([], () => r(require('../views/404')), 'notFound');

const Layout = r => require.ensure([], () => r(require('../components/index')), 'Layout');

const membersComponents = r => require.ensure([], () => r(require('../views/members/index')), 'members');
const loginComponents = r => require.ensure([], () => r(require('../views/login/login')), 'login');


Vue.use(Router)

export const sideRouters = [
    {
        path: '/',
        name: 'members',
        redirect: 'members',
        meta: { title: 'members', icon: 'user-plus', roles: ['admin']},
        hidden: true
    },
    {
        path: '/admin/demo',
        name: 'demo',
        component: demoComponents,
        meta: { title: 'demo', icon: 'hand-peace-o', roles: ['admin', 'user']}
    },
    {
        path: '/admin/members',
        name: 'members',
        component: membersComponents,
        meta: { title: 'members', icon: 'user-plus', roles: ['admin']}
    }
]  


//所有一级路由
export const AllRouterMap = [
    {
        path: '',
        name: 'index',
        redirect: '/login',
        meta: { title: 'index' },
        hidden: true
    },
    {
        path: '/login',
        name: 'login',
        component: loginComponents,
        meta: { title: 'login' },
        hidden: true
    },
    {
        path: '/admin',
        name: 'admin',
        component: Layout,
        meta: { title: 'admin', requireAuth: true },
        children: sideRouters
    },
    {
        path: '*',
        name: '404',
        component: notFound,
        hidden: true,
        meta: { title: 'notFound', icon: 'notFound' }
    }
]


export default new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: AllRouterMap,
    sideRouters: sideRouters
})

