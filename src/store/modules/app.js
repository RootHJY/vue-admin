import Cookies from 'js-cookie'

// 应用初始状态
const app = {
    state:{
        sidebar: !+Cookies.get('sidebar')
    },
    mutations: {
        toggleSidebar: (state) => {
            if(state.sidebar) {
                Cookies.set('sidebar', 1)
            }else{
                Cookies.set('sidebar', 0)
            }
            state.sidebar = !state.sidebar; 
        }
    }
}


export default app