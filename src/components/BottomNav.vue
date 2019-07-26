<template>
  <div class="bottomnav">
    <router-link to="/" class="navitem" active-class="active" exact>
      <span class="icon el-icon-s-home"></span>
      <p>首页</p>
    </router-link>
    <router-link to="/mine" class="navitem" active-class="active">
      <span class="icon el-icon-user-solid"></span>
      <p>我的</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottomnav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  padding-top: 4px;
  overflow: hidden;
  border-top: 1px solid #f0f0f0;
}

.navitem {
  float: left;
  width: 50%;
  text-align: center;
  color: #666;
  font-size: 14px;
  text-decoration: none;
  line-height: 18px;
  -webkit-tap-highlight-color: transparent;
}
.navitem .icon {
  display: inline-block;
  height: 20px;
  font-size: 20px;
}
.active {
  color: #009cff;
}
</style>
