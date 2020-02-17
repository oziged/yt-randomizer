import axios from 'axios'


export const state = () => ({
  fetched_data: {},
  is_visible: false
})


export const getters = {
  videoData(state) {
    return {
      ...state.fetched_data,
      is_visible: state.is_visible
    }
  }
}


export const actions = {
  async fetchVideo({ commit }, payload) {
    let video = {
      id: payload.id
    }

    let res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video.id}&key=${process.env.YT_API_KEY}`)
    video = {...video, ...res.data.items[0].snippet}
      
    commit('SET_FETCHED_DATA', video)
  }
}


export const mutations = {
  SET_FETCHED_DATA(state, payload) {
    state.fetched_data = payload
  },

  HIDE_VIDEO_BLOCK(state) {
    state.is_visible = false
  },

  SHOW_VIDEO_BLOCK(state) {
    state.is_visible = true
  }
}