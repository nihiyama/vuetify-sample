import router from "@/router"

const state = {
    userInfo: {
        id: null,
        user: "",
        username: "",
        admin: false,
        updatedAt: ""
    },
    usersInfo: []
}

const getters = {
    userInfo: state => state.userInfo,
    usersInfo: state => state.userInfo
}

const mutations = {
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    updateUsersInfo(state, usersInfo) {
        state.usersInfo = usersInfo
    }
}

const actions = {
    getUser({ commit }, userInfo) {

    },
    createUser({ commit }, userInfo) {

    },
    updateUser({ commit }, userInfo) {

    },
    deleteUser({ commit }, userInfo) {

    }
}

export default {
    state,
    getters,
    mutations,
    actions
}