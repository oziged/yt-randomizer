import axios from 'axios'


export const state = () => ({
  fetched_data: {},
  loaded_count: 0,
  is_loading: false,
  fetch_started_at: null
})


export const getters = {
}


export const actions = {
    async fetchComments({ state, commit }, payload) { // to get all comments
      let time = new Date()
      commit('SET_DEFAULT_STATE', time)

      let res = {}
      let commentsCount = 0
      let repliesCount = 0

      await getPageComments()

      async function getPageComments(nextPageToken) {
        let url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.YT_API_KEY}&textFormat=plainText&part=snippet,replies&videoId=${payload.id}&maxResults=100`
        url = nextPageToken ? url + `&pageToken=${nextPageToken}` : url

        await axios.get(url).then(async response => {
          commit('SET_STATE_DATA', {is_loading: true})

          for (let i = 0; i < response.data.items.length; i++) {
            if (time != state.fetch_started_at) return
            commentsCount++
            let item = response.data.items[i]
            let comment = item.snippet.topLevelComment.snippet
            let id = comment.authorChannelId.value
            if (!res[id]) res[id] = {}
            if (res[id].comments) res[id].comments.push(comment)
            else res[id].comments = [comment]

            if (item.replies) {
              let url = `https://www.googleapis.com/youtube/v3/comments?part=snippet,id&parentId=${item.id}&key=${process.env.YT_API_KEY}&maxResults=100&pageToken=`
              await axios.get(url).then(response => {
                response.data.items.forEach(item => {
                  repliesCount++
                  let reply = item.snippet
                  let id = reply.authorChannelId.value
                  if (!res[id]) res[id] = {}
                  if (res[id].replies) res[id].replies.push(reply)
                  else res[id].replies = [reply]
                })
              })
            }
          }
          commit('SET_STATE_DATA', {loaded_count: Object.keys(res).length})
          if (response.data.nextPageToken) await getPageComments(response.data.nextPageToken)
        })
      }

      commit('SET_STATE_DATA', {is_loading: false})
      if (time == state.fetch_started_at) commit('SET_FETCHED_DATA', res)
    },
}


export const mutations = {
  SET_FETCHED_DATA(state, data) {
    state.fetched_data = data
  },

  SET_STATE_DATA(state, payload) {
    Object.entries(payload).forEach(item => {
      state[item[0]] = item[1]
    })
  },

  SET_DEFAULT_STATE(state, time) {
    Object.assign(state, {
      fetched_data: {},
      loaded_count: 0,
      is_loading: false,
      fetch_started_at: time
    })
  }
}
