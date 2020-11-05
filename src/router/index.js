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

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Home,
            name: "home"
        },
        {
            path: "/auth/login",
            component: Login,
            name: "login"
        },
        {
            path: "/admin/users/",
            component: Users,
            name: "users",
        },
        {
            path: "/admin/users/new",
            component: NewUser,
            name: "new-user",
        },
        {
            path: "/admin/tenants",
            component: Tenants,
            name: "tenants"
        },
        {
            path: "/admin/tenants/new",
            component: NewTenant,
            name: "new-tenants",
        },
        {
            path: "/accounts/users/:id",
            component: UserId,
            name: "user-id",
        },
        {
            path: "/accounts/tenants/:1",
            component: TenantId,
            name: "tenant-id"
        },
    ]
})