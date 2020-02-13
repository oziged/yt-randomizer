<template>
  <div>
    <input style="height: 100px; width: 100%; font-size: 40px" type="text" v-model="defaultLink">
    <button style="font-size: 40px; cursor: pointer" @click="fetchComments(generateApiUrl(defaultLink))">get comments</button>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  data() {
    return {
      comments: [],
      defaultLink: 'https://www.youtube.com/watch?v=pj6v3FwLvj8&t=30s'
    }
  },


  methods: {
    generateApiUrl(link) {
      return `https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyAdDpRSjpgTkCVBrL2Sigqj-nWFeo5XSmk&textFormat=plainText&part=snippet,replies&videoId=${link.split('?v=')[1].split('&')[0]}&maxResults=100`
    },

    async fetchComments(link) {
      let data = null;
      await axios.get(link).then(response => {
        data = response.data;
        response.data.items.forEach(item => {
          this.comments.push(item.snippet.topLevelComment.snippet.textOriginal)
        })
      })
      if (data.nextPageToken) this.fetchComments(`${link}&pageToken=${data.nextPageToken}`)
      else console.log(this.comments)
    },
  },

  async mounted() {
  
  },
}
</script>

<style>
</style>

