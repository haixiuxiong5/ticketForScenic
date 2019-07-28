<template>
  <div class="indexcont">
    <div class="searchwrap">
      <div class="searchinn">
        <span class="city">北京</span>
        <span class="el-icon-search search">搜索城市</span>
      </div>
    </div>
    <div
      class="sceniclist"
      v-infinite-scroll="getScenicList"
      infinite-scroll-disabled="busy"
      style="overflow-y:auto;height:calc(100vh - 138px);"
    >
      <ul>
        <li class="scenicitem" v-for="item in scenicList" :key="item.scenicId">
          <router-link :to="{path:'/scenicDetail',query:{id:item.scenicId}}" class="scenicinfo">
            <el-image :src="item.newPicUrl" fit="cover" class="scenicpic"></el-image>
            <div class="scenicsection">
              <div>
                <span class="scenicname">{{item.scenicName}}</span>
                <p class="scenicprice">
                  ￥{{item.salePrice}}
                  <span style="color:#999;font-size:13px;">起</span>
                </p>
              </div>
              <p>{{item.address}}</p>
              <p>{{item.bizTime}}</p>
            </div>
          </router-link>
          <div class="dis_list">
            <ul>
              <li v-for="(ditem,index) in item.dis_list" :key="index" v-if="index<3">
                <router-link
                  :to="{path:'/ticketDetail',query:{id:ditem.productId}}"
                  class="dis_item"
                >
                  <div class="ticketname">{{ditem.productName}}</div>
                  <div class="ticketprice">
                    <label>门市价</label>
                    <p class="webprice">{{ditem.webPrice}}</p>
                  </div>
                  <div class="ticketprice">
                    <label>销售价</label>
                    <p class="saleprice">{{ditem.salePrice}}</p>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <!-- <p v-if="loading">加载中...</p> -->
      <p v-if="noMore" style="padding:20px;text-align:center;">没有更多了</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      scenicList: [],
      pageIndex: 1,
      noMore: false,
      busy: false
    };
  },
  created() {},
  computed: {
    dislist() {}
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
    getScenicList() {
      let that = this;
      that.busy = true;
      const loading = that.loading();
      that.busy = true;
      axios({
        // method: "post",
        method: "get",
        // url: "http://route.showapi.com/1681-1",
        url:
          "https://www.easy-mock.com/mock/5d3c17a196f5a648a8495f24/scenic/sceniclist",
        params: {
          // showapi_appid: "100774",
          // showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          // key: "北京",
          page: that.pageIndex,
          pageSize: "10"
        }
      })
        .then(res => {
          if (res.status == 200) {
            setTimeout(() => {
              loading.close();
            }, 1000);
            // console.log(res.data.showapi_res_body.result);
            if (res.data.data.length == 0) {
              that.noMore = true;
              return;
            }
            that.scenicList = that.scenicList.concat(res.data.data);
            that.pageIndex++;
          }
          console.log(this.scenicList);
        })
        .catch(res => {
          console.log(res);
        });
      that.busy = false;
    }
  }
};
</script>
<style scoped>
.indexcont {
  position: relative;
  padding: 50px 0 44px;
}
.searchwrap {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  padding: 10px 15px;
  background-color: #fff;
  z-index: 9;
}
.searchinn {
  display: flex;
  height: 24px;
  padding: 2px 0;
  border-radius: 30px;
  border: 1px solid #eee;
  font-size: 12px;
  color: #666;
  overflow: hidden;
  background-color: #f7f7f7;
}
.city {
  width: 5em;
  line-height: 24px;

  text-align: center;
  border-right: 1px solid #eee;
}
.search {
  flex: 1;
  padding: 0 5px 0 10px;
  line-height: 24px;
}

.sceniclist {
  background-color: #f5f5f5;
}

.scenicitem {
  padding: 10px 15px;
  margin-bottom: 6px;
  background-color: #fff;
}
.scenicinfo {
  display: flex;
  padding: 10px 0;
  font-size: 13px;
  color: #999;
  line-height: 1.6;
}
.scenicinfo .scenicpic {
  width: 100px;
  height: 80px;
  margin-right: 10px;
}
.scenicinfo .scenicsection {
  flex: 1;
}
.scenicname {
  font-size: 16px;
  color: #333;
}
.scenicprice {
  float: right;
  color: red;
  font-size: 16px;
}

.dis_list .dis_item {
  display: flex;
  padding: 10px 0;
  border-top: 1px dashed #eee;
}
.dis_list .dis_item:first-of-type {
  border-top: 1px solid #eee;
}
.dis_list .ticketname {
  flex: 1;
}
.dis_list .ticketprice {
  width: 6em;
  text-align: center;
}
.dis_list .ticketprice label {
  font-size: 12px;
  color: #999;
}
.ticketprice .webprice {
  text-decoration: line-through;
  color: #999;
}
.ticketprice .saleprice {
  color: red;
}
</style>


