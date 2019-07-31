<template>
  <div class="home">
    <!-- <Header></Header> -->
    <van-nav-bar
      :title="$route.name"
      :left-arrow="backShow"
      @click-left="onClickLeft"
    />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// import Header from "./header";
import { NavBar } from "vant";
export default {
  data() {
    return {
      backShow: false
    };
  },
  components: {
    // Header
    [NavBar.name]: NavBar
  },
  created() {
    this.backShow = this.$route.path === "/" ? false : true;
    console.log(this.$route);
  },
  watch: {
    $route(now, old) {
      if (now.path == "/") {
        this.backShow = false;
      } else {
        this.backShow = true;
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.home {
  /* padding-top: 44px; */
}
.container {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>


