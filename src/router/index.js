/* Layout */
import Layout from '@/layout';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    roles: [],
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    roles: [],
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    roles: ['root', 'administrator', 'client'],
    meta: {
      title: 'Dashboard',
      icon: 'dashboard'
    },
    children: [{
      path: '',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      hidden: true
    }]
  },
  {
    path: '/company',
    component: Layout,
    roles: ['root'],
    meta: {
      title: 'Empresa',
      icon: 'company'
    },
    children: [{
        path: '',
        name: 'company',
        component: () => import('@/views/company/list'),
        hidden: true
      },
      {
        path: 'create',
        name: 'company.create',
        component: () => import('@/views/company/form'),
        hidden: true,
        meta: {
          title: 'Cadastrar'
        }
      },
      {
        path: 'edit/:id',
        name: 'company.edit',
        component: () => import('@/views/company/form'),
        hidden: true,
        meta: {
          title: 'Editar'
        }
      }
    ]
  },
  {
    path: '/client',
    component: Layout,
    roles: ['root', 'administrator', 'client'],
    meta: {
      title: 'Cliente',
      icon: 'users'
    },
    children: [{
        path: '',
        name: 'client',
        component: () => import('@/views/client/list'),
        hidden: true
      },
      {
        path: 'create',
        name: 'client.create',
        component: () => import('@/views/client/form'),
        hidden: true,
        meta: {
          title: 'Cadastrar'
        }
      },
      {
        path: 'edit/:id',
        name: 'client.edit',
        component: () => import('@/views/client/form'),
        hidden: true,
        meta: {
          title: 'Editar'
        }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    roles: ['root', 'administrator', 'client'],
    meta: {
      title: 'Produto',
      icon: 'product'
    },
    children: [{
        path: '',
        name: 'product',
        component: () => import('@/views/product/list'),
        hidden: true
      },
      {
        path: 'create',
        name: 'product.create',
        component: () => import('@/views/product/form'),
        hidden: true,
        meta: {
          title: 'Cadastrar'
        }
      },
      {
        path: 'edit/:id',
        name: 'product.edit',
        component: () => import('@/views/product/form'),
        hidden: true,
        meta: {
          title: 'Editar'
        }
      }
    ]
  }, {
    path: '/user',
    component: Layout,
    roles: ['root', 'administrator'],
    meta: {
      title: 'Usuário',
      icon: 'user'
    },
    children: [{
        path: '',
        name: 'user',
        component: () => import('@/views/user/list'),
        hidden: true
      },
      {
        path: 'create',
        name: 'user.create',
        component: () => import('@/views/user/form'),
        hidden: true,
        meta: {
          title: 'Cadastrar'
        }
      },
      {
        path: 'edit/:id',
        name: 'user.edit',
        component: () => import('@/views/user/form'),
        hidden: true,
        meta: {
          title: 'Editar'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
