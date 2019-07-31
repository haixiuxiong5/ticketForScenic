<template>
  <div>
    <van-index-bar :index-list="indexList">
      <div
        v-for="(item,index) in listCity"
        :key="index"
      >
        <van-index-anchor :index="item.name" />
        <van-cell
          v-for="(cellitem,index) in item.list"
          :key="index"
          :title="cellitem"
          @click="selectCity"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import { IndexBar, IndexAnchor, Cell } from "vant";

export default {
  data() {
    return {
      indexList: ["A", "B", "C", "D", "R", "S", "T"],
      listCity: [
        {
          name: "A",
          list: [
            "阿拉善盟",
            "鞍山",
            "安庆",
            "安阳",
            "阿坝",
            "安顺",
            "阿里",
            "安康",
            "阿克苏",
            "阿勒泰",
            "澳门",
            "安吉",
            "安丘",
            "安岳",
            "安平",
            "安溪",
            "安宁"
          ]
        },
        {
          name: "B",
          list: [
            "北京",
            "保定",
            "蚌埠",
            "包头",
            "白山",
            "滨州",
            "百色",
            "巴中",
            "毕节",
            "宝鸡",
            "白银",
            "滨海",
            "博山",
            "宾阳"
          ]
        },
        {
          name: "C",
          list: [
            "重庆",
            "成都",
            "长沙",
            "常州",
            "长春",
            "承德",
            "沧州",
            "长治",
            "赤峰",
            "朝阳",
            "常德"
          ]
        },
        {
          name: "D",
          list: ["大连", "大庆", "丹东", "大兴安岭", "东营", "德州", "德阳"]
        },
        {
          name: "R",
          list: ["日照", "荣成", "乳山"]
        },
        {
          name: "S",
          list: ["上海", "深圳", "沈阳", "石家庄", "苏州", "三亚", "汕头"]
        },
        {
          name: "T",
          list: ["天津", "太原", "唐山", "通辽", "铁岭", "通化", "泰安"]
        }
      ]
    };
  },
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell
  },
  methods: {
    selectCity(e) {
      this.$router.push({
        path: "/",
        query: {
          city: e.target.innerText
        }
      });
    }
  }
};
</script>

