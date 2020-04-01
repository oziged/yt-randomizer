import axios from 'axios'


export const state = () => ({
  fetched_data: {},
  exists: false
})


export const getters = {
  videoData(state) {
    return {
      ...state.fetched_data,
    }
  }
}


export const actions = {
  async fetchVideo({ commit, state }, payload) {

    let video = {
      id: payload.id
    }

    let {data: res} = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${video.id}&key=${process.env.YT_API_KEY}`)

    if (!res.pageInfo.totalResults) {
      commit('SET_DEFAULT_STATE')
      return
    }

    video = {...video, ...res.items[0].snippet, ...res.items[0].statistics}

    commit('SET_FETCHED_DATA', video)
  }
}


export const mutations = {
  SET_FETCHED_DATA(state, payload) {
    state.fetched_data = payload
    state.previous_id = payload.id
    state.exists = true
  },

  SET_DEFAULT_STATE(state) {
    Object.assign(state, {
      previous_id: '',
      fetched_data: {},
      exists: false
    });
  }
}
