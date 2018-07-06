# manage

> roothjy admin

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build


# /static css + img   静态资源


#/src/ 下的文件夹
#/api   通过axios(类似Ajax)  封装所有请求url & params(参数)  
#        mockjs会自动接受到请求url返回相应的数据


#/compoents
#   AppMain.vue     用来放页面的具体内容 top(Navbar) + left(SideBar) + AppMain  = 一个完整页面
 
#   BreadCrumb.vue  面包屑导航

#   common.js   所有常用js 可以直接调用  
#                uniqueArr数组去重  
#                generateTitle 通过$t(i81N自带的函数) 函数和路由的参数翻译成对应的多语言

#   index.vue  集成top(Navbar) + left(SideBar) + AppMain  默认首页     

#   Navbar    顶部模块 内置BreadCrumb面包屑导航 退出和多语言切换

#   SideBar  侧边栏 通过watch 监听角色roles 返回对应的可访问侧边栏路由

#   title  处理当前的网页title 网上找的

#   /filters  所有的过滤器 用法 {{ data | formatDateMore }}

#   /lang 多语言配置文件和字段  vue-i18n 百度文档用法

#   /mock 仿造后台接口 用来返回数据

#   /router AllRouterMap所有一级路由  sideRouters 侧边栏路由是admin的子路由  
 
#   /store  vuex 全局数据管理  
#        state 存储数据变量
#        mutations 获取数据的方法  
#        actions 处理异步请求
#        getters  返回所有数据

#   /views  所有页面管理



