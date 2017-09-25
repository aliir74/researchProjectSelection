import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookie from 'js-cookie'
var VueCookie = require('vue-cookie')
Vue.use(VueCookie)

const store = () => {
  return new Vuex.Store({

    state: {
      username: null,
      password: null,
      name: null,
      grade: null
    },

    mutations: {
      SET_USER: function (state, {username, password}) {
        state.username = username
        state.password = password
      },
      SET_INFO: function (state, {name, grade}) {
        state.name = name
        state.grade = grade
      }
    },
    plugins: [
      createPersistedState({
        paths: ['user'],
        storage: {
          /*
          getItem: (key) => Cookie.getJSON(key),
          setItem: (key, value) => Cookie.set(key, value, { expires: 3, secure: true }),
          removeItem: (key) => Cookie.remove(key)
          */
          getItem: (key) => Vue.cookie.get(key),
          setItem: (key, value) => Vue.cookie.set(key, value, { expires: 3 }),
          removeItem: (key) => Vue.cookie.delete(key)
        }
      })
    ]
  })
}

export default store
