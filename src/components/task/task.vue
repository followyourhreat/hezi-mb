<template>
  <div class="task">
    <div class="task-img" :class="{active: join == 0,finish: join == 1,pick: join == 2}" @click="handleDetail">
      <div class="cell-number"><span class="">{{value}}</span></div>
    </div>
    <div class="cell">
      <div class="cell-title"><span>{{name}}</span></div>
      <div class="cell-value"><span class="text-yellow" style="font-size: 12px;">{{start}}至{{end}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: {
    join: String,
    value: String,
    name: String,
    start: String,
    end: String,
    id: String
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    handleDetail(){
      this.$router.push({
        path: '/taskDetail',
        query: {id: this.id}
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .task {
    display: inline-block;
    box-sizing: border-box;
    width: 45vw;
    background: #1B1A1B;
    border-radius: 2vw;
    padding: 3vw;
    margin-bottom: 2vw; 
  }
  .task:nth-child(n) {
    margin-left: 3vw;
    margin-right: 2vw;
  }
  .task:nth-child(2n) {
    margin-left: 2vw;
    margin-right: 3vw;
  }
  .task-img {
    position: relative;
    width: 100%;
    height: 70px;
    box-sizing: border-box;
  }
  .task:nth-child(n) .active{
    background: url('../../assets/task/pink.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(n) .finish{
    background: url('../../assets/task/pink_finish.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(n) .pick{
    background: url('../../assets/task/pink_pick.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(2n) .active{
    background: url('../../assets/task/peach.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(2n) .finish{
    background: url('../../assets/task/peach_finish.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(2n) .pick{
    background: url('../../assets/task/peach_pick.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(3n) .active{
    background: url('../../assets/task/blue.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(3n) .finish{
    background: url('../../assets/task/blue_finish.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(3n) .pick{
    background: url('../../assets/task/blue_pick.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(4n) .active{
    background: url('../../assets/task/yellow.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(4n) .finish{
    background: url('../../assets/task/yellow_finish.png') no-repeat;
    background-size:100% 100%;
  }
  .task:nth-child(4n) .pick{
    background: url('../../assets/task/yellow_pick.png') no-repeat;
    background-size:100% 100%;
  }
  .cell-number{
    position: absolute;
    right: 5px;
    top: 25px;
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
    .number{
      font-size: 24px;
    }
  }
  .cell {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding-top: 10px;
    position: relative;
    color: #ebeaeb;
    align-items: baseline;
    .cell-title{
      flex: 1;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .cell-value{
      
    }
  }
</style>
