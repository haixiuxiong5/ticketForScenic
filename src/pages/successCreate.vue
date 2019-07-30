<template>
  <div class="success">
    <p>
      <van-icon
        name="success"
        size="20px"
        color="#fff"
      />订单创建成功!
    </p>
    <p class="goDetail">
      <router-link :to="{path:'/orderDetail',query:{id:orderId}}">
        <van-button
          type="info"
          size="small"
        >查看订单详情</van-button>
      </router-link>
    </p>
  </div>
</template>
<script>
import { Icon, Button } from "vant";
export default {
  data() {
    return {
      orderId: this.$route.query.id
    };
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  }
};
</script>
<style scoped>
.success {
  padding-top: 30px;
  text-align: center;
  line-height: 22px;
}
.goDetail {
  margin-top: 30px;
}
.van-icon {
  margin-right: 10px;
  background-color: #1989fa !important;
  border-radius: 50%;
  vertical-align: middle;
}
</style>


