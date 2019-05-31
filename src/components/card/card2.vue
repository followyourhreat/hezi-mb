<template>
  <div class="card">
    <div class="card-img">
      <img width="100%" height="100%" :src="curSrc">
    </div>
    <div class="cell" @click="handleDetail">
      <div class="cell-title">
        <span>{{curTitle}}</span>
      </div>
      <div class="cell-value">
        <span class="text-yellow">¥ {{curValue}}</span>
        <div style="float: right">
          <slot></slot>
        </div>
      </div>
    </div>
    <div v-if="linkable" class="card-link">
      <van-icon name="arrow" @click="handleDetail"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "card2",
  props: {
    src: String,
    title: String,
    value: String,
    id: String,
    linkable: Boolean
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
  display: flex;
  box-sizing: border-box;
  width: 100%;
  background: #53555c;
  border-radius: 0.06rem;
  padding: 3vw;
  margin-top: 2vw;
}
.card-img {
  width: 20vw;
  height: 20vw;
  min-width: 20vw;
  box-sizing: border-box;
  background-color: #fff;
}
.cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ebeaeb;
  padding: 0px 10px;
  .cell-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .cell-value {
    line-height: 28px;
  }
}
.card-link {
  width: 10vw;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
</style>
