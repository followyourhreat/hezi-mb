<template>
  <div class="page">
    <van-nav-bar title="领取优惠券" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div class="card-content">
      <p class="no-data" v-if="!couponList.length">暂无数据</p>
      <dt-coupon2 v-for="(item, index) in couponList" :key="index" :amount="item.amount" :condition="item.use_condition" :start="item.start_date" :end="item.end_date">
          <span v-if="item.status =='1'" @click="handleCoupon(item)">立即领取</span>
          <span v-if="item.status =='2'">已领取</span>
          <span v-if="item.status =='3'">已领完</span>
          <span v-if="item.status =='4'">已过期</span>
      </dt-coupon2>
    </div>
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        couponList: [],
      }
    },
    mounted () {
      this.getCouponList();
    },
    methods: {
      getCouponList() {
        this.$http.post('coupon/list',{}).then( res => {
          this.couponList = res.data
        })
      },
      handleCoupon(item) {
        this.$post('coupon/fetch',{coupon_id: item.id}).then( res => {
          this.$toast('领取成功');
          this.getCouponList();
        })
      },
    },
  };
</script>

<style lang="less" scoped>
  .card-content{
    width: 100vw;
    height: calc(100vh - 50px);
    overflow-y: scroll; 
  }
</style>
