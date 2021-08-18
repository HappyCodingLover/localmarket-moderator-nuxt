import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import NotFound from './pages/404.vue'
import LoginPage from './pages/login.vue'
import ApprovalRequestPage from './pages/requests.vue'

import CompanyDetailPage from './pages/requests/company.vue'
import CompanyAddressDetailPage from './pages/requests/companyAddress.vue'
import CompanyDeliveryCostInfoPage from './pages/requests/delivery_cost_info.vue'
import CompanyDeliveryTimeInfoPage from './pages/requests/delivery_time_info.vue'
import CompanyPromoInfoPage from './pages/requests/promo_info.vue'
import CompanyDeliveryZonePage from './pages/requests/delivery_zone.vue'
import CompanyProductPage from './pages/requests/product.vue'
import CompanyPromoPage from './pages/requests/promo.vue'
import CompanySubCategoryPage from './pages/requests/subcategory.vue'


import PartnersPage from './pages/partners.vue'
import PartnerDetailPage from './pages/partnerDetail.vue'
import PartnerAddPage from './pages/newPartner.vue'
import OrdersPage from './pages/orders.vue'
import OrderDetailPage from './pages/orderDetail.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'login',
        component: LoginPage
    },
    {
      path: '/requests',
      name: 'requests',
      component: ApprovalRequestPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/company/:id',
      name: 'requests_company',
      component: CompanyDetailPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/company_address/:id',
      name: 'requests_company_address',
      component: CompanyAddressDetailPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/delivery_cost_info/:id',
      name: 'requests_delivery_cost_info',
      component: CompanyDeliveryCostInfoPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/delivery_time_info/:id',
      name: 'requests_delivery_cost_info',
      component: CompanyDeliveryTimeInfoPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/promo_info/:id',
      name: 'requests_promo_info',
      component: CompanyPromoInfoPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/delivery_zone/:id',
      name: 'requests_delivery_zone',
      component: CompanyDeliveryZonePage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/product/:id',
      name: 'requests_product',
      component: CompanyProductPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/promo/:id',
      name: 'requests_promo',
      component: CompanyPromoPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/requests/subcategory/:id',
      name: 'requests_subcategory',
      component: CompanySubCategoryPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/partners',
      name: 'partners',
      component: PartnersPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/partners/new',
      component: PartnerAddPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/partners/:id',
      component: PartnerDetailPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersPage,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/orders/:id',
      component: OrderDetailPage,
      meta: { 
        requiresAuth: true
      }
    },
    { 
      path: "*", 
      component: NotFound 
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router