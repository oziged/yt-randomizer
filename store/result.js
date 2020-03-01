export const state = () => ({
  winners_list: []
})


export const getters = {
}


export const actions = {
  async pickWinners({ commit, state }, payload) {
    let comments = payload.comments.slice()
    let winnersCount = payload.winnersCount
    let winnersList = []

    while(winnersList.length < winnersCount && comments.length) {
      let randomIndex = Math.floor(Math.random() * comments.length)
      winnersList.push(comments[randomIndex])
      comments.splice(randomIndex, 1)
    }

    commit('SET_STATE_DATA', {winners_list: winnersList})
  }
}


export const mutations = {
  SET_STATE_DATA(state, payload) {
    Object.entries(payload).forEach(item => {
      state[item[0]] = item[1]
    })
  }
}