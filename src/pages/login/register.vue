<template>
  <div class="login">
    <h1 style="text-align: center;margin: 40px 0px 60px 0px;">注册账号</h1>
    <van-field v-model="formData.username" label="用户名" placeholder="请输入用户名" />
    <van-field v-model="formData.vcode" label="验证码" placeholder="请输入短信验证码">
      <van-button v-if="!isSend" slot="button" size="small" type="primary" @click="code">发送验证码</van-button>
      <van-button v-if="isSend" slot="button" size="small" disabled>{{btnText}}</van-button>
    </van-field>
    <van-field v-model="formData.password" label="密码" placeholder="请输入密码" :type="inputType">
      <van-icon slot="icon" name="password-not-view" v-show="inputType =='password'" @click="inputType ='input'"/>
      <van-icon slot="icon" name="password-view" v-show="inputType =='input'" @click="inputType ='password'"/>
    </van-field>  
    <van-button size="large" type="primary" style="margin-top: 60px;" @click="handleLogin">注册</van-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isSend: false,
        btnText: '',
        inputType: 'password',
        formData: {
          username: '',
          password: '',
          vcode: '',
          introducer_id: '',
        },
        rules: {

        }
      }
    },
    mounted () {
      //分享功能,获取分享的出来的用户ID
      var userId = this.$route.query.userId;
      if(typeof(userId)!= "undefined"){
        this.formData.introducer_id = userId;
      }else{
        this.$toast('未获取介绍人信息');
      }
    },
    methods: {
      // 获取验证码
      code() {
        let vArr = [
          [this.formData.username, '用户名', 'empty|phone'],
        ];
        this.$validate(vArr).then(valid => {
          this.$post('/user/send_vcode',{
            type: 1,
            username: this.$aesEncrypt(this.formData.username)
          }).then( res => {
            let timeLast = 60;
            let timer = setInterval(() => {
              if (timeLast >= 0) {
                  this.isSend = true;
                  this.btnText = timeLast + 's';
                  timeLast -= 1;
              } else {
                  clearInterval(timer);
                  this.isSend = false;
              }
            }, 1000);
          })
        });
      },
      handleLogin () {
        let vArr = [
          [this.formData.username, '用户名', 'empty|phone'],
          [this.formData.vcode, '验证码', 'empty'],
          [this.formData.password, '密码', 'empty'],
        ];
        this.$validate(vArr).then(valid => {
          this.$post('/user/h5_register',{
            introducer_id: this.formData.introducer_id,
            username: this.$aesEncrypt(this.formData.username),
            vcode: this.formData.vcode,
            password: this.$aesEncrypt(this.formData.password),
          }).then( res => {
            this.$router.push({
              name:'forget',
              query: {
                url: this.$route.query.url
              }
            });
          })
        });
      }
    },
  };
</script>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 20px;
  }
</style>
