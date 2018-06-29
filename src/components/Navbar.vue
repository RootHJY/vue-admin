<template>
    <div id="navbar" class="clearfix">
        <div class="leftMenu fleft">
            <i class="fa fa-reorder ismiddle" @click="toggleSide()"></i>
            <BreadCrumb></BreadCrumb>
        </div>
        <div class="rightMenu fright">
            <el-dropdown style="margin-right:20px;">
                <span class="el-dropdown-link">
                    {{ $t($i18n.locale) }}<i class="el-icon-arrow-down el-icon--right"></i>
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
                        <a target="_blank" href="http://www.baidu.com/">百度</a>
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
    import BreadCrumb from './BreadCrumb'
    import { generateTitle } from './common'
    export default {
        name: 'navbar',
        components: {
            BreadCrumb
        },
        created () {

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
            setLang(lang){
                Cookies.set('language',lang);
                this.$i18n.locale = lang;
            }
        },
        computed: {
            username() {
                return this.$store.state.user.username;
            }
        }
    }
</script>