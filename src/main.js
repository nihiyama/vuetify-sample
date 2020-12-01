import Vue from 'vue'
import axios from "axios"
import _ from "lodash"
import vuetify from './plugins/vuetify';

import App from './App.vue'
import router from "@/router"
import store from "@/store"
import { mapKeysCamelCase, mapKeysSnakeCase } from "@/utils"

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:8000/api/v1"

axios.interceptors.request.use(
  config => {
    const token = store.getters.jwtToken
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    if (config.url == "auth/login/access-token") {
      return config
    }
    if (!_.isEmpty(config.params)) {
      const convertedData = mapKeysSnakeCase(config)
      const convertedParams = mapKeysSnakeCase(config.params)
      return { ...config, data: convertedData, params: convertedParams }
    } else {
      const { data } = config
      const convertedData = mapKeysSnakeCase(data)
      return { ...config, data: convertedData }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (!response.headers['content-type'] ||
      response.headers['content-type'].indexOf('application/json') === -1) {
      return response
    } else {
      const { data } = response
      const convertedData = mapKeysCamelCase(data)
      return { ...response, data: convertedData }
    }
  },
  error => {
    if (error.response.status == 403) {
      store.commit("updateJwtToken", "")
      router.push({
        name: "login"
      })
    }
    console.log("responce error", error)
    return Promise.reject(error)
  }
)

store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
