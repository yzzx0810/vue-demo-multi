<template>
  <div class="home">
    <button @click="buttonTest">First</button>
    <span>131231345379797086786</span>
  </div>
</template>l

<script>
  //  import mui from "@/src/assets/js/mui.js"
  import {Indicator} from 'mint-ui';

  const login = {
    components: {
      Indicator
    },
    methods: {
      buttonTest: () => {
        let a = "fadfasf";
        window.alert(a);
        Indicator.open('加载中...');
        setTimeout(function () {
          Indicator.close();
        }, 2000);
      }
    }
  };

  export default login;
</script>

<style lang="scss" scoped>
  @import "../../../scss/index/first";

  .home {
    span {
      font-size: 10px;
      font-weight: bold;
    }
  }
</style>
<!--<style lang="css" scoped>-->
<!--@import "../../../css/test/login.css";-->
<!--</style>-->