import Vue from "vue"
import Router from "vue-router"
import Home from "@/views/Home.vue"
import Login from "@/views/auth/Login.vue"
import Users from "@/views/accounts/Users.vue"
import UserId from "@/views/accounts/UserId.vue"
import NewUser from "@/views/accounts/NewUser.vue"
import Tenants from "@/views/accounts/Tenants.vue"
import TenantId from "@/views/accounts/TenantId.vue"
import NewTenant from "@/views/accounts/NewTenant.vue"
import store from "@/store"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Home,
            name: "home",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next();
                } else {
                    next('/auth/login')
                }
            }
        },
        {
            path: "/auth/login",
            component: Login,
            name: "login",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next('/');
                } else {
                    next()
                }
            }
        },
        {
            path: "/admin/users/",
            component: Users,
            name: "users",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next();
                } else {
                    next('/auth/login')
                }
            }
        },
        {
            path: "/admin/users/new",
            component: NewUser,
            name: "new-user",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next();
                } else {
                    next('/auth/login')
                }
            }
        },
        {
            path: "/admin/tenants",
            component: Tenants,
            name: "tenants",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next();
                } else {
                    next('/auth/login')
                }
            }
        },
        {
            path: "/admin/tenants/new",
            component: NewTenant,
            name: "new-tenant",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next();
                } else {
                    next('/auth/login')
                }
            },
        },
        {
            path: "/accounts/users/:id",
            component: UserId,
            name: "user-id",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next();
                } else {
                    next('/auth/login')
                }
            }
        },
        {
            path: "/accounts/tenants/:id",
            component: TenantId,
            name: "tenant-id",
            beforeEnter(to, from, next) {
                if (store.getters.jwtToken) {
                    next();
                } else {
                    next('/auth/login')
                }
            }
        },
    ]
})