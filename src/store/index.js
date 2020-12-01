import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth"
import home from "./modules/home"
import users from "./modules/users"
import tenants from "./modules/tenants"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        home,
        users,
        tenants
    }
})