<template>
  <div class="video-container">
    <img class="video-img" :src="videoImgSrc" alt="">
    <img class="video-shadow" src="~assets/img/shadow.png" alt="" >
    <div class="video-info">
      <div class="title">{{ videoTitle }}</div>
      <div class="views-count">{{ videoData.viewCount || '~' }} views</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      videoData: 'video/videoData'
    }),

    videoImgSrc() {
      return this.videoData.thumbnails ? this.videoData.thumbnails.medium.url : 'https://forums.unrealengine.com/filedata/fetch?id=1155380&d=1436719052'
    },

    videoTitle() {
      let title = this.videoData.title;
      if (title) {
        return title.length > 15 ? title.slice(0, 15) + '...' : title
      } else return 'Video title...'
    }
  },
}
</script>

<style lang="scss" scoped>
  .video-container {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    .video-img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-shadow {
      position: absolute;
      z-index: 1;
      left: -500px;
      bottom: -300px;
    }
    .video-info {
      width: 100%;
      padding: 20px 40px;
      position: absolute;
      z-index: 2;
      left: 0;
      bottom: 0;
      font-family: Akkurat;
      color: white;
      .title {
        font-size: 2.3em;
      }
      .views-count {
        font-size: 1.5em;
      }
    }
  }


</style>


  