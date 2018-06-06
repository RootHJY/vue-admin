<template>
    <div id="main">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'appmain',
        data () {
            return {
                
            }
        },
        created () {

        },
        methods: {
      
        }
    }
</script>