<template>
  <div class="page">
    <van-nav-bar title="我的优惠券" left-arrow :border="false" @click-left="handleGoBack" @click-right="handleRouter('couponAdd')">
      <span slot="right">领券</span>
    </van-nav-bar>
    <div class="tabs-content">
      <van-tabs color="#f2c700" @click="clickTab">
        <van-tab :title="`未使用(${count.unused})`"></van-tab>
        <van-tab :title="`已使用(${count.used})`"></van-tab>
        <van-tab :title="`已过期(${count.expired})`"></van-tab>
      </van-tabs>
    </div>
    <div class="card-content">
      <p class="no-data" v-if="!couponList.length">暂无数据</p>
      <dt-coupon v-for="(item, index) in couponList" v-if="item.coupon" :key="index" :used="params.is_used" :amount="item.coupon.amount" :condition="item.coupon.use_condition" :name="item.coupon.coupon_name" :start="item.coupon.start_date" :end="item.coupon.end_date" :type="item.coupon.coupon_type">
        <van-button type="primary" size="small" round v-if="params.is_used=='1'" @click="handleUse(item)">立即使用</van-button>
        <van-button type="primary" size="small" round v-if="params.is_used=='2'">已使用</van-button>
        <van-button type="primary" size="small" round v-if="params.is_used=='3'">已过期</van-button>
      </dt-coupon>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          is_used: '1',
          page_now: '1',
        },
        count: {
          unused: 0,
          used: 0,
          expired: 0,
        },
        couponList: [],
      }
    },
    mounted () {
      this.getCouponList();
      this.getCouponCount();
    },
    methods: {
      getCouponList() {
        this.$http.post('coupon/usercoupon',this.params).then( res => {
          this.couponList = res.data.list||[]
        })
      },
      getCouponCount() {
        this.$http.post('coupon/couponcount',{}).then( res => {
          this.count = res.data
        })
      },
      handleUse(item){
        if(item.coupon.coupon_type =='1'){
          this.$router.push({
            path: '/more'
          })
        }else{
          this.$router.push({
            path: '/detail',
            query: {id: item.coupon.goods_id}
          })
        }
      },
      clickTab(val) {
        if(val == 0){
          this.params.is_used = '1';
        }
        if(val == 1){
          this.params.is_used = '2';
        }
        if(val == 2){
          this.params.is_used = '3';
        }
        this.couponList = [];
        this.getCouponList();
      },
      handleBack(){
        window.WebView.goBack();
      }
    },
  };
</script>

<style lang="less" scoped>
  .tabs-content{
    height: 44px;
  }
  .card-content{
    width: 100vw;
    height: calc(100vh - 100px);
    overflow-y: scroll; 
  }
</style>
