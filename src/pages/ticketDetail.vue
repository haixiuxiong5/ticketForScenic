<template>
  <div class="ticketdetail">
    <h1 class="productname">
      <p>{{ticketDetail.productName}}</p>
      <p>
        <van-tag
          type="primary"
          round
        >{{subType}}</van-tag>
        <van-tag
          type="primary"
          round
        >{{ticketDetail.drawType==1?'实体票':(ticketDetail.drawType==8?'预付电子票':'')}}</van-tag>
      </p>
    </h1>

    <div class="card">
      <h5 class="cardtitle">有效期</h5>
      <div>{{ticketDetail.indate}}</div>
    </div>
    <div class="card">
      <h5 class="cardtitle">截止预订时间</h5>
      <div>{{ticketDetail.advanceDay==0?'':ticketDetail.advanceDay}}天{{ticketDetail.advanceHour==0?'':ticketDetail.advanceHour}}小时</div>
    </div>
    <div class="card">
      <h5 class="cardtitle">入园方式</h5>
      <div>{{ticketDetail.admissionVoucher.admissionVoucherDesc}}</div>
    </div>
    <div class="card">
      <h5 class="cardtitle">预订须知</h5>
      <div>
        <p
          v-for="(item,index) in ydxuzhi"
          :key="index"
        >
          <span
            style="color:#333;"
            v-if="item.label"
          >{{item.label}}：</span>
          {{item.value}}
        </p>
      </div>
    </div>
    <div class="card">
      <h5 class="cardtitle">其他说明</h5>
      <div v-html="ticketDetail.info"></div>
    </div>
    <van-submit-bar
      :price="ticketDetail.salePrice*100"
      button-text="马上预定"
      label=" "
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import axios from "axios";
import { Tag } from "vant";
import { SubmitBar } from "vant";
export default {
  data() {
    return {
      ticketId: this.$route.query.id,
      ticketDetail: {}
    };
  },
  components: {
    [Tag.name]: Tag,
    [SubmitBar.name]: SubmitBar
  },

  created() {
    this.getDetail();
  },
  computed: {
    subType() {
      let that = this;
      let subtype = that.ticketDetail.subType;
      if (subtype == 1) {
        return "门票";
      } else if (subtype == 2) {
        return "联票";
      } else if (subtype == 3) {
        return "套票";
      } else if (subtype == 4) {
        return "专项";
      }
    },
    ydxuzhi() {
      let that = this;
      let bookNotice = that.ticketDetail.bookNotice;
      let newNotice = [];
      for (let i of bookNotice) {
        if (i != "") {
          let index = i.indexOf(":") == -1 ? i.indexOf("：") : i.indexOf(":");
          let obj = {
            label: i.substring(0, index),
            value: i.substring(index + 1)
          };
          newNotice.push(obj);
        }
      }
      return newNotice;
    }
  },
  methods: {
    loading() {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      return loading;
    },
    getDetail() {
      let that = this;
      const loading = that.loading();
      axios({
        method: "post",
        url: "http://route.showapi.com/1681-4",
        params: {
          showapi_appid: "100774",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          productId: that.ticketId
        }
      }).then(res => {
        if (res.status == 200) {
          setTimeout(() => {
            loading.close();
          }, 1000);
          that.ticketDetail = res.data.showapi_res_body;
          console.log(that.ticketDetail);
        }
      });
    },
    onSubmit() {
      this.$router.push({
        path: "/createOrder",
        query: {
          id: this.ticketDetail.productId
        }
      });
    }
  }
};
</script>
<style scoped>
.ticketdetail {
  padding: 0 15px 50px;
}
.productname {
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.card {
  padding: 5px 0;
  font-size: 12px;
  color: #999;
}
.cardtitle {
  padding: 2px 0;
  font-weight: normal;
  font-size: 14px;
  color: #333;
}
</style>


