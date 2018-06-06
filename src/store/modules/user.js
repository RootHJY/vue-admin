import Cookies from 'js-cookie'
// 应用初始状态
const user = {
    state: {
        token: Cookies.get('LoginToken'),
        username: Cookies.get('userName'),
        avatar: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
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
            commit('SET_TOKEN', 'LoginToken');

            Cookies.set("userName", userInfo.data.username);
            Cookies.set("loginToken","LoginToken");
        },
        LogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_NAME', '');
                commit('SET_TOKEN', '');
                Cookies.remove("userName");
                Cookies.remove("loginToken");
                resolve();
            })
        }
    }
}


export default user