<template>
  <div class="comment-content">
    <div class="cell">
      <div class="cell-title">
        <img class="cell-img" :src="src">
        <span>{{nickname}}</span>
      </div>
      <div class="cell-value">
        <span>{{new Date(ctime*1000).Format("yyyy-MM-dd hh:mm:ss")}}</span>
      </div>
    </div>
    <div class="text">
      <span v-html="content"></span>
    </div>
    <van-row gutter="20">
      <van-col span="8" v-if="pictures.length" v-for="(item, index) in pictures" :key="index"><img class="img" :src="item" @click="handleImage(index)"></van-col>
    </van-row>
  </div>
  
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  name: 'tip-title',
  props: {
    src: String,
    nickname: String,
    ctime: String,
    content: String,
    pictures: Array,
  },
  data() {
    return {

    }
  },
  computed: {
    
  },
  methods: {
    handleMore(){
      this.$router.push({
        path: '/more',
        query: {id: this.curId}
      })
    },
    handleImage(index) {
      ImagePreview({
        images: this.pictures,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    }
  },
}
</script>

<style lang="less" scoped>
  .comment-content{
    background: #1B1A1B;
    margin-bottom: 10px;
    padding: 10px;
  }
  .cell {
    display: flex;
    box-sizing: border-box;
    .cell-title{
      flex: 1;
    }
    .cell-value{

    }
    .cell-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-sizing: border-box;
      background-color: #fff;
      vertical-align: middle;
    }
  }
  .text{
    padding: 10px 0px;
  }
  .img{
    height: 100px;
    width: 100%;
    background-color: #fff;
  }
</style>
