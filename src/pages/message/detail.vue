<template>
  <div class="page">
    <van-nav-bar title="成就详情" left-arrow :border="false" @click-left="handleGoBack"></van-nav-bar>
    <div class="page-scroll">
      <div style="padding: 2vw">
        <div style="text-align: center;margin-bottom: 10px;">
          <img style="width: 150px;height: 150px;" :src="detail.icon">
          <p>{{detail.medal_name}}</p>
        </div>
        <div>
          <span v-html="detail.descr"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        detail: {
          icon:'',
          medal_name:'',
          descr: ''
        },
      }
    },
    mounted () {
      this.id = this.$route.query.id
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.$http.post('user/medaldetail',{id: this.id}).then( res => {
          this.detail = res.data;
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  .page-scroll{
    height: calc(100vh - 50px);
  }
</style>
