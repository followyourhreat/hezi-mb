<template>
  <div class="page">
    <van-nav-bar
      title="搜索商品"
      left-arrow
      :border="false"
      @click-left="handleBack"
      @click-right="handleRouter('cart')"
    >
      <van-icon slot="right" name="cart" :info="cart_num"/>
    </van-nav-bar>
    <div class="tabs-content">
      <van-tabs color="#f2c700" @click="clickTab">
        <van-tab>
          <div slot="title">
            销量
            <van-icon :name="tab1?'arrow-up':'arrow-down'"/>
          </div>
        </van-tab>
        <van-tab>
          <div slot="title">
            价格
            <van-icon :name="tab2?'arrow-up':'arrow-down'"/>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-search">
      <div class="search-box-cont">
        <i class="search-icon" @click="handleList"></i>
        <input
          type="text"
          placeholder="请输入要搜索的商品"
          class="search-box"
          v-model="keyword2"
          @blur="handleList"
        >
      </div>
      <button class="search-reset" @click="handleReset">取消</button>
    </div>

    <div class="card-content">
      <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="onLoad">
        <dt-card
          v-for="(item, index) in goodList"
          :key="index"
          :id="item.id"
          :src="item.cover_image"
          :title="item.goods_name"
          :value="item.price_now"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 按销量sale_total排序:0,按价格price_now排序:1,
      active: 0,
      // ASC 升序排序 DESC 降序排序
      tab1: false,
      tab2: false,
      keyword2: "",
      params: {
        keyword: "",
        category_id: "",
        sort_field: "sale_total",
        sort_type: "DESC",
        page_now: 1
      },
      cart_num: 0,
      goodList: [],
      loading: false,
      finished: false
    };
  },
  mounted() {
    this.params.category_id = this.$route.query.id;
    this.getGoodList();
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.params.page_now++;
        this.getGoodList();
      }, 500);
    },
    getGoodList() {
      this.params.keyword = this.$route.query.keyword;
      if (this.active == 0) {
        this.params.sort_field = "sale_total";
        this.params.sort_type = this.tab1 ? "ASC" : "DESC";
      } else {
        this.params.sort_field = "price_now";
        this.params.sort_type = this.tab2 ? "ASC" : "DESC";
      }
      this.loading = true;
      this.$http.post("goods/list", this.params).then(res => {
        this.loading = false;
        this.cart_num = res.data.cart_num || 0;
        this.goodList = [].concat(this.goodList, res.data.list);
        if (res.data.list.length == 0) {
          this.finished = true;
        }
      });
    },
    clickTab(val) {
      // 点击不相同的tab,切换状态;点击相同的tab,切换图标
      if (this.active != val) {
        this.active = val;
      } else {
        if (val == 0) {
          this.tab1 = !this.tab1;
        } else {
          this.tab2 = !this.tab2;
        }
      }
      this.goodList = [];
      this.loading = false;
      this.finished = false;
      this.params.page_now = 1;
      this.getGoodList();
    },
    handleList() {
      this.params.keyword = this.keyword2;

      if (this.active == 0) {
        this.params.sort_field = "sale_total";
        this.params.sort_type = this.tab1 ? "ASC" : "DESC";
      } else {
        this.params.sort_field = "price_now";
        this.params.sort_type = this.tab2 ? "ASC" : "DESC";
      }
      this.loading = true;
      console.log(this.params);
      this.$http.post("goods/list", this.params).then(res => {
        this.loading = false;
        this.cart_num = res.data.cart_num || 0;
        this.goodList = res.data.list;
        if (res.data.list.length == 0) {
          this.finished = true;
        }
      });
    },
    handleReset() {
      this.keyword2 = "";
      this.getGoodList();
    }
  }
};
</script>

<style lang="less" scoped>
.tabs-content {
  height: 0.44rem;
  background: none;
}

.van-list {
  padding: 0 0.2rem;
  margin-top: 0.4rem;
  .card {
    margin-right: 0.38rem;
  }
  .card:nth-of-type(even) {
    margin-right: 0;
  }
}

.goods-search {
  position: relative;
  padding: 0 0.2rem;
  margin-top: 0.42rem;
  .search-box-cont {
    display: flex;
    flex: 1;
    height: 0.62rem;
    line-height: 0.62rem;
  }
  .search-reset {
    outline: none;
    border: none;
    color: #fff;
    font-size: 0.29rem;
    display: flex;
    justify-content: center;
    width: 1.26rem;
    height: 0.62rem;
    line-height: 0.62rem;
    background: #53555c;
    border-radius: 0.06rem;
    margin-left: 0.27rem;
  }
}
</style>
