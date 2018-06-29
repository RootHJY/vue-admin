<template>
    <div id="sidebar">
        <div class="logo">
            <template v-if="roles == 'admin'">
                <router-link :to="{ path: '/admin'}">
                    <img class="logo_b" src="/static/img/logo.png" alt="logo">
                    <img class="logo_s" src="/static/img/logo.png" alt="logo">
                </router-link>
            </template>
            <template v-if="roles != 'admin'">
                <router-link :to="{ path: '/admin/demo'}">
                    <img class="logo_b" src="/static/img/logo.png" alt="logo">
                    <img class="logo_s" src="/static/img/logo.png" alt="logo">
                </router-link>
            </template>
        </div>
        <div v-for="(item, index) in routerList" :key="item.name" v-if="!item.hidden">
            <el-menu default-active="1" background-color="#304156" text-color="rgb(191, 203, 217)">
                <template v-if="!item.children">
                    <el-menu-item index="index">
                        <router-link :to="item.path">
                            <span class="fa" :class="'fa-' + item.meta.icon"></span> 
                            <span :class="{ hide: sidebar }"> {{ generateTitle(item.meta.title) }}</span> 
                        </router-link>
                    </el-menu-item>
                </template>
                <template v-if="item.children">
                    <el-submenu :index="item.path">
                        <template slot="title" >
                            <span class="fa" :class="'fa-' + item.meta.icon"></span>
                            <span :class="{ hide: sidebar }">{{ generateTitle(item.meta.title) }} </span>
                        </template> 
                        <el-menu-item  v-if="item.children" v-for="(list,child) in item.children" :key="list.name" :index="list.path" :class="{ min: sidebar }">
                            <router-link :to="item.path + '/'+ list.path">
                                <span class="fa" :class="'fa-' + list.meta.icon"></span>
                                <span :class="{ hide: sidebar }">{{ generateTitle(list.meta.title) }}</span>
                            </router-link>
                        </el-menu-item>
                    </el-submenu>
                </template> 
            </el-menu>
        </div>
    </div>
</template>
<style scss scoped>
    a{ display: inline-block; }
    .el-menu{ border-right:0px none; }
    .el-menu-item.min{ padding-left: 20px!important; }
    .el-menu-item a{ color:rgb(191, 203, 217); }
    .el-menu-item .router-link-active{ color:#66b1ff;}
    .el-submenu .el-menu-item{ min-width:100%; }
</style>

<script>
    import { generateTitle } from './common'
    export default {
        name: 'sidebar',
        data () {
            return {
                routerList: []
            }
        },
        created () {
            this.getSideBar(this.roles);
        },
        methods: {
            generateTitle,
            getSideBar(roles){
                let allSideBar = this.$router.options.sideRouters;
                this.routerList = this.filterRouter(allSideBar, roles);
            },
            hasPermission(roles, route) {
                if (route.meta && route.meta.roles) {
                    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
                }else {
                    return false
                }
            },
            filterRouter(routerApp, roles) {
                const accessedRouters = routerApp.filter(route => {
                    if(this.hasPermission(roles, route)) {
                        if (route.children && route.children.length) {
                            route.children = this.filterRouter(route.children, roles)
                        }
                        return true
                    }
                    return false
                })
                return accessedRouters
            }
        },
        computed: {
            roles() {
                return this.$store.state.user.roles;
            },
            sidebar(){
                return this.$store.state.app.sidebar;
            }
        },
        watch:{
            roles: function(){
                this.getSideBar(this.roles)
            }
        }
    }
</script>
