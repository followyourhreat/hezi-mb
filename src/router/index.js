import Vue from 'vue'
import Router from 'vue-router'
//src重定义为@
import Main from '@/pages/Main'

Vue.use(Router)

//基础路由,一般不包含父组件Main
export const baseRouter = [{
    path: '/login',
    name: 'login',
    title: '登录',
    component: resolve => require(['../pages/login/login.vue'], resolve)
  },
  {
    path: '/',
    name: 'register',
    title: '注册',
    component: resolve => require(['../pages/login/register.vue'], resolve)
  },
  {
    path: '/forget/:url?',
    name: 'forget',
    title: '忘记密码',
    component: (resolve) => require(['../pages/login/forget.vue'], resolve)
  }
];

/*
 *作为Main组件的子页面展示并且在左侧菜单显示的路由,参数说明
 *@path 路径
 *@name 路由别名
 *@icon 一级菜单图标
 *@title 名字
 *@toName 跳转指定二级菜单
 *@component 对应组件加载
 *@hasChildren 是否有二级菜单
 *@children 二级菜单
 */
export const pagesRouter = [
  // 商城板块
  {
    path: '/',
    name: 'mall',
    title: '商城首页',
    component: resolve => require(['../pages/mall/index'], resolve)
  },
  {
    path: '/best',
    name: 'best',
    title: '精品区',
    component: resolve => require(['../pages/mall/best'], resolve)
  },
  {
    path: '/nurse',
    name: 'nurse',
    title: '护理区',
    component: resolve => require(['../pages/mall/nurse'], resolve)
  },
  {
    path: '/medal',
    name: 'medal',
    title: '奖品区',
    component: resolve => require(['../pages/mall/medal'], resolve)
  },
  {
    path: '/more',
    name: 'more',
    title: '更多商品',
    component: resolve => require(['../pages/mall/more'], resolve)
  },
  {
    path: '/detail',
    name: 'detail',
    title: '商品详情',
    component: resolve => require(['../pages/mall/detail'], resolve)
  },
  {
    path: '/cart',
    name: 'cart',
    title: '购物车',
    component: resolve => require(['../pages/mall/cart'], resolve)
  },
  {
    path: '/collect',
    name: 'collect',
    title: '我的收藏',
    component: resolve => require(['../pages/mall/collect'], resolve)
  },
  {
    path: '/order',
    name: 'order',
    title: '订单',
    component: resolve => require(['../pages/mall/order'], resolve)
  },
  {
    path: '/address',
    name: 'address',
    title: '地址列表',
    component: resolve => require(['../pages/mall/address'], resolve)
  },
  {
    path: '/addressEdit',
    name: 'addressEdit',
    title: '地址列表',
    component: resolve => require(['../pages/mall/addressEdit'], resolve)
  },
  // 订单板块
  {
    path: '/orderList',
    name: 'orderList',
    title: '我的订单',
    component: resolve => require(['../pages/order/list'], resolve)
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    title: '订单详情',
    component: resolve => require(['../pages/order/orderDetail'], resolve)
  },
  {
    path: '/commentAdd',
    name: 'commentAdd',
    title: '发布评论',
    component: resolve => require(['../pages/order/commentAdd'], resolve)
  },
  // 优惠券板块
  {
    path: '/couponList',
    name: 'couponList',
    title: '我的优惠券',
    component: resolve => require(['../pages/coupon/list'], resolve)
  },
  {
    path: '/couponAdd',
    name: 'couponAdd',
    title: '领取优惠券',
    component: resolve => require(['../pages/coupon/couponAdd'], resolve)
  },
  // 任务板块
  {
    path: '/taskList',
    name: 'taskList',
    title: '活动页面',
    component: resolve => require(['../pages/task/list'], resolve)
  },
  {
    path: '/taskDetail',
    name: 'taskDetail',
    title: '任务详情',
    component: resolve => require(['../pages/task/taskDetail'], resolve)
  },
  {
    path: '/taskDetail2',
    name: 'taskDetail2',
    title: '任务详情',
    component: resolve => require(['../pages/task/taskDetail2'], resolve)
  },
  {
    path: '/taskRank',
    name: 'taskRank',
    title: '排行榜',
    component: resolve => require(['../pages/task/taskRank'], resolve)
  },
  {
    path: '/message',
    name: 'message',
    title: '信息',
    component: resolve => require(['../pages/message/list'], resolve)
  },
  {
    path: '/medal',
    name: 'medal',
    title: '勋章详情',
    component: resolve => require(['../pages/message/detail'], resolve)
  },
  {
    path: '/information',
    name: 'information',
    title: '资讯',
    component: resolve => require(['../pages/information/list'], resolve)
  },
  {
    path: '/infoDetail',
    name: 'infoDetail',
    title: '资讯详情',
    component: resolve => require(['../pages/information/detail'], resolve)
  },
];

/*
 *作为Main组件的子页面展示但是不在左侧菜单显示的路由,参数说明
 *@path 路径
 *@name 路由别名
 *@title 名字
 *@component 对应组件加载
 */
export const othersRouter = [{
    path: '/user',
    name: 'user',
    title: '用户板块',
    component: Main,
    children: [{
        path: 'index',
        name: 'user-index',
        title: '用户信息',
        component: resolve => require(['../pages/user/index'], resolve)
      },
      {
        path: 'index2',
        name: 'user-index2',
        title: '修改密码',
        component: resolve => require(['../pages/user/index2'], resolve)
      },
    ]
  },
  {
    path: '/others',
    name: 'othersRouter',
    redirect: '/home',
    title: '单菜单',
    component: Main,
    children: [{
      path: 'edit',
      name: 'home-edit',
      title: '编辑',
      component: resolve => require(['../pages/home/index'], resolve)
    }]
  },
];

//网络错误路由403,404,500等等页面
export const errRouter = [{
    path: '/*',
    name: 'error-404',
    title: '404-页面不存在',
    component: resolve => require(['../pages/errorPage/404.vue'], resolve)
  },
  {
    path: '/403',
    name: 'error-403',
    title: '403-权限不足',
    component: resolve => require(['../pages/errorPage/403.vue'], resolve)
  },
  {
    path: '/500',
    name: 'error-500',
    title: '500-服务端错误',
    component: resolve => require(['../pages/errorPage/500.vue'], resolve)
  },
];

//...将一个数组转为用逗号分隔的参数序列,组装成router
export default new Router({
  routes: [
    ...pagesRouter,
  ]
})
