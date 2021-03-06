import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

// 创建 store 实例
const store = new Vuex.Store({
    modules: {
        app,
        user
    },
    getters
})

export default store