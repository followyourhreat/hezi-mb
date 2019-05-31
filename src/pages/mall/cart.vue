<template>
  <div class="page">
    <van-nav-bar
      title="我的购物车"
      left-arrow
      :border="false"
      @click-left="handleBack"
      @click-right="onClickRight"
    >
      <span slot="right">清空</span>
    </van-nav-bar>
    <div class="page-scroll">
      <van-swipe-cell
        :right-width="89"
        v-if="item.goods"
        v-for="(item, index) in cartList"
        :key="index"
      >
        <van-cell-group>
          <div class="van-cell-checkbox">
            <van-checkbox v-model="item.select" @change="changeSelect" checked-color="#ff0000"></van-checkbox>
          </div>
          <div class="van-cell-cart">
            <dt-card2
              :id="item.goods.id"
              :src="item.goods.cover_image"
              :title="item.goods.goods_name"
              :value="item.goods.price_now"
            >
              <van-stepper
                v-model="item.goods_num"
                integer
                disable-input
                @change="changeNum(item)"
              />
            </dt-card2>
          </div>
        </van-cell-group>
        <span slot="right">
          <div class="van-cell-del" @click="handleDelete(item.id)">
            <!-- <span class="delete-btn">删除</span> -->
            <img src="../../assets/cart-delete_03.png" alt>
          </div>
        </span>
      </van-swipe-cell>
    </div>
    <van-submit-bar :price="price*100" button-text="提交订单" @submit="handleSubmit">
      <div>
        <van-checkbox v-model="checked" style="padding-left: 10px;" @click="changeAll">全选</van-checkbox>
      </div>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: [],
      cartIds: [],
      price: 0,
      checked: false
    };
  },
  watch: {
    // checked(val){
    //   if(val){
    //     this.cartList.forEach( item =>{
    //       item.select = true
    //     })
    //   }else{
    //     this.cartList.forEach( item =>{
    //       item.select = false
    //     })
    //   }
    // },
    // 'cartList':{
    //   deep:true,
    //   handler:function(newValue,oldValue){
    //     console.log(newValue,oldValue)
    //   },
    // }
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.cartList = [];
      this.$http.post("cart/list", {}).then(res => {
        var list = res.data;
        //默认选中第一个
        list.forEach(item => {
          item.select = false;
        });
        this.cartList = list;
      });
    },
    handleSubmit() {
      if (this.cartIds.length == 0) {
        this.$toast("请勾选商品");
        return;
      }
      this.$router.push({
        path: "/order",
        query: { cart_ids: this.cartIds.join() }
      });
    },
    changeNum(item) {
      this.$http
        .post("cart/edit", {
          id: item.id,
          goods_num: item.goods_num
        })
        .then(res => {
          this.handlePrice();
        });
    },
    changeSelect() {
      this.handlePrice();
    },
    changeAll() {
      if (this.checked) {
        this.cartList.forEach(item => {
          item.select = true;
        });
      } else {
        this.cartList.forEach(item => {
          item.select = false;
        });
      }
      this.checked = !this.checked;
    },
    handlePrice() {
      var price = 0,
        cartIdArr = [];
      this.cartList.forEach(item => {
        if (item.select) {
          cartIdArr.push(item.id);
          price = price + Number(item.goods.price_now) * Number(item.goods_num);
        }
      });
      this.price = price;
      this.cartIds = cartIdArr;
      this.checked = this.cartList.every(item => {
        return item.select;
      });
    },
    onClickRight() {
      this.$http.post("cart/clear", {}).then(res => {
        this.$toast("清空成功");
        this.cartList = [];
        this.cartIds = [];
        this.checked = false;
        this.price = 0;
      });
    },
    handleDelete(val) {
      this.$http.post("cart/del", { id: val }).then(res => {
        this.$toast("删除成功");
        this.cartList = [];
        this.cartIds = [];
        this.checked = false;
        this.price = 0;
        this.getCartList();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-scroll {
  padding: 0 0.2rem;
}
.van-cell-group {
  background: #53555c;
  border-radius: 0.06rem;
  display: flex;
}
.van-cell-checkbox {
  display: flex;
  text-align: center;
  width: 0.49rem;
  flex-direction: column;
  justify-content: center;
  .van-checkbox {
  }
}
.van-hairline--top-bottom::after {
  display: none;
}

.van-cell-cart {
  display: flex;
  flex: 1;
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
.van-nav-bar__right {
  color: #fff;
}
.van-submit-bar__price {
  color: #fff;
}
.van-submit-bar__bar {
  height: 1.17rem;
  line-height: 1.17rem;
  background: #53555c;
  .van-submit-bar__text {
    color: #fff;
    padding-left: 0.21rem;
    font-size: 0.29rem;
    .van-submit-bar__price {
      color: #fff;
      font-size: 0.33rem;
    }
  }
}

.van-button--large {
  width: 2.08rem;
  height: 1.19rem;
  line-height: 1.19rem;
  background-image: linear-gradient(270deg, #c70001 0%, #ff0000 100%),
    linear-gradient(#c70001, #ff0000);
  font-size: 0.29rem;
  text-align: center;
  border-radius: 0.06rem;
}
.van-checkbox__icon--checked .van-icon {
  border-color: #ff0000;
  background-color: #ff0000;
}
</style>
