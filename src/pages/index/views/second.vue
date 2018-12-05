<template>
  <div class="home">
    <button @click="buttonTest">Second</button>
    <span>asfjlsafjskljskljl</span>
  </div>
</template>l

<script>
  //  import mui from "@/src/assets/js/mui.js"
  import {Indicator} from 'mint-ui';

  const second = {
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

  export default second;
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