<template>
  <div class="coupon">
    <div class="coupon-img">
      <div class="coupon-title">
        <p>
          <span class="coupon-money">¥ {{amount}}</span>优惠券
        </p>
        <p>满{{condition}}元可用</p>
        <p class="coupon-date">{{start}}至{{end}}</p>
      </div>
      <div class="coupon-value">
        <p class="coupon-type">
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coupon2",
  props: {
    amount: String,
    condition: String,
    start: String,
    end: String
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleMore() {
      this.handleRouter("more");
    }
  }
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
.coupon-title {
  position: absolute;
  width: 50%;
  left: 5%;
  top: 35px;
  text-align: center;
}
.coupon-value {
  position: absolute;
  width: 25%;
  right: 5%;
  top: 60px;
  text-align: center;
}
.coupon-money {
  font-size: 28px;
}
.coupon-date {
}
.coupon-type {
}
</style>
