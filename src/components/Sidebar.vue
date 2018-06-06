<template>
    <div id="sidebar">
        <div class="logo">
            <router-link :to="{ path: '/admin'}">
                <img class="logo_b" src="/static/img/logoTxt.png" alt="logo">
                <img class="logo_s" src="/static/img/logo.png" alt="logo">
           </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sidebar',
        data () {
            return {}
        },
        created () {},
        methods: {}
    }
</script>
