<template>
    <div id="navbar" class="clearfix">
        <div class="leftMenu fleft">
            <i class="el-icon-menu ismiddle" @click="toggleSide()"></i>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="ismiddle">
                <el-breadcrumb-item  v-for="(item,index) in levelList">
                    <span v-if="item.redirect === 'noredirect' || index == levelList.length-1" class="no-redirect">     
                        {{ generateTitle(item.meta.title) }}
                    </span>
                    <router-link v-else :to="item.redirect || item.path">
                        {{ generateTitle(item.meta.title) }}
                    </router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="rightMenu fright">
            <el-dropdown style="margin-right:20px;">
                <span class="el-dropdown-link">
                    中文<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >
                        <p @click="setLang('zh')">中文</p>
                    </el-dropdown-item>
                    <el-dropdown-item >
                        <p @click="setLang('en')">English</p>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <a target="_blank" href="http://testwww.coinfit.io/">交易所地址</a>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <p @click="logOut()">退出登录</p>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import { generateTitle } from './common'
    export default {
        name: 'navbar',
        data () {
            return {
                levelList: null
            }
        },
        created () {
             this.getBreadcrumb();
        },
        methods: {
            generateTitle,
            toggleSide() {
                this.$store.commit('toggleSidebar');
            },
            logOut() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload();
                })
            },
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0]
                if (first && first.name !== 'admin') {
                    matched = [{ path: '/admin', meta: { title: this.$t("pageTitle") }}].concat(matched)
                }
                this.levelList = matched;
            },
            setLang(lang){
                Cookies.set('language',lang);
                this.$i18n.locale = lang
            }
        },
        computed: {
            username() {
                return this.$store.state.user.username;
            }
        }
    }
</script>