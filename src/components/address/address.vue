<template>
  <div class="address">
    <!-- <div class="address-location">
      <van-icon name="location" color="#f2c700"/>
    </div>-->
    <div class="cell">
      <div class="cell-title">
        <span>{{realname}}</span>
        <span class="cell-phone">{{phone}}</span>
      </div>
      <div class="cell-value">
        <span>收货地址：{{area}}{{address}}</span>
      </div>
      <div class="cell-footer">
        <van-radio checked-color="#ff0000">默认地址</van-radio>
        <ul class="cell-operate">
          <li @click="handleEdit">
            <img src="../../assets/editaddress.png" alt>
            <span>编辑</span>
          </li>
          <li @click="handleDelete">
            <img src="../../assets/deleteaddress.png" alt>
            <span>删除</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="address-edit">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tip-address",
  props: {
    realname: String,
    phone: String,
    area: String,
    address: String,
    checkAddress: Array
  },
  data() {
    return {
      icon: {
        normal: "./assets/circle.png",
        active: "./assets/round.png"
      }
    };
  },
  computed: {},
  methods: {
    handleDetail() {
      this.handleRouter("detail");
    },
    checkClick() {
      console.log("----------");
    },
    handleEdit(item) {
      console.log(item);
      this.$router.push({
        path: "/addressEdit",
        query: { id: item.id }
      });
    },
    handleDelete(val) {
      this.$http.post("address/del", { id: val }).then(res => {
        this.$toast("删除成功");
        this.getAddressList();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.address {
  display: flex;
  box-sizing: border-box;
  width: 7.1rem;
  margin: auto;
  height: 1.73rem;
  background: none;
  border-radius: 0.06rem;
  margin-bottom: 0.27rem;
}
.address-location {
}
.address-edit {
  display: none;
}
.cell {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ebeaeb;
  padding: 0.22rem 0.1rem;
  background: #53555c;
  border-radius: 0.06rem;
  .cell-title {
    font-size: 0.29rem;
  }
  .cell-value {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 0.26rem;
  }
}
.cell-phone {
  display: block;
  float: right;
  font-size: 0.25rem;
}
.van-nav-bar .van-icon {
  color: #fff !important;
}
input[type="checkbox"] + label::before {
  content: "\a0"; /*不换行空格*/
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  width: 1em;
  height: 1em;
  margin-right: 0.4em;
  border-radius: 50%;
  border: 1px solid #01cd78;
  text-indent: 0.15em;
  line-height: 1;
}
input[type="checkbox"]:checked + label::before {
  background-color: #01cd78;
  background-clip: content-box;
  padding: 0.2em;
}
.cell-footer {
  position: relative;
  display: none;
}
.cell-operate {
  position: absolute;
  bottom: 0rem;
  right: 0;
  li {
    margin-right: 0.18rem;
    img {
      width: 0.21rem;
      height: 0.24rem;
      display: inline-block;
      margin-right: 0.14rem;
    }
  }
}
</style>
