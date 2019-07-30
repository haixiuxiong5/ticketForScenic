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
          },
          {
            path: '/mine',
            component: Mine,
          }
        ]
      },
      {
        path: '/scenicDetail',
        component: ScenicDetail
      }, {
        path: '/ticketDetail',
        component: TicketDetail
      },
      {
        path: '/createOrder',
        component: CreateOrder
      },
      {

        path: '/successCreate',
        component: SuccessCreate
      },
      {
        path: '/orderDetail',
        component: OrderDetail
      }
    ]
  }]
})
