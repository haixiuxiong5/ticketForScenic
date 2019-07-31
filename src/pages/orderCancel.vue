<template>
  <div style="padding-top:40px;font-size:16px;">
    <div v-if="showcancel">
      <van-cell-group style="margin-bottom:20px;">
        <van-field
          v-model="reason"
          label="取消原因"
          type="textarea"
          placeholder="选填"
          rows="3"
          autosize
        />
      </van-cell-group>
      <div style="text-align:center;">
        <van-button
          type="info"
          size="small"
          @click="cancelorder"
        >取消订单</van-button>
      </div>
    </div>
    <div
      class="goDetail"
      v-if="!showcancel"
      style="text-align:center;"
    >
      <p style="margin-bottom:20px;">{{message}}</p>
      <router-link :to="{path:'/orderDetail',query:{id:orderId}}">
        <van-button
          type="info"
          size="small"
        >查看订单详情</van-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast, Button, Field, CellGroup } from "vant";
export default {
  data() {
    return {
      orderId: this.$route.query.id,
      showcancel: true,
      reason: "",
      message: ""
    };
  },
  components: {
    [Toast.name]: Toast,
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  created() {},
  methods: {
    cancelorder() {
      let that = this;
      Toast.loading({
        message: "取消...",
        duration: 1000
      });
      axios({
        method: "post",
        url: "http://route.showapi.com/1681-8",
        params: {
          showapi_appid: "100774",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          orderId: that.orderId,
          remark: that.reason
        }
      })
        .then(res => {
          if (res.status == 200 && res.data.showapi_res_code == 0) {
            that.showcancel = false;
            that.message = res.data.showapi_res_body.remark;
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

