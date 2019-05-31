<template>
  <div class="page">
    <van-nav-bar title="我的收藏" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div class="card-content">
      <div v-for="(item, index) in collectionList" :key="index" v-if="item.goods">
        <van-swipe-cell :right-width="90">
          <van-cell-group>
            <div class="van-cell-cart">
              <dt-card2
                linkable
                :id="item.goods.id"
                :src="item.goods.cover_image"
                :title="item.goods.goods_name"
                :value="item.goods.price_now"
              ></dt-card2>
            </div>
          </van-cell-group>
          <span slot="right">
            <div class="van-cell-del" @click="handleDelete(item.id)">
              <img src="../../assets/cart-delete_03.png" alt>
            </div>
          </span>
        </van-swipe-cell>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectionList: []
    };
  },
  mounted() {
    this.getCollectionList();
  },
  methods: {
    getCollectionList() {
      this.$http.post("collection/list", {}).then(res => {
        this.collectionList = res.data.list;
      });
    },
    handleDelete(val) {
      this.$http.post("collection/del", { id: val }).then(res => {
        this.$toast("删除成功");
        this.getCollectionList();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-content {
  padding: 0 0.2rem;
}
.van-cell-group {
  background-color: rgba(0, 0, 0, 0);
}
.van-cell-cart {
}
.card-link {
  display: none;
}
.van-cell-del {
  display: block;
  text-align: center;
  width: 0.9rem;
  height: 0.56rem;
  line-height: 056rem;

  color: #fff;
  border-radius: 0.06rem;
}
.van-hairline--top-bottom::after {
  display: none;
}
</style>
