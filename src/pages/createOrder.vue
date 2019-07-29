<template>
  <div class="createorder">
    <van-cell-group>
      <van-cell :title="ticketInfo.productName"></van-cell>
      <!-- <van-field
        label="游玩日期"
        v-model="this.ticketInfo.priceCalendar[0].departDate"
        readonly
      /> -->
      <van-field
        label="游玩日期"
        v-model="startTime"
        readonly
        @click="chooseDate"
      />
      <van-cell>
        <p slot="title">预订数量(1-{{limitNumHigh}})</p>
        <van-stepper
          v-model="bookNumber"
          min="1"
          :max="limitNumHigh"
          integer
        />
      </van-cell>
    </van-cell-group>
    <div class="userinfo">
      <van-panel title="游玩人1(取票人)">
        <van-field
          v-model="username"
          required
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          v-model="userphone"
          type="tel"
          required
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="useremail"
          required
          label="邮箱"
          placeholder="请输入邮箱"
        />

      </van-panel>

    </div>
    <van-popup
      v-model="popupShow"
      position="bottom"
      :close-on-click-overlay="closeoverlay"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="priceCalendarStart"
        :max-date="priceCalendarEnd"
        @confirm="dateChooseOK"
        @cancel="dateChooseCancle"
        @change="getDate"
      />
    </van-popup>
  </div>
</template>
<script>
import axios from "axios";
import {
  Toast,
  Popup,
  DatetimePicker,
  Panel,
  CellGroup,
  Cell,
  Field,
  Stepper
} from "vant";
let changeDate = "";
export default {
  data() {
    return {
      ticketInfo: {},
      popupShow: false,
      closeoverlay: false,
      productId: this.$route.query.id,
      startTime: "2019-7-17",
      currentDate: new Date(),
      priceCalendarStart: new Date(),
      priceCalendarEnd: new Date("2019-8-1"),
      limitNumHigh: 1,
      bookNumber: 1,
      username: "",
      userphone: "",
      useremail: ""
    };
  },
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Panel.name]: Panel,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Stepper.name]: Stepper
  },
  created() {
    this.getTicketInfo();
  },
  computed: {},
  methods: {
    getTicketInfo() {
      let that = this;
      Toast.loading({
        message: "加载中..."
      });
      axios({
        method: "post",
        url: "http://route.showapi.com/1681-4",
        params: {
          showapi_appid: "10074",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          productId: that.productId
        }
      })
        .then(res => {
          if (res.status == 200) {
            Toast.clear();
            // that.ticketInfo = res.data.showapi_res_body;
            // that.startTime =
            //   res.data.showapi_res_body.priceCalendar[0].departDate;
            // that.priceCalendarStart = new Date(
            //   res.data.showapi_res_body.priceCalendar[0].departDate
            // );
            // that.priceCalendarEnd = new Date(
            //   res.data.showapi_res_body.priceCalendar[
            //     res.data.showapi_res_body.priceCalendar.length - 1
            //   ].departDate
            // );
            // that.limitNumHigh = res.data.showapi_res_body.limitNumHigh;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dateChooseOK() {
      this.popupShow = false;
      this.startTime = changeDate;
    },
    dateChooseCancle() {
      this.popupShow = false;
    },
    getDate(e) {
      changeDate = e.getValues().join("-");
    },
    chooseDate() {
      this.popupShow = true;
    }
  }
};
</script>
<style scoped>
.createorder {
  background-color: #f5f5f5;
}
.userinfo {
  margin-top: 10px;
}
</style>


