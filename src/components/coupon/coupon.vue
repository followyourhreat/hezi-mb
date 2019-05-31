<template>
  <div class="coupon">
    <div class="coupon-img" :class="{'coupon-img-use': used!='1'}">
      <div class="coupon-title">
        <p>
          <span class="coupon-money">¥ {{amount}}</span>优惠券
        </p>
        <p>满{{condition}}元可用</p>
        <p>{{name}}</p>
      </div>
      <div class="coupon-value">
        <p class="coupon-date">{{start}}至{{end}}</p>
        <p class="coupon-type">{{type=='1'?'全品类优惠券':'特定商品优惠券'}}</p>
        <p>
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coupon",
  props: {
    used: String,
    amount: String,
    condition: String,
    name: String,
    start: String,
    end: String,
    type: String
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
.coupon {
  padding: 10px 10px 0px 10px;
}
.coupon-img {
  position: relative;

  width: 100%;
  height: 140px;
  background-size: 100% 100%;
}
.coupon-img-use {
  background-size: 100% 100%;
}
.coupon-title {
  position: absolute;
  width: 50%;
  left: 5%;
  top: 35px;
  text-align: center;
}
.coupon-value {
  position: absolute;
  width: 30%;
  right: 5%;
  top: 20px;
  text-align: center;
}
.coupon-money {
  font-size: 28px;
}
.coupon-date {
  font-size: 12px;
  color: #666666;
}
.coupon-type {
  font-weight: bolder;
  color: #666666;
  padding: 10px 0px;
}
</style>
