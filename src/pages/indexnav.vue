<template>
  <div>
    <router-view></router-view>
    <BorromNav></BorromNav>
  </div>
</template>
<script>
import BorromNav from "../components/BottomNav";
export default {
  data() {
    return {};
  },
  components: {
    BorromNav
  }
};
</script>
<style scoped>
</style>


