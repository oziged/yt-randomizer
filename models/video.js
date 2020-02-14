import Comment from '../models/comment'

import axios from 'axios'

export default class Video {
  constructor(link) {
    this.id = this.parseVideoId(link)
    this.comments = {}
    this.replies = {}
  }

  // METHODS

  async init() {
    let res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.id}&key=${process.env.YT_API_KEY}`)
    let data = res.data.items[0].snippet;
    
    Object.entries(data).forEach(array => {
      this[array[0]] = array[1]
    })
  }

  async getComments() { // to get all comments
    let comments = {};
    let replies = {}
    getPageComments = getPageComments.bind(this)
    getPageComments()
    
    async function getPageComments(nextPageToken) {
      let url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.YT_API_KEY}&textFormat=plainText&part=snippet,replies&videoId=${this.id}&maxResults=100`
      url = nextPageToken ? url + `&pageToken=${nextPageToken}` : url

      await axios.get(url).then(response => {
        response.data.items.forEach(item => {
          let comment = item.snippet.topLevelComment.snippet
          comments[comment.authorChannelId.value] = comment
          
          if (item.replies) item.replies.comments.forEach(item => {
            let comment = item.snippet
            replies[comment.authorChannelId.value] = comment
          })
        })

        if (response.data.nextPageToken) getPageComments(response.data.nextPageToken)
        else {
          this.comments = comments
          this.replies = replies
        }
      })
    } 
  }

  parseVideoId(link) {
    return link.split('?v=')[1].split('&')[0]
  }
}
  // https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyAdDpRSjpgTkCVBrL2Sigqj-nWFeo5XSmk&textFormat=plainText&part=snippet,replies&videoId=${link.split('?v=')[1].split('&')[0]}&maxResults=100
  // return `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyAdDpRSjpgTkCVBrL2Sigqj-nWFeo5XSmk&textFormat=plainText&part=snippet,replies&videoId=${link.split('?v=')[1].split('&')[0]}&maxResults=100`
