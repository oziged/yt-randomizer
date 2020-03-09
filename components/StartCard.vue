<template>
  <div class="container">
    <div class="interact-block">
      <h1 class="title">
        Find Youtube Video, <br>
        Get comments
      </h1>
      <h3 class="tooltip">
        Just paste video url, <br>
        load data, filter comments <br>
        and get random results
      </h3>
      <StartCardInput v-model="videoUrl" @input="updateVideoBlock"/>
      <div class="get-comments-button flex justify-center align-center" @click="getComments">Get comments</div>
    </div>
    <div class="video-block">
      <VideoCard />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import StartCardInput from './StartCard/StartCardInput'
import VideoCard from './VideoCard'

export default {
  components: {
    StartCardInput,
    VideoCard
  },
  

  data() {
    return {
      videoUrl: ''
    }
  },


  computed: {
    ...mapGetters({
      videoData: 'video/videoData'
    })
  },

  methods: {
    async updateVideoBlock() {
      let videoId = this.parseVideoId(this.videoUrl)
      if (!videoId) return;
      this.$store.commit('video/HIDE_VIDEO_BLOCK')
      await this.$store.dispatch('video/fetchVideo', {id: videoId})
      this.$store.commit('video/SHOW_VIDEO_BLOCK')
    },  

    parseVideoId(link) {
      let dirtyId = link.split('?v=')[1]
      return dirtyId ? dirtyId.split('&')[0] : false
    },

    async getComments() {
      if (this.parseVideoId(this.videoUrl)) {
        this.$store.commit('visible/CHANGE_VISIBILITY', {type: 'start', bool: false})
        this.$store.dispatch('comments/fetchComments', {id: this.parseVideoId(this.videoUrl)})
        setTimeout(() => {
          this.$store.commit('visible/CHANGE_VISIBILITY', {type: 'comments', bool: true})
        }, 500);
      }
    },
  },


  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    width: 100%;
    .interact-block {
      width: 40%;
      .title {
        font-family: Circular;
        font-size: 3em;
        margin-top: 0;
      }
      .tooltip {
        font-family: Akkurat;
        font-size: 1.3em;
        font-weight: 400;
        letter-spacing: 1.5px;
      }
      .video-url-input {
        border-bottom: 2px solid black;
      }
      .get-comments-button {
        cursor: pointer;
        width: 300px;
        height: 50px;
        color: white;
        background-color: $light-red;
        font-size: 1.4em;
        font-family: Akkurat;
        border-radius: 60px;
        margin-top: 20px;
        box-shadow: 0 0 5px 0px #e4181852;
        transition: box-shadow .3s ease-out;
        &:hover {
          box-shadow: 0 0 15px 0px #e4181852;
        }
      }
    }

    .video-block {
      margin-left: auto;
      width: 45%;
      height: 400px;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 10px 0px #970a0a78;
    }
  }


  // - - - - - ANIMATIONS - - - - - //
</style>