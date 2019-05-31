<template>
  <div class="page">
    <van-nav-bar title="我的订单" left-arrow :border="false" @click-left="handleGoBack"></van-nav-bar>
    <div class="tabs-content">
      <van-tabs color="#f2c700" @click="clickTab">
        <van-tab title="全部订单"></van-tab>
        <van-tab title="待付款"></van-tab>
        <van-tab title="待收货"></van-tab>
        <van-tab title="待评论"></van-tab>
      </van-tabs>
    </div>
    <div class="card-content">
      <p class="no-data" v-if="!orderList.length">暂无数据</p>
      <van-list v-model="loading" :finished="finished" :immediate-check="false" @load="onLoad">
        <div v-for="(item, index) in orderList" :key="index" v-if="item.goods">
          <dt-card2 :id="item.goods.id" :src="item.goods.cover_image" :title="item.goods.goods_name" :value="item.real_price">
            <span>{{item.orderText}}</span>
          </dt-card2>
          <div class="card-operation">
            <span class="btn" v-if="item.order_status == '1'||item.order_status == '3'" @click="handleDetail(item)">订单详情</span>
            <span class="btn" v-if="item.order_status == '1'" @click="handleCancel(item)">取消订单</span>
            <span class="btn" v-if="item.order_status == '1'" @click="handlePay(item)">付款</span>
            <span class="btn" v-if="item.order_status == '3'" @click="handleLog(item)">追踪物流</span>
            <span class="btn" v-if="item.order_status == '3'" @click="handleSure(item)">确认收货</span>
            <span class="btn" v-if="item.order_status == '4'" @click="handleComment(item)">评论</span>
          </div>
        </div>
      </van-list>
    </div>
    <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
      <div class="popup-title">
        追踪物流
        <i class="van-sku__close-icon van-icon van-icon-close" @click="show = false"></i>
      </div>
      <div class="popup-list">
        <van-steps direction="vertical" :active="0" active-color="#f2c700">
          <van-step v-for="(item, index) in logList" :key="index">
            <h4>{{item.AcceptStation}}</h4>
            <p>{{item.AcceptTime}}</p>
          </van-step>
        </van-steps>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          order_status: '0',
          page_now: 1,
        },
        orderList: [],
        loading: false,
        finished: false,
        show: false,
        logList: [],
      }
    },
    mounted () {
      this.getOrderList();
    },
    methods: {
      onLoad() {
        setTimeout(() => {
          this.params.page_now ++;
          this.getOrderList();
        }, 500);
      },
      getOrderList() {
        this.loading = true;
        this.$http.post('order/list',this.params).then( res => {
          this.loading = false;
          var list = res.data.list;
          var obj = {
            '1': '待支付',
            '2': '待发货',
            '3': '待收货 ',
            '4': '待评论',
            '6': '已评论',
          }
          list.forEach( item =>{
            item.orderText = obj[item.order_status]
          })
          this.orderList = [].concat(this.orderList,res.data.list)
          if (res.data.page_now == res.data.page_total) {
            this.finished = true;
          }
        })
      },
      clickTab(val) {
        if(val == 0){
          this.params.order_status = 0;
        }
        if(val == 1){
          this.params.order_status = 1
        }
        if(val == 2){
          this.params.order_status = 3;
        }
        if(val == 3){
          this.params.order_status = 4;
        }
        this.orderList = [];
        this.loading = false;
        this.finished = false;
        this.params.page_now = 1;
        this.getOrderList();
      },
      // 取消订单
      handleCancel(item) {
        this.$post('order/cancel',{order_id: item.id}).then( res => {
          this.$toast('取消成功');
          this.orderList = [];
          this.loading = false;
          this.finished = false;
          this.params.page_now = 1;
          this.getOrderList();
        })
      },
      // 付款
      handlePay(item) {
        window.DTCJSObject.CheckOrderId(item.id);
      },
      // 详情
      handleDetail(item) {
        this.$router.push({
          path: '/orderDetail',
          query: {id: item.id}
        })
      },
      // 物流
      handleLog(item) {
        this.show = true;
        this.$http.post('order/express',{order_id: item.id}).then( res => {
          this.logList = res.data.traces
        })
      },
      // 收货
      handleSure(item) {
        this.$post('order/confirm',{order_id: item.id}).then( res => {
          this.$toast('确认成功');
          this.orderList = [];
          this.loading = false;
          this.finished = false;
          this.params.page_now = 1;
          this.getOrderList();
        })
      },
      // 评论
      handleComment(item) {
        this.$router.push({
          path: '/commentAdd',
          query: {order_id: item.id,goods_id: item.goods_id}
        })
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
  .card-operation{
    background: #1B1A1B;
    padding: 3vw;
    border-top: 1px solid #494949;
  }
  .btn{
    border: 1px solid #494949;
    padding: 5px 10px;
    margin: 0px 5px;
    border-radius: 10px;
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
</style>
