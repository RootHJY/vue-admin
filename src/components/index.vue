<template>
    <div id="container">
        <sidebar :class="{ min: sidebar }"></sidebar>
        <div id="appRight" :class="{ big: sidebar }">
            <navbar></navbar>
            <app-main  v-loading="loading"></app-main>
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar'
    import Sidebar from './Sidebar'
    import AppMain from './AppMain'
    export default {
        name: 'index',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        data() {
            return {
                loading: true
            }
        },
        created () {

        },
        mounted: function () {
            this.loading = false
        },
        methods: {

        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar;
            }
        }
    }
</script>