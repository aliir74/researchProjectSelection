import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

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
    }
  })
}

export default store
