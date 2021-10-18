import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login'),
        },
        {
            path: '/homepage',
            name: 'homepage',
            component: () => import('../views/Layout'),
            redirect: '/homepage/hot',
            children: [
                {
                    path: 'hot',
                    component: () => import('../views/hot')
                },
                {
                    path: 'detail',
                    name: 'detail',
                    component: () => import('../views/detail')
                },
				{
				    path: 'search',
				    name: 'search',
				    component: () => import('../views/search')
				},
				{
				    path: 'cart',
				    name: 'cart',
				    component: () => import('../views/cart')
				}
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/register')
        },
    ]
})