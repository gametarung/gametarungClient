import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomId: null,
    userId: null,
    isTurn: null
  },
  mutations: {
    setUserId (state, payload) {
      state.userId = payload
    },
    setRoomId (state, payload) {
      state.roomId = payload
    },
    setTurn (state, payload) {
      state.isTurn = payload
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('setUserId', payload)
    },
    setRoom ({ commit }, payload) {
      commit('setRoomId', payload)
    },
    setTurn ({ commit }, payload) {
      commit('setTurn', payload)
    }
  }
})
