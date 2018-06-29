<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="ismiddle">
        <el-breadcrumb-item  v-for="(item,index) in levelList" :key="index">
            <span v-if="item.redirect === 'noredirect' || index == levelList.length-1" class="no-redirect">     
                {{ generateTitle(item.meta.title) }}
            </span>
            <router-link v-else :to="item.redirect || item.path">
                {{ generateTitle(item.meta.title) }}
            </router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    import Cookies from 'js-cookie'
    import { generateTitle } from './common'
    export default {
        name: 'navbar',
        data () {
            return {
                levelList:[]
            }
        },
        created () {
            this.getBreadcrumb();
        },
        methods: {
            generateTitle,
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name);
                const second = matched[1];
                //区分admin 和 非admin 跳转的页面

                if(this.roles && this.roles.indexOf('admin') > -1){
                    matched = [{ path: '/admin', meta: { title: this.$t("pageTitle") }}].concat(second)
                }else{
                    matched = [{ path: '/admin/demo', meta: { title: this.$t("pageTitle") }}].concat(second)
                }

                this.levelList = matched;
                this.$set(this.$data, 'levelList', this.levelList);
            },  
        },
        computed: {
            roles() {
                return this.$store.state.user.roles;
            }
        },
        watch: {
            '$route':function(to, from) {
                this.getBreadcrumb()
            }
        }
    }
</script>