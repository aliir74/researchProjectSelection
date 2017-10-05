import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookie from 'js-cookie'

const store = () => {
  return new Vuex.Store({

    state: {
      username: null,
      password: null,
      name: null,
      grade: 7,
      enrolled: false
    },
    plugins: [createPersistedState()],
    mutations: {
      SET_USER: function (state, {username, password}) {
        state.username = username
        state.password = password
      },
      SET_INFO: function (state, {name, grade, enrolled}) {
        state.name = name
        state.grade = grade
        state.enrolled = enrolled
      },
      SET_ENROLLED: function (state, {enrolled}) {
        state.enrolled = enrolled
      }
    }
  })
}

export default store
