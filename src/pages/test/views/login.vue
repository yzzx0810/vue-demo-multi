<template>
    <div class="home">
        <button @click="buttonTest">Test</button>
        <span>131231345379797086786</span>
    </div>
</template>

<script>

    const login = {
        components: {},
        methods: {
            buttonTest() {
                let param = {
                    name: "niu niu niu"
                };
                this.$store.dispatch('setNameAction', param);
            }
        }
    };

    export default login;
</script>

<style lang="scss" scoped>
    @import "../../../scss/test/login";

    .home {
        span {
            font-size: 50px;
        }
    }
</style>
<!--<style lang="css" scoped>-->
<!--@import "../../../css/test/login.css";-->
<!--</style>-->