<template>
  <div class="page">
    <div class="goods-header">
      <div class="goods-position">
        <a @click="toAddress">
          <img src="../../assets/position.png" alt>
        </a>
      </div>
      <div class="goods-search">
        <div class="search-box-cont">
          <i class="search-icon" @click="handleSearch"></i>
          <input
            type="text"
            placeholder="请输入要搜索的商品"
            class="search-box"
            v-model="keyword"
            @blur="handleSearch"
          >
        </div>
      </div>

      <div class="goods-cart">
        <ul class="goods-cart-ul">
          <li>
            <a @click="toCollect">
              <img src="../../assets/collect.png" alt>
            </a>
          </li>
          <li>
            <a @click="toCart">
              <img src="../../assets/cart.png" alt>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../../assets/banner1_02.png" alt>
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/banner1_02.png" alt>
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/banner1_02.png" alt>
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/banner1_02.png" alt>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="goods-brands">
      <ul>
        <li>
          <a @click="toBest">
            <img src="../../assets/best.png" alt>
            <span>精品区</span>
          </a>
        </li>
        <li>
          <a @click="toNurse">
            <img src="../../assets/huli.png" alt>
            <span>护理区</span>
          </a>
        </li>
        <li>
          <a @click="toMedal">
            <img src="../../assets/medal.png" alt>
            <span>兑奖区</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="list-content">
      <div class="list-container">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell value v-for="item in list" :key="item.id">
            <template slot="title">
              <div class="card-img" @click="handleDetail(item.id)" :id="item.id">
                <img width="100%" height="100%" :src="item.cover_image">
              </div>
              <div class="cell">
                <div class="cell-title">
                  <span>{{item.goods_name}}</span>
                </div>
                <div class="cell-value">
                  <span class="text-yellow">¥ {{item.price_now}}</span>
                </div>
              </div>
            </template>
          </van-cell>
        </van-list>
      </div>
    </div>
    <div class="navbar-list">
      <ul>
        <li>
          <a href="#">
            <img src="../../assets/equip.png" alt>
            <span>设备</span>
          </a>
        </li>
        <li>
          <a @click="toMall">
            <img src="../../assets/mall.png" alt>
            <span>商城</span>
          </a>
        </li>
        <li>
          <a @click="toInfo">
            <img src="../../assets/info.png" alt>
            <span>资讯</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/mem.png" alt>
            <span>我的</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search } from "vant";

Vue.use(Search);
export default {
  data() {
    return {
      keyword: "",

      bannerList: [],
      list: [
        {
          id: "13",
          price_now: "100.00",
          goods_name: "赫兹拖把1",
          cover_image:
            "http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
        },
        {
          id: "14",
          price_now: "100.00",
          goods_name: "赫兹拖把1",
          cover_image:
            "http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
        },
        {
          id: "15",
          price_now: "100.00",
          goods_name: "赫兹拖把1",
          cover_image:
            "http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
        },
        {
          id: "16",
          price_now: "100.00",
          goods_name: "赫兹拖把1",
          cover_image:
            "http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
        },
        {
          id: "17",
          price_now: "100.00",
          goods_name: "赫兹拖把1",
          cover_image:
            "http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
        },
        {
          id: "18",
          price_now: "100.00",
          goods_name: "赫兹拖把1",
          cover_image:
            "http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
        }
      ],
      loading: false,
      finished: false
    };
  },
  mounted() {},
  methods: {
    handleSearch() {
      this.$router.push({
        path: "/more",
        query: { keyword: this.keyword }
      });
    },
    toBest() {
      this.$router.push({ path: "/best" });
    },
    toNurse() {
      this.$router.push({ path: "/nurse" });
    },
    toMedal() {
      this.$router.push({ path: "/medal" });
    },
    toCollect() {
      this.$router.push({ path: "/collect" });
    },
    toCart() {
      this.$router.push({ path: "/cart" });
    },
    toAddress() {
      this.$router.push({ path: "/address" });
    },
    toMall() {
      this.$router.push({ path: "/" });
    },
    toInfo() {
      this.$router.push({ path: "/information" });
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.list.push({
            id: "13",
            price_now: "100.00",
            goods_name: "赫兹拖把1",
            cover_image:
              "http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
          });
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    handleDetail(curId) {
      this.$router.push({
        path: "/detail",
        query: { id: curId }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
