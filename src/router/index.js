import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layout/home'
import IndexNav from '@/pages/indexnav'
import Index from '@/pages/index'
import Mine from '@/pages/mine'
import ScenicDetail from '@/pages/scenicDetail'
import TicketDetail from '@/pages/ticketDetail'
import CreateOrder from '@/pages/createOrder'
import SuccessCreate from '@/pages/successCreate'
import OrderDetail from '@/pages/orderDetail'
import OrderPay from '@/pages/orderPay'
import OrderCancel from '@/pages/orderCancel'
import ErrorPage from '@/pages/error'
import SelectCity from '@/pages/selectCity'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Home,
    children: [{
        path: '/',
        component: IndexNav,
        children: [{
            path: '/',
            component: Index,
            name: '首页'
          },
          {
            path: '/mine',
            component: Mine,
            name: '我的'
          }
        ]
      },
      {
        path: '/scenicDetail',
        component: ScenicDetail,
        name: '景点详情'
      }, {
        path: '/ticketDetail',
        component: TicketDetail,
        name: '门票详情'
      },
      {
        path: '/createOrder',
        component: CreateOrder,
        name: '创建订单'
      },
      {

        path: '/successCreate',
        component: SuccessCreate,
        name: '创建订单成功'
      },
      {
        path: '/orderDetail',
        component: OrderDetail,
        name: '订单详情'
      },
      {
        path: '/orderPay',
        component: OrderPay,
        name: '订单支付'
      },
      {
        path: '/orderCancel',
        component: OrderCancel,
        name: '订单取消'
      },
      {
        path: '/selectCity',
        component: SelectCity,
        name: '城市'
      }, {
        path: '*',
        component: ErrorPage,
        name: '404'
      },
    ]
  }]
})
