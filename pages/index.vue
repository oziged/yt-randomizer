<template>
    <div class="main-wrapper">
    <transition name="fade">
      <StartCard v-if="isVisible.start_block"/>
    </transition>

    <transition name="fade">
      <CommentsCard v-if="isVisible.comments_block"/>
    </transition>
    </div>
    <!-- <CommentsCard /> -->
    <!-- <input style="height: 100px; width: 100%; font-size: 40px" type="text" v-model="videoURL">
    <button style="font-size: 40px; cursor: pointer" @click="fetchVideo">get video info</button>
    <button style="font-size: 40px; cursor: pointer" @click="fetchComments">get comments info</button>
    <VideoCard v-if="videoData.is_visible" />
    <CommentsCard /> -->
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from "vuex";

import StartCard from '../components/StartCard'
import CommentsCard from '../components/CommentsCard'

export default {
  components: {
    StartCard,
    CommentsCard
  },


  data() {
    return {
      videoURL: 'https://www.youtube.com/watch?v=q_WOwAxQGQ0',
    }
  },


  computed: {
    ...mapGetters({
      isVisible: 'visible/visibilityData'
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
    // this.$store.dispatch('comments/fetchComments', {id: this.parseVideoId('https://www.youtube.com/watch?v=V3XYumIwCeo')})
  },
}
</script>


<style lang="scss" scoped>
  .main-wrapper {
    height: calc(100vh);
    margin-top: -70px;
  }
</style>