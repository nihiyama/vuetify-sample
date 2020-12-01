import axios from "axios"

import router from "@/router"

const state = {
  jwtToken: ""
}

const getters = {
  jwtToken: state => state.jwtToken,
}

const mutations = {
  updateJwtToken(state, jwtToken) {
    state.jwtToken = jwtToken
  }
}

const actions = {
  async autoLogin({ commit, dispatch }) {
    const jwtToken = localStorage.getItem('jwtToken')
    if (!jwtToken) return;
    const now = new Date()
    const expiryTimeMs = localStorage.getItem('expiryTimeMs')
    const isExpired = now.getTime() >= expiryTimeMs
    if (isExpired) {
      commit("updateJwtToken", "")
      await router.push({
        name: "login"
      })
    } else {
      commit('updateJwtToken', jwtToken)
      const expiresInMs = expiryTimeMs - now.getTime()
      setTimeout(() => {
        commit("updateJwtToken", "")
        router.push({
          name: "login"
        })
      }, expiresInMs)
      await dispatch("getMe")
    }
  },
  login({ commit, dispatch }, authData) {
    const params = new URLSearchParams();
    params.append('username', authData.username);
    params.append('password', authData.password);
    axios
      .post(
        'auth/login/access-token',
        params
      )
      .then(response => {
        const now = new Date()
        const expiryTimeMs = now.getTime() + response.data.expiresIn * 1000
        commit('updateJwtToken', response.data.accessToken)
        dispatch("getMe")
        localStorage.setItem('jwtToken', response.data.accessToken)
        localStorage.setItem('expiryTimeMs', expiryTimeMs)
        setTimeout(() => {
          commit("updateJwtToken", "")
          router.push({
            name: "login"
          })
        }, response.data.expiresIn * 1000)
        dispatch("getMe").then(() => {
          router.push({
            name: "home"
          })
        })
      })
  },
  logout({ commit }) {
    commit("updateJwtToken", "")
    localStorage.setItem('jwtToken', "")
    localStorage.setItem('expiryTimeMs', "")
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