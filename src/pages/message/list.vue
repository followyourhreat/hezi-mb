<template>
  <div class="page">
    <van-nav-bar :title="title" left-arrow :border="false" @click-left="handleGoBack"></van-nav-bar>
    <div class="page-scroll">
      <div style="padding: 2vw">
        <span v-html="detail.content"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        type: '',
        title: '',
        detail: {
          content: ''
        },
      }
    },
    mounted () {
      this.type = this.$route.query.type
      const obj = {'1': '常见问题','2': '公司信息','3': '用户指南'}
      this.title = obj[this.type]
      this.getDetail();
    },
    methods: {
      getDetail() {
        this.$http.post('user/setting',{type: this.type}).then( res => {
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
