<template>
  <div class="home">
    <button @click="buttonTest">First</button>
    <span>131231345379797086786</span>
    <router-view></router-view>
  </div>
</template>l

<script>
  //  import mui from "@/src/assets/js/mui.js"
  import {Indicator} from 'mint-ui';

  const first = {
    components: {
      Indicator
    },
    methods: {
      buttonTest: function () {
        this.$router.push({name: "second"});
      }
    }
  };

  export default first;
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