<template>
  <div class="container">
    <div class="content">
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
        <AppInput v-model="videoUrl"/>
      </div>
      <div class="video-block">

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AppInput from './AppInput'

export default {
  components: {
    AppInput
  },
  

  data() {
    return {
      videoUrl: '---'
    }
  },


  computed: {
    ...mapGetters({
      videoData: 'video/videoData'
    })
  },


  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    .interact-block {
      .title {
        font-family: Circular;
        font-size: 3em;
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
    }
  }
</style>