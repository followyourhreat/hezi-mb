<template>
  <div class="page">
    <van-nav-bar
      title="资讯列表"
      left-text
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="info-list">
      <ul>
        <li>
          <a @click="toDetail">
            <div class="info-content">
              <img
                src="http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
                alt
              >
              <span>如果你无法简洁的表达你的想法,那只说明你还不够了解它.阿尔伯特.爱因斯坦.</span>
            </div>
          </a>
        </li>
        <li>
          <a @click="toDetail">
            <div class="info-content">
              <img
                src="http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
                alt
              >
              <span>如果你无法简洁的表达你的想法,那只说明你还不够了解它.阿尔伯特.爱因斯坦.</span>
            </div>
          </a>
        </li>
        <li>
          <a @click="toDetail">
            <div class="info-content">
              <img
                src="http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
                alt
              >
              <span>如果你无法简洁的表达你的想法,那只说明你还不够了解它.阿尔伯特.爱因斯坦.</span>
            </div>
          </a>
        </li>
        <li>
          <a @click="toDetail">
            <div class="info-content">
              <img
                src="http://120.24.55.58:8139/uploads/mallbanner/20190124/f11453a6efb040e4b0303fc1e35f32ac.jpg"
                alt
              >
              <span>如果你无法简洁的表达你的想法,那只说明你还不够了解它.阿尔伯特.爱因斯坦.</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-list">
      <ul>
        <li>
          <a href="#">
            <img src="../../assets/equip.png" alt>
            <span>设备</span>
          </a>
        </li>
        <li>
          <a @click="toMall">
            <img src="../../assets/mall.png" alt>
            <span>商城</span>
          </a>
        </li>
        <li>
          <a @click="toInfo">
            <img src="../../assets/info.png" alt>
            <span>资讯</span>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/mem.png" alt>
            <span>我的</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toMall() {
      this.$router.push({ path: "/" });
    },
    toInfo() {
      this.$router.push({ path: "/information" });
    },
    toDetail() {
      this.$router.push({ path: "/infoDetail" });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      console.log("---------");
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar__text {
  color: #fff;
}
.info-list {
  margin-top: 0.3rem;
  position: relative;
  padding: 0.1rem 0.2rem;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  ul {
    li {
      position: relative;
      overflow: hidden;
      border-top-left-radius: 0.16rem;
      border-top-right-radius: 0.16rem;
      margin-bottom: 0.4rem;
      width: 100%;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      span {
        display: inline-block;
        padding: 0.2rem 0.1rem;
        background: #fff;
        width: 100%;
        color: #333;
        font-size: 0.2rem;
      }
    }
  }
}
</style>
