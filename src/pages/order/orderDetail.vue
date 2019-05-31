<template>
  <div class="page">
    <van-nav-bar title="订单详情" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div class="page-scroll" style="height: calc(100vh - 50px);">
      <div class="title-tip">收货信息</div>
      <van-cell-group>
        <van-cell title="收货人"><span>{{detail.address.realname}}</span></van-cell>
        <van-cell title="手机号码"><span>{{detail.address.phone}}</span></van-cell>
        <van-cell title="收货地址"><span>{{detail.address.address}}</span></van-cell>
      </van-cell-group>

      <div class="title-tip">订单信息</div>
      <van-cell-group>
        <van-cell title="订单号"><span>{{detail.order_code}}</span></van-cell>
        <van-cell title="下单时间"><span>{{detail.ctime}}</span></van-cell>
        <van-cell title="支付方式"><span>{{detail.pay_way=='1'?'支付宝':detail.pay_way=='2'?'微信':'待支付'}}</span></van-cell>
      </van-cell-group>

      <div class="title-tip">付款金额</div>
      <van-cell-group>
        <van-cell title="商品合计"><span>¥ {{detail.total_price}}</span></van-cell>
        <van-cell title="运费"><span>¥ {{detail.postage}}</span></van-cell>
        <van-cell title="优惠"><span>- ¥ {{detail.minus_type=='1'?detail.points_minus:detail.coupon_minus}}</span></van-cell>
        <van-cell title="订单金额"><span>¥ {{detail.real_price}}</span></van-cell>
      </van-cell-group>

      <div class="title-tip">商品明细</div>
      <div class="van-cell-cart">
        <dt-card2 v-if="detail.detail.length" v-for="(item, index) in detail.detail" :key="index" :src="item.cover_image" :title="item.goods_name" :value="item.goods_price">
          <span> × {{item.goods_count}}</span>
        </dt-card2>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        // 商品数据
        detail: {
          address: {},
          detail: [],
        }
      }
    },
    mounted () {
      this.id = this.$route.query.id
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.$http.post('order/detail',{id: this.id}).then( res => {
          this.detail = res.data;
          this.detail.address = res.data.address|| {realname: '',phone: '',address: ''}
          this.detail.ctime = new Date(res.data.ctime*1000).Format("yyyy-MM-dd hh:mm:ss")
        })
      }
    },
  };
</script>

<style lang="less" scoped>
  .title-tip{
    padding: 10px 15px;
  }
  .popup-title{
    position: relative;
    line-height: 40px;
    text-align: center;
  }
  .popup-list{
    height: 350px;
    padding-bottom: 20px;
    overflow: auto;
  }
  .van-cell-cart{
    float: right;
    width: 100vw;
  }
</style>
