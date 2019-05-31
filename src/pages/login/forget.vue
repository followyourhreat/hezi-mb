<template>
  <div class="login">
    <h1 style="text-align: center;margin: 40px 0px 60px 0px;">注册完成</h1>
    <div style="font-size: 18px;">请点击下方按钮去下载APP,然后扫描绑定净水设备再使用,如果您没有机器,可向您的推荐人询问获取渠道,感谢您的支持!</div>
    <van-button size="large" type="primary" style="margin-top: 60px;" @click="handleDown">去下载应用</van-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
    mounted () {
      
    },
    methods: {
      handleDown () {
       // window.location.href = 'https://www.pgyer.com/bxfg';
       window.location.href = this.$route.query.url;
      }
    },
  };
</script>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 20px;
  }
</style>
