import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store/store'
import router from './router'
import * as filters from './filters' 
import i18n from './lang' 
import Cookies from 'js-cookie'
import 'font-awesome/css/font-awesome.css'
import '../static/css/page.css?ver=2017093'

Vue.config.productionTip = false;

require('./mock/index.js');

Vue.use(ElementUI, {
    size: 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
});

//注册全局过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const whiteList = ['/login', '/authredirect'] 

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

router.beforeEach((to, from, next) => {
    let loginToken = Cookies.get('loginToken');  //获取登录token
    let roles = store.getters.roles;        //获取当前用户权限
    if(loginToken){  //已登陆状态
        if (to.path === '/login') {
            if (roles != 'admin') {
                next('/admin/demo');
            }else{
                next('/admin')
            }
        }else{
            if (!!roles) {   //刷新权限不存在 重新获取
                store.dispatch('getUserInfo', loginToken).then(res => {
                    //刷新后获取角色 判断是否有权限访问当前页面
                    if (hasPermission(res.roles, to.meta.roles)) {
                        next();
                    }else {
                        next({ path: '/404', replace: true });
                    }
                })
            }else{  //当前路由是否有权限访问
                if (hasPermission(roles, to.meta.roles)) {
                    next() 
                }else {
                    next({ path: '/404', replace: true })
                }
            }
        }
    }else{ //未登陆状态
        if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        }else {
            next('/login') // 否则全部重定向到登录页
        }
    }
})

new Vue({
    el: '#app',
    store,
    router,
    i18n,
    components: { App },
    template: '<App/>'
})
