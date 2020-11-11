import router from "@/router"

const state = {
    loginUser: {
        id: null,
        user: "",
        username: "",
        admin: false,
        tenants: [],
        updatedAt: ""
    },
    jwtToken: false
}

const getters = {
    loginUser: state => state.loginUser,
    jwtToken: state => state.jwtToken,
}

const mutations = {
    updateLoginUser(state, loginUser) {
        state.loginUser = loginUser
    },
    updateJwtToken(state, jwtToken) {
        state.jwtToken = jwtToken
    }
}

const actions = {
    login({ commit }, authData) {
        if (authData.username == "hogehoge" && authData.password == "hogehoge") {
            commit('updateLoginUser', {
                id: 1,
                user: "hogehoge",
                username: "hogehoge",
                admin: true,
                tenants: ["hoge", "fuga", "foo", "bar"],
                updatedAt: "2020/10/29"
            })
            commit('updateJwtToken', true)
            router.push({
                name: "home"
            })
        }
        if (authData.username == "fugafuga" && authData.password == "fugafuga") {
            commit('updateLoginUser', {
                id: 2,
                user: "fugafuga",
                username: "fugafuga",
                admin: false,
                tenants: ["fuga"],
                updatedAt: "2020/10/29"
            })
            commit('updateJwtToken', true)
            router.push({
                name: "home"
            })
        }
    },
    logout({ commit }) {
        commit("updateJwtToken", false)
        router.push({
            name: "login"
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}