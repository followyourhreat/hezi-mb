<template>
  <div class="best-container">
    <div class="navbar-box">
      <van-nav-bar
        title="精品区"
        left-text
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <em slot="right"></em>
        <!-- <van-icon name="shopping-cart" slot="right"/> -->
      </van-nav-bar>
      <!-- 排序 -->
      <div class="sort-condition">
        <ul>
          <li @click="toggle" v-bind:class="{ active: isActive }">
            <span>销量</span>
            <van-icon name="arrow-down"/>
            <van-icon name="arrow-up"/>
          </li>
          <li @click="toggle2" v-bind:class="{ active: isActive2 }">
            <span>价格</span>
            <van-icon name="arrow-down"/>
            <van-icon name="arrow-up"/>
          </li>
        </ul>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list-container">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell value v-for="item in list" :key="item.id">
          <template slot="title">
            <div class="card-img" @click="handleDetail(item.id)" :id="item.id">
              <img width="100%" height="100%" :src="item.cover_image">
            </div>
            <div class="cell" @click="handleDetail(item.id)">
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
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
      isActive2: false,
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
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      console.log("---------");
    },
    toggle() {
      return (this.isActive = !this.isActive);
    },
    toggle2() {
      return (this.isActive2 = !this.isActive2);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.list.push({
            id: "19",
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
<style scoped>
</style>
