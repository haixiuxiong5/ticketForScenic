<template>
  <div class="scenicdetail">
    <el-image fit="cover" :src="scenicDetail.defaultPic" class="scenicpic"></el-image>
    <div class="card baseinfo">
      <ul>
        <li>
          <span class="scenicname">{{scenicDetail.scenicName}}</span>
          <span style="float:right;">{{scenicDetail.provinceName}}{{scenicDetail.cityName}}</span>
        </li>
        <li>
          <span class="el-icon-shijian"></span>
          {{scenicDetail.openTime}}
        </li>
        <li>
          <span class="el-icon-dizhi"></span>
          {{scenicDetail.scenicAddress}}
        </li>
        <li>
          <span class="el-icon-bus"></span>
          {{scenicDetail.trafficBus}}
        </li>
      </ul>
    </div>
    <div class="card">
      <h6 class="cardtitle">景点门票</h6>
      <div class="disticketlist">
        <ul>
          <li v-for="(item,index) in scenicDetail.disTickets" :key="index">
            <p class="ticketname">{{item.productName}}</p>
            <div class="ticketprice">
              <p>
                ￥
                <span class="saleprice">{{item.salePrice}}</span>
              </p>
              <p class="webprice">￥{{item.webPrice}}</p>
              <el-button type="warning" round size="mini" class="ydbtn">预订</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="card">
      <h6 class="cardtitle">预定须知</h6>
      <el-collapse>
        <el-collapse-item
          v-model="activeNames"
          v-for="(item,index) in scenicDetail.bookNotice"
          :key="index"
          :title="item.name"
          :name="index"
        >
          <div>
            <p v-for="(xuitem,index) in split(item.value)" :key="index">{{xuitem}}</p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="card">
      <h6 class="cardtitle">景点推荐</h6>
      <div>{{scenicDetail.recommend}}</div>
    </div>
    <div class="card">
      <h6 class="cardtitle">景点介绍</h6>
      <div v-html="scenicDetail.scenicDescription" class="scenicdes"></div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      scenicId: this.$route.query.id,
      scenicDetail: {},
      activeNames: ["0"]
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    split(str) {
      return str.split("。");
    },
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
        url: "http://route.showapi.com/1681-2",
        params: {
          showapi_appid: "100774",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          scenicId: that.scenicId
        }
      })
        .then(res => {
          if (res.status == 200) {
            setTimeout(() => {
              loading.close();
            }, 1000);
            that.scenicDetail = res.data.showapi_res_body;
            console.log(that.scenicDetail);
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
.scenicdetail {
  background-color: #f5f5f5;
}
.scenicpic {
  width: 100%;
  height: 200px;
}
.card {
  margin-bottom: 10px;
  padding: 10px 15px;
  background-color: #fff;
}
.card .cardtitle {
  margin: 10px 0 10px;
  padding-left: 10px;
  font-size: 15px;
  color: #333;
  line-height: 1;
  border-left: 2px solid #009cff;
}
.baseinfo {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
}
.baseinfo li {
  padding: 4px 0;
}
.baseinfo .scenicname {
  font-size: 18px;
  color: #333;
}
.disticketlist li {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
}
.ticketname {
  flex: 1;
}
.ticketprice {
  padding-left: 10px;
  text-align: right;
  font-size: 10px;
  color: #ccc;
}
.ticketprice .webprice {
  text-decoration: line-through;
}
.ticketprice .saleprice {
  font-size: 16px;
  color: red;
}
.ticketprice .ydbtn {
  padding: 4px 15px;
}
.scenicdes {
  padding: 10px;
}
.scenicdes >>> img {
  width: 100% !important;
  height: auto;
}
</style>


