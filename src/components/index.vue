<template>
    <div id="container">
        <sidebar :class="{ min: sidebar }"></sidebar>
        <div id="appRight" :class="{ big: sidebar }">
            <navbar></navbar>
            <app-main></app-main>
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
        created () {

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