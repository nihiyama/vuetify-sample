import Vue from "vue"
import Router from "vue-router"
import Home from "@views/Home.vue"
import Login from "@views/auth/Login.vue"
import Users from "@views/accounts/Users.vue"
import User from "@views/accounts/User.vue"
import NewUser from "@views/accounts/NewUser.vue"
import Roles from "@views/accounts/Roles.vue"
import Role from "@views/accounts/Role.vue"
import NewRole from "@views/accounts/NewRole.vue"
import Tenants from "@views/accounts/Tenants.vue"
import Tenant from "@views/accounts/Tenant.vue"
import NewTenant from "@views/accounts/NewTenant.vue"

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/auth/login",
            component: Login
        },
        {
            path: "/accounts/users",
            component: Users,
            children: [
                { path: ":id", User },
                { path: "new", NewUser }
            ]
        },
        {
            path: "accounts/roles",
            component: Roles,
            children: [
                { path: ":id", Role },
                { path: "new", NewRole }
            ]
        },
        {
            path: "accounts/tenants",
            component: Tenants,
            children: [
                { path: ":id", Tenant },
                { path: "new", NewTenant }
            ]
        },
    ]
})