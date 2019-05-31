<template>
  <div class="page">
    <van-nav-bar
      title="填写订单"
      left-arrow
      :border="false"
      @click-left="handleBack"
      @click-right="onClickRight"
    >
      <span slot="right">保存</span>
    </van-nav-bar>
    <div class="page-scroll">
      <div class="title-tip">收货地址</div>
      <dt-address
        v-if="detail.default_address"
        :realname="detail.default_address.realname"
        :phone="detail.default_address.phone"
        :area="detail.default_address.area"
        :address="detail.default_address.address"
      >
        <van-icon name="arrow" @click="handleRouter('address')"/>
      </dt-address>
      <dt-address
        v-if="!detail.default_address"
        realname="请添加收货人"
        phone="请添加手机号码"
        area="请添加"
        address
      >
        <van-icon name="arrow" @click="handleRouter('address')"/>
      </dt-address>

      <div class="title-tip">请选择抵扣</div>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="优惠券" @click="show = true, radio = '2'">
            <span style="padding-right: 10px;">- ¥ {{coupon.amount}}</span>
            <van-radio slot="right-icon" name="2" checked-color="#ff0000"/>
          </van-cell>
          <van-cell :title="`积分抵扣(${detail.points_minus.cost_points}分)`" @click="radio = '1'">
            <span style="padding-right: 10px;">- ¥ {{detail.points_minus.minus}}</span>
            <van-radio slot="right-icon" name="1" checked-color="#ff0000"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div class="title-tip">订单合计费用</div>
      <van-cell-group>
        <van-cell title="商品合计">
          <span>¥ {{detail.total_price}}</span>
        </van-cell>
        <van-cell title="运费">
          <span>¥ {{detail.postage}}</span>
        </van-cell>
        <van-cell title="优惠">
          <span>- ¥ {{radio=='1'?detail.points_minus.minus:coupon.amount}}</span>
        </van-cell>
        <van-cell title="订单金额">
          <span>¥ {{Number(detail.total_price)+Number(detail.postage)-Number(radio=='1'?detail.points_minus.minus:coupon.amount)}}</span>
        </van-cell>
      </van-cell-group>

      <div class="title-tip">商品明细</div>
      <div class="van-cell-cart">
        <dt-card2
          v-if="detail.goods.length"
          v-for="(item, index) in detail.goods"
          :key="index"
          :src="item.cover_image"
          :title="item.goods_name"
          :value="item.price_now"
        >
          <span>× {{item.goods_num}}</span>
        </dt-card2>
      </div>
    </div>
    <van-submit-bar
      label="应付:"
      :price="(Number(detail.total_price)+Number(detail.postage)-Number(radio=='1'?detail.points_minus.minus:coupon.amount))*100||0"
      button-text="去付款"
      @submit="handleSubmit"
    ></van-submit-bar>

    <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
      <div class="popup-title">
        可使用的优惠券
        <i class="van-sku__close-icon van-icon van-icon-close" @click="show = false"></i>
      </div>
      <div class="popup-list">
        <dt-coupon2
          v-if="detail.coupon_list.length"
          v-for="(item, index) in detail.coupon_list"
          :key="index"
          :amount="item.amount"
          :condition="item.use_condition"
          :start="item.start_date"
          :end="item.end_date"
        >
          <span @click="handleCoupon(item)">点击使用</span>
        </dt-coupon2>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选择商品参数
      params: {},
      // 商品数据
      detail: {
        default_address: {},
        points_minus: {},
        coupon_list: [],
        goods: []
      },
      // 点击使用的优惠券
      coupon: {
        coupon_id: "",
        amount: 0
      },
      radio: 0,
      show: false
    };
  },
  mounted() {
    this.params = this.$route.query;
    // cart_ids购物车的ids
    if (this.params.cart_ids) {
      this.getCartBuy();
    } else {
      this.getGoodBuy();
    }
  },
  methods: {
    getCartBuy() {
      this.$http.post("cart/buy", this.params).then(res => {
        this.detail = res.data;
      });
    },
    getGoodBuy() {
      this.$http.post("goods/buy", this.params).then(res => {
        this.detail = res.data;
      });
    },
    handleCoupon(item) {
      this.coupon = item;
      this.show = false;
    },
    onClickRight() {
      if (!this.detail.default_address) {
        this.$toast("请填写收货人地址");
        return;
      }
      if (this.params.cart_ids) {
        var params = {
          ...this.params,
          address_id: this.detail.default_address.address_id,
          minus_type: this.radio,
          coupon_id: this.coupon.coupon_id
        };
        this.$http.post("cart/save", params).then(res => {
          this.$toast("订单已保存，请在我的订单中继续付款");
          setTimeout(() => {
            // window.location.href = '/app/';
            this.$router.push({
              path: "/",
              query: {
                uid: window.localStorage.getItem("uid"),
                token: window.localStorage.getItem("token")
              }
            });
          }, 1500);
          // this.$router.go(-window.history.length)
        });
      } else {
        var params = {
          ...this.params,
          address_id: this.detail.default_address.address_id,
          minus_type: this.radio,
          coupon_id: this.coupon.coupon_id
        };
        this.$http.post("goods/save", params).then(res => {
          this.$toast("订单已保存，请在我的订单中继续付款");
          setTimeout(() => {
            // window.location.href = '/app/';
            this.$router.push({
              path: "/",
              query: {
                uid: window.localStorage.getItem("uid"),
                token: window.localStorage.getItem("token")
              }
            });
          }, 1500);
        });
      }
    },
    debounce(fn) {
      return (() => {
        let self = this,
          args = arguments;
        clearTimeout(fn.id);
        fn.id = setTimeout(() => {
          fn.apply(self, args);
        }, 1000);
      })();
    },
    handleSubmit() {
      this.debounce(this.handleSubmit2);
    },
    handleSubmit2() {
      if (!this.detail.default_address) {
        this.$toast("请填写收货人地址");
        return;
      }
      if (this.params.cart_ids) {
        var params = {
          ...this.params,
          address_id: this.detail.default_address.address_id,
          minus_type: this.radio,
          coupon_id: this.coupon.coupon_id
        };
        this.$post("cart/save", params).then(res => {
          window.DTCJSObject.CheckOrderId(res.data.order_id);
        });
      } else {
        var params = {
          ...this.params,
          address_id: this.detail.default_address.address_id,
          minus_type: this.radio,
          coupon_id: this.coupon.coupon_id
        };
        this.$post("goods/save", params).then(res => {
          window.DTCJSObject.CheckOrderId(res.data.order_id);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title-tip {
  display: none;
}
.popup-title {
  position: relative;
  line-height: 40px;
  text-align: center;
}
.popup-list {
  height: 350px;
  padding-bottom: 20px;
  overflow: auto;
}
.van-cell-cart {
  border-radius: 0.06rem;
}
.van-nav-bar__right {
  color: #fff;
}
.page-scroll {
  margin-top: 0.5rem;
  padding: 0 0.2rem;
}
.van-radio-group {
  margin: 0.26rem auto;
  border-radius: 0.06rem;
}
.van-cell-group {
  background: rgba(0, 0, 0, 0);
  border-radius: 0.06rem;
  overflow: hidden;
  .van-cell {
    background: #53555c;
    color: #fff;
  }
}

.van-hairline--top-bottom::after {
  display: none;
}
.van-cell:not(:last-child)::after {
  border-bottom: 0.02rem solid #393939;
  width: 96%;
}
.van-cell__value {
  color: #fff;
}
.van-submit-bar__bar {
  height: 1.17rem;
  line-height: 1.17rem;
  background: #53555c;
  .van-submit-bar__text {
    text-align: left;
    color: #fff;
    padding-left: 0.21rem;
    font-size: 0.29rem;
    .van-submit-bar__price {
      color: #fff;
      font-size: 0.33rem;
    }
  }
}
.van-button--large {
  width: 2.08rem;
  height: 1.19rem;
  line-height: 1.19rem;
  background-image: linear-gradient(270deg, #c70001 0%, #ff0000 100%),
    linear-gradient(#c70001, #ff0000);
  font-size: 0.29rem;
  text-align: center;
  border-radius: 0.06rem;
}
</style>
