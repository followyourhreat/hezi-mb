<template>
  <div class="page">
    <div class="swipe-content">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img class="swipe-img" :src="item.image" @click="handleDetail(item.task_id)">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="tabs-content">
      <van-tabs color="#f2c700" @click="clickTab">
        <van-tab v-for="(item, index) in categoryList" :key="index" :title="item.cate_name"></van-tab>
      </van-tabs>
    </div>
    <div class="list-content">
      <div>
        <p class="no-data" v-if="!taskList.length">暂无数据</p>
        <dt-task v-for="(item, index) in taskList" :key="index" :id="item.id" :join="item.is_join" :value="item.bonus_descr" :name="item.task_name" :start="item.start_date" :end="item.end_date"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        category_id: '',
        bannerList: [],
        categoryList: [],
        taskList: [],
      }
    },
    mounted () {
      this.getBannerList();
      this.getCategoryList();
    },
    methods: {
      getBannerList() {
        this.$http.post('task/banners',{}).then( res => {
          this.bannerList = res.data
        })
      },
      getCategoryList() {
        this.$http.post('task/category',{}).then( res => {
          this.categoryList = res.data
          this.category_id = this.categoryList[0].id
          this.getTaskList();
        })
      },
      getTaskList() {
        this.$http.post('task/list',{category_id: this.category_id}).then( res => {
          console.log(res);
          this.taskList = res.data.list
        })
      },
      clickTab(val) {
        this.category_id = this.categoryList[val].id
        this.taskList = [];
        this.getTaskList();
      },
      handleDetail(val){
        this.$router.push({
          path: '/taskDetail',
          query: {id: val}
        })
      }
    },
  };
</script>

<style lang="less" scoped>
  .tabs-content{
    height: 44px;
  }
  .swipe-content{
    height: 180px;
    .swipe-img {
      width: 100vw;
      height: 100px;
      display: block;
      box-sizing: border-box;
      background: #fff;
    }
  }
  .list-content{
    height: calc(100vh - 225px);
    overflow-y: scroll;
  }
  .card-content{
    width: 100vw;
    height: auto;
    margin-top: 10px; 
  }
</style>
