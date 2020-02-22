<template>
    <VideoCard />
    <!-- <input style="height: 100px; width: 100%; font-size: 40px" type="text" v-model="videoURL">
    <button style="font-size: 40px; cursor: pointer" @click="fetchVideo">get video info</button>
    <button style="font-size: 40px; cursor: pointer" @click="fetchComments">get comments info</button>
    <VideoCard v-if="videoData.is_visible" />
    <CommentsGrid /> -->
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from "vuex";

import VideoCard from '../components/VideoCard'
import CommentsGrid from '../components/CommentsGrid'

export default {
  components: {
    VideoCard,
    CommentsGrid
  },


  data() {
    return {
      videoURL: 'https://www.youtube.com/watch?v=q_WOwAxQGQ0',
    }
  },


  computed: {
    ...mapGetters({
      videoData: 'video/videoData'
    })
  },


  methods: {
    async fetchVideo() {
      await this.$store.dispatch('video/fetchVideo', {
        id: this.parseVideoId(this.videoURL)
      })
      this.$store.commit('video/SHOW_VIDEO_BLOCK')
    },


    async fetchComments() {
      this.$store.dispatch('comments/fetchComments', {
        id: this.parseVideoId(this.videoURL)
      })
    },


    parseVideoId(link) {
      return link.split('?v=')[1]
    }
  },


  async mounted() {
    
  },
}
</script>

<style lang="scss" scoped>
  .main-container {

  }
</style>