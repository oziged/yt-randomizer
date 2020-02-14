<template>
  <div>
    <input style="height: 100px; width: 100%; font-size: 40px" type="text" v-model="defaultLink">
    <button style="font-size: 40px; cursor: pointer" @click="parseVideoId(defaultLink); getVideoData()">get comments</button>
    {{ allRepliesCount }} {{ allCommentsCount}}
  </div>
</template>

<script>
import axios from 'axios'

import Video from '../models/video'

export default {
  data() {
    return {
      a: {a: 1},
      defaultLink: 'https://www.youtube.com/watch?v=JZi1SLJMWCk',
      id: 'DIs8UBWxy4M',
      comments: {},
      replies: {},
      test: 0
    }
  },


  computed: {
    commentsLength() {
      return Object.values(this.comments).length
    },

    repliesLength() {
      return Object.values(this.replies).length
    },

    allRepliesCount() {
      let count = 0
      Object.values(this.replies).forEach(item => {
        count += item.length
      })
      return count;
      // return Object.values(this.replies).length
    },

    allCommentsCount() {
      let count = 0;
      Object.values(this.comments).forEach(item => {
        count += item.length
      })
      return count;
    }
  },


  methods: {
    async getVideoData() {
      let res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.id}&key=${process.env.YT_API_KEY}`)
      let data = res.data.items[0].snippet;
      
      Object.entries(data).forEach(array => {
        this[array[0]] = array[1]
      })

      await this.getComments() 
    },

    async getComments() { // to get all comments
      this.comments = {}
      this.replies = {}

      getPageComments = getPageComments.bind(this)
      await getPageComments()
      
      async function getPageComments(nextPageToken) {
        let url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.YT_API_KEY}&textFormat=plainText&part=snippet,replies&videoId=${this.id}&maxResults=100`
        url = nextPageToken ? url + `&pageToken=${nextPageToken}` : url

        await axios.get(url).then(async response => {
          response.data.items.forEach(item => {
            let comment = item.snippet.topLevelComment.snippet
            let id = comment.authorChannelId.value
            if (this.comments[id]) this.comments[id].push(comment)
            else this.$set(this.comments, id, [comment])
            if (item.replies) {
              this.test += item.replies.comments.length
              console.log(item.replies.comments)
            }
            if (item.replies) item.replies.comments.forEach(item => {
              let comment = item.snippet
              let id = comment.authorChannelId.value
              if (this.replies[id]) this.replies[id].push(comment)
              else this.$set(this.replies, id, [comment])
            })
          })

          if (response.data.nextPageToken) await getPageComments(response.data.nextPageToken)
        })
      } 
    },

    parseVideoId(link) {
      return link.split('?v=')[1].split('&')[0]
    }
  },

  async mounted() {
    await this.getVideoData()
    console.log(this.test)
    // console.log(this.replies)
    // console.log(this.comments)
  },
}
</script>

<style>
</style>

// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=ZaI2IlHwmgQ&key=AIzaSyAdDpRSjpgTkCVBrL2Sigqj-nWFeo5XSmk