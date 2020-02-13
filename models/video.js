import Comment from '../models/comment'

import axios from 'axios'

export default class Video {
  constructor(link) {
    this.id = this.parseVideoId(link)
  }

  // METHODS

  async getVideoData() {
    let res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.id}&key=${process.env.YT_API_KEY}`)
    let data = res.data.items[0].snippet;
    
    Object.entries(data).forEach(array => {
      this[array[0]] = array[1]
    })

    console.log(this)

    // data.forEach(item => {
    //   console.log(item)
    // })
  }

  parseVideoId(link) {
    return link.split('?v=')[1].split('&')[0]
  }


}

  // return `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyAdDpRSjpgTkCVBrL2Sigqj-nWFeo5XSmk&textFormat=plainText&part=snippet,replies&videoId=${link.split('?v=')[1].split('&')[0]}&maxResults=100`
