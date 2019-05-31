<template>
  <div class="page">
    <van-nav-bar title="发布评论" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div class="page-scroll">
      <div>
        <van-cell-group>
          <van-field v-model="content" type="textarea" placeholder="请输入评论" rows="4" autosize/>
        </van-cell-group>
      </div>
      <div>
        <div class="comment-img" v-for="(item, index) in imageList" :key="index">
          <img :src="item">
          <span class="img-del" @click="handleDelete(index)">
            <van-icon name="clear"/>
          </span>
        </div>
        <div class="comment-add">
          <van-uploader
            :before-read="beforeRead"
            :after-read="afterRead"
            accept="image/png, image/jpg, image/jpeg, image/gif"
          >
            <!-- <img src="../../assets/ic_picture.png"> -->
          </van-uploader>
        </div>
      </div>
    </div>
    <div class="page-buttom">
      <van-button type="primary" size="large" @click="handleSubmit">发布</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: {},
      content: "",
      imageList: []
    };
  },
  mounted() {
    this.params = this.$route.query;
  },
  methods: {
    beforeRead() {
      if (this.imageList.length > 3) {
        this.$toast("最多只能上传4张图片");
        return false;
      } else {
        return true;
      }
    },
    afterRead(file) {
      if (Object.prototype.toString.call(file) == "[object Array]") {
        this.$toast("每次只能上传一张图片");
        return;
      }
      this.$upload("upload/upload", {
        target: "mallcomments",
        image: file.file
      }).then(res => {
        this.imageList.push(res.data.path);
      });
    },
    handleDelete(index) {
      this.imageList.splice(index, 1);
    },
    handleSubmit() {
      if (this.content.trim() == "") {
        this.$toast("请输入评论内容");
        return;
      }
      this.$post("comments/add", {
        order_id: this.params.order_id,
        goods_id: this.params.goods_id,
        content: this.content,
        pictures: this.imageList.join(",")
      }).then(res => {
        this.handleBack();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-content {
  width: 100vw;
  height: calc(100vh - 100px);
  overflow-y: scroll;
}
.comment-img {
  position: relative;
  width: 20vw;
  height: 20vw;
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
.img-del {
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 10px;
  color: #f2c700;
}
.comment-add {
  position: relative;
  width: 20vw;
  height: 20vw;
  box-sizing: border-box;
  display: inline-block;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
