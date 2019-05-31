<template>
  <div class="page">
    <van-nav-bar :title="title" left-arrow :border="false" @click-left="handleBack"></van-nav-bar>
    <div style="margin-top: 10px;">
      <van-address-edit
        :address-info="addressInfo"
        :area-list="areaList"
        show-set-default
        @save="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import areaList from "../../components/address/area.js";
export default {
  data() {
    return {
      id: 0,
      areaList,
      title: "新增地址",
      addressInfo: {
        name: "",
        tel: "",
        province: "",
        city: "",
        county: "",
        areaCode: "",
        addressDetail: "",
        isDefault: false
      }
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.title = "编辑地址";
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      this.$http.post("address/detail", { id: this.id }).then(res => {
        var detail = res.data;
        this.addressInfo.name = detail.realname;
        this.addressInfo.tel = detail.phone;
        this.addressInfo.areaCode = detail.areacode;
        this.addressInfo.addressDetail = detail.address;
        this.addressInfo.isDefault = detail.is_default == "1" ? true : false;
      });
    },
    handleSubmit(val) {
      var params = {
        realname: val.name,
        phone: val.tel,
        area: val.province + val.city + val.county,
        areacode: val.areaCode,
        address: val.addressDetail,
        is_default: val.isDefault ? "1" : "2"
      };
      if (this.id) {
        this.$http
          .post("address/edit", { ...params, id: this.id })
          .then(res => {
            this.$toast("编辑成功");
            this.handleBack();
          });
      } else {
        this.$http.post("address/add", params).then(res => {
          this.$toast("新增成功");
          this.handleBack();
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  position: relative;
  background: none;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar .van-icon {
  color: #fff;
}
</style>
