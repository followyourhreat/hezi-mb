<template>
  <div class="page">
    <van-nav-bar title="地址管理" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div class="page-scroll">
      <van-swipe-cell :right-width="50" v-for="(item, index) in addressList" :key="index">
        <van-cell-group>
          <div class="van-cell-cart" @click="handleSelect(item)">
            <!-- <dt-address
              :realname="item.realname"
              :phone="item.phone"
              :area="item.area"
              :address="item.address"
            ></dt-address>-->
            <div class="address">
              <!-- <div class="address-location">
      <van-icon name="location" color="#f2c700"/>
              </div>-->
              <div class="cell">
                <div class="cell-title">
                  <span>{{item.realname}}</span>
                  <span class="cell-phone">{{item.phone}}</span>
                </div>
                <div class="cell-value">
                  <span>收货地址：{{item.area}}{{item.address}}</span>
                </div>
                <div class="cell-footer">
                  <ul class="cell-icon" @click.stop="handleRest(item)">
                    <li v-show="item.is_default == 2">
                      <img src="../../assets/circle.png" alt>
                      <span>默认地址</span>
                    </li>
                    <li v-show="item.is_default == 1">
                      <img src="../../assets/round.png" alt>
                      <span>默认地址</span>
                    </li>
                  </ul>
                  <ul class="cell-operate">
                    <li @click="handleEdit(item)">
                      <img src="../../assets/editaddress.png" alt>
                      <span>编辑</span>
                    </li>
                    <li @click="handleDelete(item)">
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
          </div>
        </van-cell-group>
        <span slot="right">
          <div class="van-cell-del" @click="handleDelete(item.id)">
            <van-icon name="delete"/>
          </div>
        </span>
      </van-swipe-cell>
    </div>
    <div class="page-buttom">
      <van-button type="primary" size="large" @click="handleRouter('addressEdit')">新增地址</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addressList: [],
      chosenAddressId: "41"
    };
  },
  mounted() {
    this.getAddressList();
  },
  methods: {
    getAddressList() {
      this.$http.post("address/list", {}).then(res => {
        this.addressList = res.data;
        // let edList = res.data;
        // edList.forEach(item => {
        //   this.addressList.push({
        //     id: item.id,
        //     name: item.realname,
        //     tel: item.phone,
        //     address: item.area + item.address
        //   });
        // });
      });
    },
    handleSelect(item) {
      this.$post("goods/selectaddress", { address_id: item.id }).then(res => {
        // this.handleBack();
      });
    },
    handleEdit(item) {
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
    },
    checkChange() {
      this.$emit("checkClick", this.radio);
    },
    handleRest(item) {
      console.log("--------------11------");
      console.log(item);
      if (item.is_default == 1) {
        item.is_default = "2";
      } else {
        item.is_default = "1";
      }
      console.log(item);
      var params = {
        realname: item.realname,
        phone: item.phone,
        area: item.area,
        areacode: item.areacode,
        address: item.address,
        is_default: item.is_default
      };
      this.$http.post("address/edit", { ...params, id: item.id }).then(res => {
        this.$toast("编辑成功");
        this.getAddressList();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell-checkbox {
  float: left;
  line-height: 26vw;
  text-align: center;
  margin-top: 2vw;
  width: 10vw;
}
.van-cell-cart {
  float: right;
  width: 100vw;
}
.van-cell-del {
  margin-top: 2vw;
  width: 50px;
  height: 80px;
  background: #cc6666;
  border-radius: 1vw;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-nav-bar {
  position: relative;
  background: none;
  color: #fff;
}
.van-nav-bar__title {
  color: #fff;
}
.van-hairline--top-bottom::after {
  display: none;
}
.van-cell-del {
}

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
.cell-footer {
  position: relative;
}
.cell-operate {
  position: absolute;
  bottom: 0rem;
  right: 0;
  li {
    font-size: 0.21rem;
    line-height: 0.24rem;
    margin-right: 0.18rem;
    img {
      width: 0.21rem;
      height: 0.24rem;
      display: inline-block;
      margin-right: 0.14rem;
    }
  }
  li:nth-child(2) {
    margin-right: 0;
  }
}
.cell-icon {
  li {
    line-height: 0.24rem;
    img {
      width: 0.22rem;
      height: 0.21rem;
      vertical-align: middle;
    }
    span {
      margin-left: 0.14rem;
      display: inline-block;
    }
  }
}
.van-button {
  position: absolute;
  bottom: 0.69rem;
  width: 5.01rem;
  height: 0.98rem;
  border: none;
  outline: none;
  line-height: 0.98rem;
  box-shadow: 0 0.05rem 0.15rem 0 rgba(150, 0, 1, 0.46);
  border-radius: 0.49rem;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  background: #960001;
  font-size: 0.36rem;
}
</style>
