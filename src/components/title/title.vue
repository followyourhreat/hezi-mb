<template>
  <div class="cell">
    <div class="cell-title"><span>{{curTitle}}</span></div>
    <div class="cell-value"><span @click="handleMore">查看更多 > </span></div>
  </div>
</template>

<script>
export default {
  name: 'tip-title',
  props: {
    title: String,
    id: String
  },
  data() {
    return {
      curTitle: this.title,
      curId: this.id,
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
    }
  },
}
</script>

<style lang="less" scoped>
  .cell {
    display: flex;
    box-sizing: border-box;
    width: 100vw;
    padding: 10px 3vw;
    background: #1b1a1b;
    .cell-title{
      flex: 1;
      border-left: 4px solid #f2c700;
      padding-left: 10px;
    }
    .cell-value{
      
    }
  }
</style>
