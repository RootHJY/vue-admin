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
                levelList: null
            }
        },
        created () {
             this.getBreadcrumb();
        },
        methods: {
            generateTitle,
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name)
                const first = matched[0]
                if (first && first.name !== 'admin') {
                    matched = [{ path: '/admin', meta: { title: this.$t("pageTitle") }}].concat(matched)
                }
                this.levelList = matched;
            },
        }
    }
</script>