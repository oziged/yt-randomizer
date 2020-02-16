import axios from 'axios'


export const state = () => ({
  comments: {},
  replies: {}, 
  full_data: [], // comments + replies
  is_visible: false
})


export const getters = {
}


export const actions = {
    async fetchComments({ commit }, payload) { // to get all comments
      let comments = {}
      let replies = {}
      let commentsCount = 0
      let repliesCount = 0

      await getPageComments()
      
      async function getPageComments(nextPageToken) {
        let url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.YT_API_KEY}&textFormat=plainText&part=snippet,replies&videoId=${payload.id}&maxResults=100`
        url = nextPageToken ? url + `&pageToken=${nextPageToken}` : url

        await axios.get(url).then(async response => {
          for (let i = 0; i < response.data.items.length; i++) {
            commentsCount++
            let item = response.data.items[i]
            let comment = item.snippet.topLevelComment.snippet
            let id = comment.authorChannelId.value
            if (comments[id]) comments[id].push(comment)
            else comments[id] = [comment]

            if (item.replies) {
              let url = `https://www.googleapis.com/youtube/v3/comments?part=snippet,id&parentId=${item.id}&key=${process.env.YT_API_KEY}&maxResults=100&pageToken=`
              await axios.get(url).then(response => {
                response.data.items.forEach(item => {
                  repliesCount++
                  let reply = item.snippet
                  let id = reply.authorChannelId.value
                  if (replies[id]) replies[id].push(reply)
                  else replies[id] = [reply]
                })
              })
            }
          }
          if (response.data.nextPageToken) await getPageComments(response.data.nextPageToken)
        })
      } 

      commit('SET_COMMENTS', comments)
      commit('SET_REPLIES', replies)
      // commit('SET_FULL_DATA')
    },
}


export const mutations = {
  SET_COMMENTS(state, comments) {
    state.comments = comments
  },

  SET_REPLIES(state, replies) {
    state.replies = replies
  },
 
  SET_FULL_DATA(state, payload = {}) {
    if (!payload.filters) {

      let resArray = []

      Object.values(state.comments).forEach(array => {
        array.forEach(item => resArray.push(item))
      })
      Object.values(state.replies).forEach(array => {
        array.forEach(item => resArray.push(item))
      })

      state.full_data = resArray
      console.log(state.full_data)
    }
  },
}