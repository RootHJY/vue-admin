import Vue from 'vue'
import Router from 'vue-router'

//element 表单·数据·多语言例子
const demoComponents = r => require.ensure([], () => r(require('../views/demo')), 'demo')

const Layout = r => require.ensure([], () => r(require('../components/index')), 'Layout')
const loginComponents = r => require.ensure([], () => r(require('../views/login/login')), 'login')

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: loginComponents
        },
        {
            path: '/admin',
            name: 'admin',
            component: Layout,
            meta: {requireAuth: true, title: 'admin', icon: 'admin'  },
            children: [
                {
                    path: '',
                    name: 'members',
                    redirect: 'members',
                    meta: { title: 'members', icon: 'members' }
                },
                {
                    path: 'members',
                    name: 'members',
                    component: () => import('@/views/members/index'),
                    meta: { title: 'members', icon: 'members' }
                },
                {
                    path: 'demo',
                    name: 'demo',
                    component: demoComponents,
                    meta: { title: 'demo', icon: 'demo' }
                }
            ]
        }
    ]
})
