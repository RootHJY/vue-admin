import Cookies from 'js-cookie'

// 应用初始状态
const app = {
    state:{
        sidebar: Cookies.get('SideBar')
    },
    mutations: {
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar; 
            Cookies.set('SideBar', state.sidebar);
        }
    }
}


export default app