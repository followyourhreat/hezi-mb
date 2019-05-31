<template>
  <div class="page">
    <van-nav-bar title="排行榜" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div class="page-scroll">
      <!-- <van-cell-group>
        <van-cell v-for="(item, index) in rankList" :key="index">
          <template slot="title">
            <span>{{item.ranking}}</span>
            <img class="cell-img" :src="item.user.image">
            <span>{{item.user.nickname}}</span>
          </template>
          <span class="text-yellow">{{item.finished_percent}}%</span>
        </van-cell>
      </van-cell-group> -->
      <div class="van-cell" v-for="(item, index) in rankList" :key="index">
        <div class="van-cell__title" style="min-width: 80vw;">
          <span>{{item.ranking}}</span>
          <img class="cell-img" :src="item.user.image">
          <span>{{item.user.nickname}}</span>
        </div>
        <div class="van-cell__value">
          <span class="text-yellow">{{item.finished_percent}}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        rankList: [],
      }
    },
    mounted () {
      this.id = this.$route.query.id
      this.getRankList();
    },
    methods: {
      getRankList() {
        this.$http.post('task/rank',{task_id: this.id}).then( res => {
          this.rankList = res.data.list
        })
      },
    },
  };
</script>

<style lang="less" scoped>
  .cell-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #fff;
    vertical-align: middle;
    margin: 0px 10px;
  }
</style>
