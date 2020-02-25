export const state = () => ({
  start_block: true,
  comments_block: false
})

export const getters = {
  visibilityData(state) {
    return state
  }
}

export const mutations = {
  CHANGE_VISIBILITY(state, payload) {
    console.log('here',payload)
    console.log(payload.type + '_block')
    state[payload.type + '_block'] = payload.bool
  }
}