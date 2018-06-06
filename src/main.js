import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store/store'
import router from './router'
import * as filters from './filters' 
import i18n from './lang' 
import Cookies from 'js-cookie'

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


router.beforeEach((to, from, next) => {
    let isLogin = Cookies.get('loginToken');
    if (to.path === '/login') {
        next();
        return;
    }
    if(isLogin){
        next();
    }
    else{
        next({ path: '/login' })
    }
})

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>',
    created() {
        //试调代码
    }
})
