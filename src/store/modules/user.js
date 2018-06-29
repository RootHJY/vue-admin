import Cookies from 'js-cookie'
import { _getUserInfo } from '@/api/api.js'; 

// 应用初始状态
const user = {
    state: {
        token: Cookies.get('loginToken'),
        username: Cookies.get('userName'),
        roles: [],
        avatar: '',
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ROLE: (state, roles) => {
            state.roles = roles;
        },
        SET_NAME: (state, username) => {
            state.username = username;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        }
    },
    actions: {
        logIn({ commit }, userInfo) {
            commit('SET_NAME', userInfo.data.username);
            commit('SET_TOKEN', userInfo.data.token);
            commit('SET_ROLE', userInfo.data.roles);

            Cookies.set("userName", userInfo.data.username);
            Cookies.set("loginToken", userInfo.data.token);
        },
        LogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_ROLE', []);
                commit('SET_NAME', '');
                commit('SET_TOKEN', '');
                
                Cookies.remove("userName");
                Cookies.remove("loginToken");
                resolve();
            })
        },
        getUserInfo({ commit, state }, token){
            return new Promise((resolve, reject) => {
                _getUserInfo(token).then(response => {
                    commit('SET_ROLE', response.data.roles);
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        } 
    }
}


export default user