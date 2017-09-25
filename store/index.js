import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Polyfill for window.fetch()
require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    authUser: null
  },

  mutations: {
    SET_USER: function (state, user) {
      console.log('hello set user')
      state.authUser = user
      console.log(user)
    },
    GET_USER: function (state) {
      console.log(state.authUser)
    }
  },

  actions: {
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    },
    login ({ commit }, { username, password }) {
      var data = JSON.stringify({
        username,
        password: password
      })
      console.log(data)
      return fetch('http://localhost:8000/login', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then((res) => {
          console.log('res: ' + res.text())
          if (res.status === 401) {
            throw new Error('Bad credentials')
          } else {
            return res.text().then(function (text) {
              return text ? JSON.parse(text) : {}
            })
          }
        })
        .then((authUser) => {
          console.log('authUser: ' + authUser)
          commit('SET_USER', authUser)
          commit('GET_USER')
        })
    },
    logout ({ commit }) {
      return fetch('/api/logout', {
        // Send the client cookies to the server
        credentials: 'same-origin',
        method: 'POST'
      })
        .then(() => {
          commit('SET_USER', null)
        })
    }
  }

})

export default store
