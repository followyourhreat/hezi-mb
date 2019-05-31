<template>
  <div class="card">
    <div class="card-img" @click="handleDetail">
      <img width="100%" height="100%" :src="curSrc">
    </div>
    <div class="cell">
      <div class="cell-title">
        <span>{{curTitle}}</span>
      </div>
      <div class="cell-value">
        <span class="text-yellow">¥ {{curValue}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    src: String,
    title: String,
    value: String,
    id: String
  },
  data() {
    return {
      curSrc: this.src,
      curTitle: this.title,
      curValue: this.value,
      curId: this.id
    };
  },
  computed: {},
  methods: {
    handleDetail() {
      this.$router.push({
        path: "/detail",
        query: { id: this.curId }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  box-sizing: border-box;
  width: 3.34rem;
  background: #53555c;
  border-radius: 0.06rem;
  padding: 0.11rem;
  margin-bottom: 0.4rem;
  float: left;
}

.card-img {
  width: 100%;
  height: 3.13rem;
  box-sizing: border-box;
  background-color: #fff;
}
.cell {
  box-sizing: border-box;
  width: 100%;

  position: relative;
  color: #ebeaeb;
  align-items: baseline;
  font-size: 0.24rem;
  .cell-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    display: block;
    margin: 0.2rem auto;
  }
  .cell-value {
    display: block;
    text-align: center;
  }
}
</style>
