import axios from "axios"

const state = {
  tenant: {
    id: null,
    name: "",
  },
  tenants: []
}

const getters = {
  tenant: state => state.tenant,
  tenants: state => state.tenants
}

const mutations = {
  updateTenant(state, tenant) {
    state.tenant = tenant
  },
  updateTenants(state, tenants) {
    state.tenants = tenants
  }
}

const actions = {
  async getTenant({ commit }, id) {
    await axios
      .get(`/tenants/${id}`)
      .then(response => {
        commit("updateTenant", response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async getTenants({ commit }) {
    await axios
      .get('/tenants/')
      .then(response => {
        commit("updateTenants", response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  async deleteTenant({ dispatch }, id) {
    await axios
      .delete(`/tenants/${id}`)
      .then(response => {
        if (response.status == 200) {
          console.log("success")
        }
        dispatch("getTenants")
      })
      .catch(error => {
        console.log(error)
      })
  },
  async createTenant({ dispatch }, tenant) {
    await axios
      .post("/tenants/", tenant)
      .then(response => {
        if (response.status == 200) {
          console.log("success")
        }
        dispatch("getTenants")
      }
      )
      .catch(error => {
        console.log(error)
      })
  },
  async updateTenant({ dispatch }, tenant) {
    await axios
      .put(`/tenants/${tenant.id}`, tenant)
      .then(response => {
        if (response.status == 200) {
          console.log("success")
        }
        dispatch("getTenants")
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