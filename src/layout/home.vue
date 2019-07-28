<template>
  <div class="home">
    <Header></Header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Header from "./header";
export default {
  data() {
    return {};
  },
  components: {
    Header
  }
};
</script>
<style>
.home {
  padding-top: 44px;
}
.container {
  position: fixed;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>


