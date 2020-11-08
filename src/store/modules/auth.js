import router from "@/router"

const state = {
    jwtToken: false
}

const getters = {
    jwtToken: state => state.jwtToken
}

const mutations = {
    updateJwtToken(state, jwtToken) {
        state.jwtToken = jwtToken
    }
}

const actions = {
    login({ commit }, authData) {
        if (authData.username == "hogehoge" && authData.password == "hogehoge") {
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