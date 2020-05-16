import Vue from 'vue'
import Vuex from 'vuex'
import TripServices from '@/services/TripServices'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    result: null,
    location: null,
    timeTable: null,
    isLoading: false
  },
  mutations: {
    SET_TRAVEL_DATA(state, travelData) {
      state.result = travelData
    },

    SET_LOCATION(state, locationData) {
      state.location = locationData
    },

    SET_TIME_TABLE(state, timeTableData) {
      state.timeTable = timeTableData
    },

    SET_LOADING(state) {
      state.isLoading = !state.isLoading
    }
  },
  actions: {
    searchTravel({
      commit
    }, query) {
      return TripServices.getSearchResult(query)
        .then(({
          data
        }) => {
          commit('SET_TRAVEL_DATA', data)
        })
    },

    getLocation({
      commit
    }, {
      lat,
      long
    }) {
      return TripServices.getLocation({
          lat,
          long
        })
        .then(({
          data
        }) => {
          commit('SET_LOCATION', data)
        })
    },

    getTimeTable({
      commit
    }, stationDetail) {
      commit('SET_LOADING')
      return TripServices.getTimeTable({
        id: stationDetail.id
      }).then(({
        data
      }) => {
        commit('SET_TIME_TABLE', data)
        commit('SET_LOADING')
      })
    }
  },
  modules: {}
})