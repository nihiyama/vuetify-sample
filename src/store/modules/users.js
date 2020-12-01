import axios from "axios"


const state = {
  me: {
    name: "",
    isSuperuser: false,
    id: 0,
    tenants: [],
  },
  user: {
    name: "",
    isSuperuser: false,
    id: 0,
    tenants: [],
  },
  users: [],
}

const getters = {
  me: state => state.me,
  user: state => state.user,
  users: state => state.users
}

const mutations = {
  updateMe(state, me) {
    state.me = me
  },
  updateUser(state, user) {
    state.user = user
  },
  updateUsers(state, users) {
    state.users = users
  },
}

const actions = {
  async getMe({ commit }) {
    await axios
      .get('/users/me')
      .then(response => {
        const user = Object.assign(
          response.data,
          { tenants: response.data.tenants.map(tenant => tenant.name) }
        )
        commit('updateMe', user)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async getUsers({ commit }) {
    await axios
      .get('/users/')
      .then(response => {
        const users = response.data.map(user =>
          Object.assign(
            user,
            { tenants: user.tenants.map(tenant => tenant.name) }
          )
        )
        commit('updateUsers', users)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async getUser({ commit }, id) {
    await axios
      .get(`/users/${id}`)
      .then(response => {
        const user = Object.assign(
          response.data,
          { tenants: response.data.tenants.map(tenant => tenant.name) }
        )
        commit('updateUser', user)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async deleteUser({ dispatch }, id) {
    await axios
      .delete(`/users/${id}`)
      .then(response => {
        if (response.status == 200) {
          console.log("success")
        }
        dispatch("getUsers")
      })
      .catch(error => {
        console.log(error)
      })
  },
  async createUser({ dispatch }, user) {
    await axios
      .post("/users/", user)
      .then(response => {
        if (response.status == 200) {
          console.log("success")
        }
        dispatch("getUsers")
      }
      )
      .catch(error => {
        console.log(error)
      })
  },
  async updateMe({ dispatch }, user) {
    await axios
      .put("/users/me", "\"" + user.password + "\"", {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.status == 200) {
          console.log("success")
        }
        dispatch("getUsers")
      }
      )
      .catch(error => {
        console.log(error)
      })
  },
  async updateUser({ dispatch }, user) {
    await axios
      .put(`/users/${user.id}`, user)
      .then(response => {
        if (response.status == 200) {
          console.log("success")
        }
        dispatch("getUsers")
      }
      )
      .catch(error => {
        console.log(error)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}