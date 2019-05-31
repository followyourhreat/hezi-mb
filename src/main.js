// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//移动端获取用户uid,token
(function() {
  var query = window.location.href.split('?');
  if (query.length == 2) {
    var vars = query[1].split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == 'uid') {
        // window.localStorage.setItem('uid', pair[1])
        window.localStorage.setItem('uid', "38")
      }
      if (pair[0] == 'token') {
        // window.localStorage.setItem('token', pair[1])
        window.localStorage.setItem('token', "2f2f205c69418fc1d02cd7d7358bcba5")
      }
    }
  }
})()


var html = document.querySelector('html');
console.log(html.offsetWidth)
if (html.offsetWidth > 750) {
  var rem = 750 / 7.5;
  document.getElementsByTagName('body')[0].style.width = 750 + "px"
} else {
  var rem = html.offsetWidth / 7.5;
}
console.log(rem)
html.style.fontSize = rem + "px";

// import './common/rem'							//移动端rem适配的配置postcss-pxtorem,lib-flexible
// import './browser'							//处理浏览器兼容性
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css';
import App from './App'
import router from './router/index.js'
import store from './store'
import './api' //第三方网络请求
import './ajaxAPI' //自定义网络请求
import './components' //自定义组件
import './directive' //自定义指令
import './extend' //扩展方法
import './filter' //自定义过滤器
import './mixin' //mixin
import './plugin' //第三方插件
import './style/index.less' //样式
import './util' //公共方法

Vue.use(Vant)
  // import {
  // 	Button,
  // 	Cell,
  // 	CellGroup,
  // 	Icon,
  // 	Row,
  // 	Col,
  // 	Popup,
  // 	Checkbox,
  // 	CheckboxGroup,
  // 	DatetimePicker,
  // 	Field,
  // 	NumberKeyboard,
  // 	PasswordInput,
  // 	Picker,
  // 	Radio,
  // 	RadioGroup,
  // 	Rate,
  // 	Search,
  // 	Slider,
  // 	Stepper,
  // 	Switch,
  // 	SwitchCell,
  // 	Uploader,
  // 	Toast,
  // 	Swipe,
  // 	SwipeItem} from 'vant'
  // Vue.use(Button)
  // Vue.use(Cell)
  // Vue.use(CellGroup)
  // Vue.use(Icon)
  // Vue.use(Row)
  // Vue.use(Col)
  // Vue.use(Popup)
  // Vue.use(Checkbox)
  // Vue.use(CheckboxGroup)
  // Vue.use(DatetimePicker)
  // Vue.use(Field)
  // Vue.use(NumberKeyboard)
  // Vue.use(PasswordInput)
  // Vue.use(Picker)
  // Vue.use(Radio)
  // Vue.use(RadioGroup)
  // Vue.use(Rate)
  // Vue.use(Search)
  // Vue.use(Slider)
  // Vue.use(Stepper)
  // Vue.use(Switch)
  // Vue.use(SwitchCell)
  // Vue.use(Uploader)
  // Vue.use(Toast)
  // Vue.use(Swipe)
  // Vue.use(SwipeItem)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
