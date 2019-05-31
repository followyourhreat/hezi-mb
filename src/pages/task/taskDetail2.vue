<template>
  <div class="page">
    <van-nav-bar title="任务详情" left-arrow :border="false" @click-left="handleGoBack" @click-right="handleRank">
      <span slot="right">排名</span>
    </van-nav-bar>
    <div class="page-scroll">
      <div style="padding: 2vw">
        <span v-html="detail.descr"></span>
      </div>
    </div>
    <div class="page-buttom">
      <van-button type="primary" size="large" v-if="detail.is_join =='0'" @click="handleSubmit">领取任务</van-button>
      <van-button type="primary" size="large" v-if="detail.is_join =='1'" disabled>已领取</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        detail: {},
      }
    },
    mounted () {
      this.id = this.$route.query.id
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.$http.post('task/detail',{id: this.id}).then( res => {
          this.detail = res.data;
        })
      },
      handleRank(){
        this.$router.push({
          path: '/taskRank',
          query: {id: this.id}
        })
      },
      handleSubmit(val) {
        this.$post('task/join',{task_id: this.id}).then( res => {
          this.$toast('领取成功');
          this.handleBack();
        })
      },
    },
  };
</script>

<style lang="less" scoped>
  
</style>
