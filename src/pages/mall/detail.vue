<template>
  <div class="page">
    <van-nav-bar title="商品详情" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div class="page-scroll">
      <div class="swipe-content">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(item, index) in detail.image" :key="index">
            <img class="swipe-img" :src="item">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="goods-content">
        <div class="goods-title">{{detail.goods_name}}</div>
        <div class="goods-price">
          <span class="text-yellow">¥ {{detail.price_now}}</span>
          <span class="text-del">¥ {{detail.price_original}}</span>
        </div>
      </div>
      <van-tabs color="#f2c700" @click="clickTab">
        <van-tab title="商品详情">
          <div style="padding: 10px;">
            <span v-html="detail.descr"></span>
          </div>
        </van-tab>
        <van-tab title="评论">
          <div>
            <van-list
              v-model="loading"
              :finished="finished"
              :immediate-check="false"
              @load="onLoad"
            >
              <dt-comment
                v-for="(item, index) in commentList"
                :key="index"
                :src="item.image"
                :nickname="item.nickname"
                :ctime="item.ctime"
                :content="item.content"
                :pictures="item.pictures"
              />
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <van-goods-action>
      <!-- <van-goods-action-mini-btn
        v-if="detail.is_collect=='0'"
        icon="star-o"
        text="收藏"
        @click="handleCollect"
      />
      <van-goods-action-mini-btn
        v-if="detail.is_collect=='1'"
        icon="star"
        text="收藏"
        @click="handleCollect2"
      />
      <van-goods-action-mini-btn
        icon="cart"
        text="购物车"
        :info="detail.cart_num"
        @click="handleRouter('cart')"
      />-->
      <div class="detail-collect" v-if="detail.is_collect=='0'" @click="handleCollect">
        <img src="../../assets/collect.png" alt>
        <span>收藏</span>
      </div>
      <div class="detail-collect" v-if="detail.is_collect=='1'" @click="handleCollect2">
        <img src="../../assets/collect-act.png" alt>
        <span>收藏</span>
      </div>
      <div class="detail-cart" @click="handleRouter('cart')">
        <img src="../../assets/cart.png" alt>
        <span>购物车</span>
      </div>
      <button @click="handleOpen(0)" class="addCart">加入购物车</button>
      <button @click="handleOpen(1)" class="buyNow">立即购买</button>
      <!-- <van-goods-action-big-btn text="加入购物车" @click="handleOpen(0)"/>
      <van-goods-action-big-btn text="立即购买" @click="handleOpen(1)" primary/>-->
    </van-goods-action>
    <van-sku v-model="modal" :goods-id="id" :goods="goods" :sku="sku" :hide-stock="true">
      <template slot="sku-header" slot-scope="props">
        <div class="van-sku-header van-hairline--bottom">
          <i class="van-sku__close-icon van-icon van-icon-close" @click="modal = false"></i>
          <div class="van-sku-header__img-wrap">
            <img v-show="detail.image.length" :src="detail.image[0]">
          </div>
          <div class="van-sku-header__goods-info">
            <div class="van-sku__goods-name van-ellipsis">{{detail.goods_name}}</div>
            <div class="van-sku__goods-price">
              <span class="van-sku__price-symbol">￥</span>
              <span class="van-sku__price-num">{{params.price}}</span>
            </div>
          </div>
        </div>
      </template>
      <template slot="sku-group" slot-scope="props">
        <div class="van-sku-group-container van-hairline--bottom">
          <div class="van-sku-row" v-for="(item, index) in detail.attr" :key="index">
            <div class="van-sku-row__title">{{item.name}}</div>
            <span
              v-for="(item2, index2) in item.detail"
              class="van-sku-row__item"
              :class="{'van-sku-row__active': item2.select}"
              @click="handleAttr(item.detail, index2)"
              :key="index2"
            >{{item2.value}}</span>
          </div>
        </div>
      </template>
      <template slot="sku-messages" slot-scope="props">
        <div class="van-sku-messages"></div>
      </template>
      <template slot="sku-stepper" slot-scope="props">
        <div class="van-sku-stepper-stock">
          <div class="van-sku-stepper-container">
            <div class="van-sku__stepper-title">购买数量</div>
            <div class="van-sku__stepper van-stepper">
              <van-stepper v-model="params.number" disable-input/>
            </div>
          </div>
        </div>
      </template>
      <template slot="sku-actions" slot-scope="props">
        <button @click="handleSubmit" class="submit-btn">确定</button>
      </template>
    </van-sku>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      detail: {
        image: []
      },
      params: {
        price: 0,
        attr: [],
        number: 1
      },
      modal: false,
      openType: 0,
      goods: {
        title: "",
        picture: ""
      },
      sku: {
        price: "2.00", // 默认价格
        stock_num: 9999, // 总库存
        tree: [],
        list: []
      },
      commentList: [],
      page_now: 1,
      loading: false,
      finished: false
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDetail();
    this.getComment();
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.page_now++;
        this.getComment();
      }, 500);
    },
    getComment() {
      this.loading = true;
      this.$http
        .post("comments/list", { goods_id: this.id, page_now: this.page_now })
        .then(res => {
          this.loading = false;
          this.commentList = [].concat(this.commentList, res.data.list);
          if (res.data.list.length == 0) {
            this.finished = true;
          }
        });
    },
    getDetail() {
      this.$http.post("goods/detail", { id: this.id }).then(res => {
        this.detail = res.data;
        //默认选中第一个
        this.detail.attr.forEach(item => {
          item.detail.forEach((item2, index2) => {
            item2.select = false;
            if (index2 == 0) {
              item2.select = true;
            }
          });
        });
        this.handlePrice();
      });
    },
    clickTab() {},
    // 收藏
    handleCollect() {
      this.$http.post("collection/add", { goods_id: this.id }).then(res => {
        this.$toast("收藏成功");
        this.detail.is_collect = "1";
      });
    },
    // 取消收藏
    handleCollect2() {
      this.$http.post("collection/del", { goods_id: this.id }).then(res => {
        this.$toast("取消成功");
        this.detail.is_collect = "0";
      });
    },
    // 选择属性
    handleAttr(list, index) {
      list.forEach((item2, index2) => {
        item2.select = false;
        if (index2 == index) {
          item2.select = true;
        }
      });
      this.handlePrice();
      this.$forceUpdate();
    },
    // 计算价格
    handlePrice() {
      var price = Number(this.detail.price_now),
        attr = [];
      this.detail.attr.forEach(item => {
        item.detail.forEach((item2, index2) => {
          if (item2.select) {
            price = price + Number(item2.price);
            attr.push({
              name: item.name,
              value: item2.value,
              price: item2.price
            });
          }
        });
      });
      this.params.price = price;
      this.params.attr = attr;
    },
    // 加入购物车0,立即购买1
    handleOpen(val) {
      this.modal = true;
      this.openType = val;
    },
    handleSubmit() {
      const params = {
        goods_id: this.detail.id,
        goods_info: JSON.stringify(this.params.attr),
        goods_num: this.params.number
      };
      if (this.openType == 0) {
        this.$http.post("cart/add", params).then(res => {
          this.$toast("加入成功");
          this.modal = false;
          this.getDetail();
        });
      } else {
        this.$router.push({
          path: "/order",
          query: params
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-goods-action {
  background: #53555c;
  padding-right: 0.2rem;
}
.detail-collect {
  display: flex;
  width: 1.18rem;
  flex-direction: column;
  height: 0.79rem;
  padding: 0.17rem 0 0.2rem;
  background: #53555c;
  img {
    width: 0.39rem;
    height: 0.37rem;
    display: inline-block;
    margin: auto;
    justify-content: center;
  }
  span {
    display: inline-block;
    text-align: center;
    color: #fff;
    justify-content: center;
    font-size: 0.26rem;
  }
}
.detail-cart {
  display: flex;
  flex-direction: column;
  width: 1.45rem;
  height: 0.79rem;
  padding: 0.17rem 0 0.2rem;
  background: #53555c;
  img {
    width: 0.35rem;
    height: 0.35rem;
    display: inline-block;
    margin: auto;
    justify-content: center;
  }
  span {
    display: inline-block;
    text-align: center;
    color: #fff;
    justify-content: center;
    font-size: 0.26rem;
  }
}

.addCart {
  flex: 1;
  border: none;
  outline: none;
  height: 0.73rem;
  background-image: linear-gradient(270deg, #fdc123 0%, #ffe750 100%),
    linear-gradient(#f95d24, #f95d24);
  background-blend-mode: normal, normal;
  border-radius: 0.36rem 0 0 0.36rem;
  color: #fff;
  font-size: 0.26rem;
  margin-top: 0.22rem;
}
.buyNow {
  flex: 1;
  border: none;
  outline: none;
  height: 0.73rem;
  background-image: linear-gradient(270deg, #ff0000 0%, #ff5050 100%),
    linear-gradient(#ff0000, #ff0000);
  background-blend-mode: normal, normal;
  border-radius: 0 0.36rem 0.36rem 0;
  color: #fff;
  font-size: 0.26rem;
  margin-top: 0.22rem;
}

.text-del {
  padding-left: 10px;
  text-decoration: line-through;
}
.swipe-content {
  height: 180px;
  .swipe-img {
    width: 100vw;
    height: 180px;
    display: block;
    box-sizing: border-box;
    background: #fff;
  }
}
.goods-content {
  background: #1b1a1b;
  padding: 10px;
  .goods-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .goods-price {
  }
}
.van-sku-container {
  background: #53555c;
  padding: 0.3rem;
}
.van-sku-header__img-wrap {
  margin-top: 0;
  width: 3rem;
  height: 2.13rem;
  border-radius: 0.06rem;
  margin-right: 0.27rem;
}
.van-hairline--bottom::after {
  display: none;
}
.van-sku__goods-name {
  font-size: 0.29rem;
  color: #ebeaeb;
}
.van-sku__goods-price {
  font-size: 0.31rem;
  margin-top: 0.43rem;
  color: #fff !important;
  .van-sku__price-num {
    font-size: 0.31rem;
  }
}
.van-sku__close-icon {
  top: -0.1rem;
}
</style>
