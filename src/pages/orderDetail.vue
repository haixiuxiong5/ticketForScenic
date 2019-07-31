<template>
  <div class="orderdetail">
    <div class="panel">
      <h2 class="title">订单信息</h2>
      <van-cell-group>
        <van-cell
          title="订单总价"
          :value="orderInfo.amoutPrice"
        />
        <van-cell
          title="订单状态"
          :value="orderInfo.orderStatus"
        />

        <van-cell
          title="订单编号"
          :value="orderInfo.orderId"
        />
        <van-cell
          title="订购时间"
          :value="orderInfo.orderTime"
        />
        <van-cell
          v-if="orderInfo.cancelRemark"
          title="取消原因"
          :value="orderInfo.cancelRemark"
        />
        <van-cell
          v-if="orderInfo.causeContent"
          title="退票原因"
          :value="orderInfo.causeContent"
        />
        <van-cell
          v-if="orderInfo.refund"
          title="可退金额"
          :value="orderInfo.refund"
        />
      </van-cell-group>
    </div>
    <div class="panel">
      <h2 class="title">门票信息</h2>
      <van-cell-group>
        <van-cell
          title="景点名称"
          :value="orderInfo.scenicName"
        />
        <van-cell
          title="使用日期"
          :value="orderInfo.startTime"
        />
        <van-cell
          title="门票数量"
          :value="orderInfo.bookNumber"
        />
        <van-cell
          title="入园方式"
          :value="orderInfo.enterCertificateType"
        />
        <van-cell
          title="入园凭证"
          :value="orderInfo.enterCertificateTypeInfo"
        />
        <van-cell
          title="入园凭证说明"
          :value="orderInfo.enterCertificateTxt"
        />
        <van-cell
          title="取票地址"
          :value="orderInfo.pickUpAddress"
        />
      </van-cell-group>
    </div>
    <div class="panel">
      <h2 class="title">取票人</h2>
      <van-cell-group>
        <van-cell
          title="取票人姓名"
          :value="orderInfo.contactName"
        />
        <van-cell
          title="取票人电话"
          :value="orderInfo.contactTel"
        />
        <van-cell
          title="取票人证件号"
          :value="orderInfo.psptId"
        />
      </van-cell-group>
    </div>
    <!-- <div class="panel">
      <h2 class="title">游客信息</h2>
      <van-cell-group>
        <van-cell
          title="游客姓名"
          :value="orderInfo.tourist.name"
        />
        <van-cell
          title="游客手机号"
          :value="orderInfo.tourist.tel"
        />
        <van-cell
          title="游客证件类型"
          :value="orderInfo.tourist.psptType"
        />
        <van-cell
          title="游客证件号"
          :value="orderInfo.tourist.psptId"
        />
      </van-cell-group>
    </div> -->
    <div v-if="orderInfo.orderStatus=='待付款'||'待确认'">
      <van-submit-bar
        :price="orderInfo.amoutPrice*100"
        button-text="立即支付"
        @submit="onPay"
      >
        <van-button
          style="margin-left:15px;"
          type="default"
          size="small"
          @click="orderCancel"
        >取消订单</van-button>
      </van-submit-bar>
    </div>
    <div v-if="orderInfo.orderStatus=='已完成'">
      <van-submit-bar
        button-text="退票"
        @submit="returnTicket"
      >
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Cell, CellGroup, Toast, SubmitBar, Button } from "vant";
export default {
  data() {
    return {
      orderId: this.$route.query.id,
      orderInfo: {}
    };
  },
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [SubmitBar.name]: SubmitBar,
    [Button.name]: Button
  },
  created() {
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      let that = this;
      Toast.loading({
        message: "加载中...",
        duration: 1000
      });
      axios({
        method: "post",
        url: "http://route.showapi.com/1681-6",
        params: {
          showapi_appid: "100774",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          orderId: that.orderId
        }
      })
        .then(res => {
          if (res.status == 200 && res.data.showapi_res_body.ret_code == 0) {
            that.orderInfo = res.data.showapi_res_body;
          }
          console.log(that.orderInfo);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onPay() {
      this.$router.push({
        path: "/orderPay",
        query: { id: this.orderId }
      });
    },
    orderCancel() {
      this.$router.push({
        path: "/orderCancel",
        query: { id: this.orderId }
      });
    },
    returnTicket() {}
  }
};
</script>
<style scoped>
.orderdetail {
  padding-bottom: 60px;
  background-color: #f5f5f5;
}

.panel h2.title {
  padding: 10px 15px;
  font-weight: normal;
  font-size: 16px;
}
/* 1227856973 */
</style>


