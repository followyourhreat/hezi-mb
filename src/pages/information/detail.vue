<template>
  <div class="info-detail">
    <div class="info-header">
      <div class="info-header-left" @click="onClickLeft">
        <i></i>
      </div>
      <ul @click="toInfoDetail" class="infodetail-menu">
        <li :class="{active:modal1}">详情</li>
        <li :class="{active:modal2}">评论</li>
      </ul>
    </div>
    <div class="info_detail_content" v-show="modal1">
      hizero扫地机的小秘密，既然点进来，那就看完再走吧。
      极致便利，效率，节能，和生态友好，连续运行长达60分钟，无需充电。一步到位，省时省力，自动清洁系统。hizero扫地机，桌角，墙角，床底下，所有你觉得不可能扫到的地方，都可以轻松搞定，一步到位，既省时又省力，大人小孩简单操作，摆脱难用的困难，让打扫变成一种乐趣，让清洁变成一种愉快。点击hizero右侧清理垃圾，轻轻点击hizero右侧的清扫键，一键解决，轻松省力，再也不用担心操作麻烦学不会了，简单操作，一学即会。自动获得专利的废物分离系统，用清洁剂分清固体和液体废物固体废物进入垃圾容器托盘和液体废物脏水箱。内置双水系统可清洁特殊聚合物在您工作时使用滚轮，确保每次都能获得闪亮的效果无需清洗滚筒。极致便利，效率，节能，和生态友好连续运行长达60分钟，无需充电。
      极致便利，效率，节能，和生态友好，连续运行长达60分钟，无需充电。一步到位，省时省力，自动清洁系统。hizero扫地机，桌角，墙角，床底下，所有你觉得不可能扫到的地方，都可以轻松搞定，一步到位，既省时又省力，大人小孩简单操作，摆脱难用的困难，让打扫变成一种乐趣，让清洁变成一种愉快。点击hizero右侧清理垃圾，轻轻点击hizero右侧的清扫键，一键解决，轻松省力，再也不用担心操作麻烦学不会了，简单操作，一学即会。自动获得专利的废物分离系统，用清洁剂分清固体和液体废
    </div>
    <div class="info_comments" v-show="modal2">
      <div class="info_comments_area">
        <textarea name id cols="30" rows="10" v-model="comments_content" @input="descInput"></textarea>
        <span>{{remnant}}/100</span>
      </div>
      <button class="info_comments_btn btn-submit" @click="handleSubmit">发布</button>
      <div class="info_comments_list">
        <span class="info_tag">热门标签</span>
        <div class="comments_box">
          <span class="comments_title">一个猴子的忧伤</span>
          <p class="comments_contents">我觉得吧,hizero特别好用,不是用起来,就是使用时候的那种感觉就很好.....</p>
          <div class="comments_time">
            <span>2019-04-22</span>
            <span>10:32</span>
          </div>
        </div>
        <div class="comments_box">
          <span class="comments_title">一个猴子的忧伤</span>
          <p class="comments_contents">我觉得吧,hizero特别好用,不是用起来,就是使用时候的那种感觉就很好.....</p>
          <div class="comments_time">
            <span>2019-04-22</span>
            <span>10:32</span>
          </div>
        </div>
        <div class="comments_box">
          <span class="comments_title">一个猴子的忧伤</span>
          <p class="comments_contents">我觉得吧,hizero特别好用,不是用起来,就是使用时候的那种感觉就很好.....</p>
          <div class="comments_time">
            <span>2019-04-22</span>
            <span>10:32</span>
          </div>
        </div>
        <div class="comments_box">
          <span class="comments_title">一个猴子的忧伤</span>
          <p class="comments_contents">我觉得吧,hizero特别好用,不是用起来,就是使用时候的那种感觉就很好.....</p>
          <div class="comments_time">
            <span>2019-04-22</span>
            <span>10:32</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: true,
      modal2: false,
      comments_content: "",
      remnant: "0"
    };
  },
  methods: {
    toInfoDetail() {
      this.modal1 = !this.modal1;
      this.modal2 = !this.modal2;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    descInput() {
      this.remnant = this.comments_content.length;
    },
    handleSubmit() {
      console.log("提交成功");
    }
  }
};
</script>
<style lang="less"  scoped>
.info-header {
  height: 0.96rem;
  line-height: 0.96rem;
  position: relative;
}
.infodetail-menu {
  position: relative;
  text-align: center;

  li {
    display: inline-block;
    margin: 0 0.32rem;
    float: none;
    clear: both;
    color: #fff;
    font-size: 0.33rem;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  li.active {
    border-bottom: 0.04rem solid #ff0000;
  }
}
.info-header::after {
  content: " ";
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  border: 0 solid #ebedf0;
  border-bottom-width: 1px;
  display: none;
}
.info-header-left {
  position: absolute;
  left: 0.2rem;
  bottom: 0;
  z-index: 10;
  i {
    display: inline-block;
    font-style: normal;

    vertical-align: middle;
    position: relative;
    font: 14px/1 "vant-icon";
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    color: #fff;
  }
  i:before {
    content: "\F008";
  }
  i::before {
    display: inline-block;
  }
}
.info_detail_content {
  padding: 0.2rem;
  color: #fff;
}
.info_comments {
  padding: 0.2rem;
  color: #fff;
}
.info_comments_area {
  position: relative;
  textarea {
    background: 0, 0, 0, 0;
    display: block;
    width: 100%;
    padding: 0.2rem;
    border-radius: 0.06rem;
  }
  span {
    color: #cfcfcf;
    display: block;
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
  }
}
.btn-submit {
  border: none;
  outline: none;
  -webkit-appearance: none;
  width: 1.26rem;
  height: 0.62rem;
  background-color: #ff0000;
  box-shadow: 0 0.05rem 0.15rem 0 rgba(255, 0, 0, 0.46);
  border-radius: 0.06rem;
  float: right;
  margin: 0.2rem 0;
  font-size: 0.29rem;
  display: block;
  overflow: hidden;
}
.info_comments_list {
  position: relative;
  width: 100%;
  overflow: hidden;
  .info_tag {
    line-height: 0.56rem;
    font-size: 0.29rem;
    margin-bottom: 0.29rem;
    display: block;
  }
  .comments_box {
    position: relative;
    overflow: hidden;
    background: #53555c;
    border-radius: 0.06rem;
    padding: 0.14rem;
    margin-bottom: 0.27rem;
    .comments_title {
      font-size: 0.29rem;
    }
    .comments_contents {
      margin: 0.2rem 0;
      font-size: 0.25rem;
    }
    .comments_time {
      position: relative;
      float: right;
      font-size: 0.21rem;
      span:first-child {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>

