<template>
  <div class="indexcont">
    <div class="searchwrap">
      <span class="city">北京</span>
      <span class="el-icon-search search">搜索城市</span>
    </div>
    <div class="sceniclist">
      <ul>
        <li class="scenicitem">
          <el-image style="width: 80px; height: 60px" src fit="cover"></el-image>
          <div>
            <h6>欢乐谷</h6>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  created() {
    this.getScenicList();
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
      const loading = that.loading();
      axios({
        method: "post",
        url: "http://route.showapi.com/1681-1",
        dataType: "json",
        data: {
          showapi_appid: "100774",
          showapi_sign: "a236dc73662b4086a798325e2f1a5782",
          key: "北京",
          page: "1",
          pageSize: "10"
        }
      })
        .then(res => {
          if (res.status == 200) {
            loading.close();
          }
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
.indexcont {
  padding: 10px 15px;
}
.searchwrap {
  width: 100%;
  height: 24px;
  padding: 2px 0;
  line-height: 24px;
  border-radius: 30px;
  border: 1px solid #eee;
  font-size: 14px;
  color: #666;
  overflow: hidden;
  background-color: #f7f7f7;
}
.city {
  float: left;
  width: 5em;
  text-align: center;
  border-right: 1px solid #eee;
}
.search {
  padding: 0 5px 0 10px;
}

.sceniclist {
  margin-top: 10px;
  background-color: #f7f7f7;
}
.sceniclist ul {
  list-style: none;
}
.scenicitem {
  margin-bottom: 6px;
  background-color: #fff;
}
</style>


