<template>
  <div style="padding-top:40px;text-align:center;font-size:16px;">
    <p style="margin-bottom:20px;">{{message}}</p>
    <div>
      <router-link :to="{path:'/orderDetail',query:{id:orderId}}">
        <van-button
          type="info"
          size="small"
        >返回订单详情</van-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast, Button } from "vant";
export default {
  data() {
    return {
      orderId: this.$route.query.id,
      message: ""
    };
  },
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button
  },
  created() {
    this.pay();
  },
  methods: {
    pay() {
      let that = this;
      Toast.loading({
        message: "支付中...",
        duration: 1000
      });
      axios({
        method: "post",
        url: "http://route.showapi.com/1681-7",
        params: {
          showapi_appid: "100774",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          orderId: that.orderId
        }
      })
        .then(res => {
          if (res.status == 200 && res.data.showapi_res_code == 0) {
            this.message = res.data.showapi_res_body.remark;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

