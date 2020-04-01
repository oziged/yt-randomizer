<template>
  <div class="main-wrapper">
    <transition name="fade">
      <div v-if="appLoading" class="first-load-loader">
        <AppYtLoader />
        <span>Loading</span>
      </div>
    </transition>
    <transition name="fade-down">
      <StartCard v-if="isVisible.start_block"/>
    </transition>

    <transition name="fade-down">
      <CommentsCard v-if="isVisible.comments_block"/>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from "vuex";

import StartCard from '../components/StartCard'
import CommentsCard from '../components/CommentsCard'
import AppYtLoader from '../components/AppYtLoader'

export default {
  components: {
    StartCard,
    CommentsCard,
    AppYtLoader
  },


  data() {
    return {
      appLoading: true,
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
    },

    async fetchComments() {
      this.$store.dispatch('comments/fetchComments', {
        id: this.parseVideoId(this.videoURL)
      })
    },

    parseVideoId(link) {
      return link.split('?v=')[1]
    },

    async watchImagesLoad() {
      let imgs = document.querySelectorAll('img')
      let promises = []

      imgs.forEach(item => {
        if (item.complete) return
        else promises.push(new Promise(resolve => item.onload = () => resolve()))
      })

      await Promise.all(promises)
    }
  },


  async mounted() {
    await this.watchImagesLoad()
    if (performance.now() < 2000) setTimeout(() => {this.appLoading = false}, 1000);
    else this.appLoading = false
  },
}
</script>


<style lang="scss" scoped>
  .main-wrapper {
    overflow-y: hidden;
    height: calc(100vh);
    margin-top: -70px;
    min-height: 600px;
  }

  .first-load-loader {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    span {
      font-family: Akkurat;
      margin-top: 10px;
      animation: span-loader 4s infinite;
    }

    @keyframes span-loader {
      0%, 20%, 100% {
        opacity: 0;
      }

      50%, 80% {
        opacity: 1;
      }
    }
  }
</style>
