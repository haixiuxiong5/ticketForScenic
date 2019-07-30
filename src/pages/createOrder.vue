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
        @click="datePopupShow = true"
      />
      <van-cell>
        <p slot="title">预订数量(1-{{ticketInfo.limitNumHigh}})</p>
        <van-stepper
          v-model="bookNumber"
          min="1"
          :max="ticketInfo.limitNumHigh"
          integer
        />
      </van-cell>
    </van-cell-group>
    <div class="userinfo">
      <van-panel title="游玩人1(取票人)">
        <van-field
          v-model="username"
          name="username"
          required
          v-validate="'required'"
          :error-message="errors.first('username')"
          :error="errors.has('username')"
          label="姓名"
          placeholder="请输入姓名"
        />
        <van-field
          v-model="userphone"
          name="userphone"
          type="tel"
          required
          v-validate="'required|mobile'"
          :error-message="errors.first('userphone')"
          :error="errors.has('userphone')"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model="useremail"
          :required="mustEmail"
          name="email"
          v-validate="'email'"
          :error-message="errors.first('email')"
          :error="errors.has('email')"
          label="邮箱"
          placeholder="请输入邮箱"
        />
        <van-field
          v-model="pspttype"
          :required="mustPsptType"
          label="证件类型"
          placeholder="请选择"
          readonly
          @click="psptTypePicker=true"
        />
        <van-field
          v-model="psptid"
          :required="mustPsptType"
          name="identitycode"
          v-validate="'identitycode'"
          :error-message="errors.first('identitycode')"
          :error="errors.has('identitycode')"
          label="证件号码"
          placeholder="请输入证件号"
        />
      </van-panel>
    </div>
    <!-- <div v-if="custInfoLimit==2||custInfoLimit==7">
      <div class="userinfo">
        <van-panel title="游玩人2">
          <van-field
            v-model="username"
            required
            label="姓名"
            placeholder="请输入姓名"
          />
          <van-field
            v-model="userphone"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="pspttype"
            label="证件类型"
            placeholder="请选择"
            readonly
            @click="psptTypePicker=true"
          />
          <van-field
            v-model="psptid"
            label="证件号码"
            placeholder="请输入"
          />
        </van-panel>
      </div>
    </div>
    <div v-if="custInfoLimit==3||custInfoLimit==6">
      <div class="userinfo">
        <van-panel title="游玩人2">
          <van-field
            v-model="username"
            required
            label="姓名"
            placeholder="请输入姓名"
          />
          <van-field
            v-model="userphone"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="pspttype"
            required
            label="证件类型"
            placeholder="请选择"
            readonly
            @click="psptTypePicker=true"
          />
          <van-field
            v-model="psptid"
            required
            label="证件号码"
            placeholder="请输入"
          />
        </van-panel>
      </div>
    </div> -->
    <van-popup
      v-model="psptTypePicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="psptTypecLists"
        @cancel="psptTypePicker = false"
        @confirm="psptTypeOK"
      />
    </van-popup>
    <van-popup
      v-model="datePopupShow"
      position="bottom"
      :close-on-click-overlay="closeoverlay"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="priceCalendarStart"
        :max-date="priceCalendarEnd"
        @confirm="dateChooseOK"
        @cancel="dateChooseCancle=false"
        @change="getDate"
      />
    </van-popup>
    <van-submit-bar
      :price="ticketInfo.salePrice*bookNumber*100"
      button-text="立即购买"
      label=" "
      @submit="onSubmit"
    />
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
  Stepper,
  Picker,
  SubmitBar
} from "vant";
let changeDate = "";

export default {
  data() {
    return {
      ticketInfo: {},
      datePopupShow: false,
      closeoverlay: false,
      psptTypePicker: false,
      pspttype: "",
      psptid: "",
      productId: this.$route.query.id,
      startTime: "2019-7-17",
      currentDate: new Date(),
      priceCalendarStart: new Date(),
      priceCalendarEnd: new Date("2019-8-1"),
      bookNumber: 1,
      username: "",
      userphone: "",
      useremail: "",
      certificateType: "",
      custInfoLimit: "",
      admissionVoucherCode: ""
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
    [Stepper.name]: Stepper,
    [Picker.name]: Picker,
    [SubmitBar.name]: SubmitBar
  },
  created() {
    this.getTicketInfo();
  },
  computed: {
    psptTypecLists() {
      let psptType = [];
      if (this.certificateType == "") {
        psptType.push("身份证");
      } else {
        if (this.certificateType.indexOf("1") != -1) {
          psptType.push("身份证");
        }
        if (this.certificateType.indexOf("2") != -1) {
          psptType.push("护照");
        }
        if (this.certificateType.indexOf("3") != -1) {
          psptType.push("军官证");
        }
        if (this.certificateType.indexOf("4") != -1) {
          psptType.push("港澳通行证");
        }
        if (this.certificateType.indexOf("7") != -1) {
          psptType.push("台胞证");
        }
      }

      return psptType;
    },
    mustEmail() {
      return this.admissionVoucherCode == 205 ||
        this.admissionVoucherCode == 302
        ? true
        : false;
    },
    mustPsptType() {
      return this.custInfoLimit.indexOf("4") != -1 ||
        this.custInfoLimit.indexOf("4") != -1 ||
        this.custInfoLimit.indexOf("6") != -1 ||
        this.custInfoLimit.indexOf("7") != -1
        ? true
        : false;
    }
  },
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
          showapi_appid: "100774",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          productId: that.productId
        }
      })
        .then(res => {
          if (res.status == 200) {
            Toast.clear();
            that.ticketInfo = res.data.showapi_res_body;
            that.startTime =
              res.data.showapi_res_body.priceCalendar[0].departDate;
            that.priceCalendarStart = new Date(
              res.data.showapi_res_body.priceCalendar[0].departDate
            );
            that.priceCalendarEnd = new Date(
              res.data.showapi_res_body.priceCalendar[
                res.data.showapi_res_body.priceCalendar.length - 1
              ].departDate
            );
            that.certificateType = res.data.showapi_res_body.certificateType.toString();
            that.custInfoLimit = res.data.showapi_res_body.custInfoLimit.toString();
            that.admissionVoucherCode =
              res.data.showapi_res_body.admissionVoucher.admissionVoucherCode;
            console.log(that.custInfoLimit);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    dateChooseOK() {
      this.datePopupShow = false;
      this.startTime = changeDate;
    },
    getDate(e) {
      changeDate = e.getValues().join("-");
    },
    psptTypeOK(value) {
      this.pspttype = value;
      this.psptTypePicker = false;
    },
    onSubmit() {
      let that = this;
      that.$validator.validateAll().then(result => {
        if (result) {
          Toast.loading({
            message: "正在提交"
          });
          axios({
            method: "post",
            url: "http://route.showapi.com/1681-5",
            params: {
              showapi_appid: "100774",
              showapi_sign: "a236dc73662b4086a798325e2f1a5782",
              productId: that.productId,
              startTime: that.startTime,
              bookNumber: that.bookNumber,
              contactName: that.username,
              contactEmail: that.useremail,
              contactTel: that.userphone,
              psptType: "1",
              psptId: that.psptid,
              tourist: ""
            }
          })
            .then(res => {
              if (res.status == 200) {
                Toast.clear();
                console.log(res.data.showapi_res_body.orderId);
                that.$router.push({
                  path: "/successCreate",
                  query: {
                    id: res.data.showapi_res_body.orderId
                  }
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
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


