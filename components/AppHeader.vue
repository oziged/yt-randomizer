<template>
  <header class="header flex align-center">
    <div class="logo flex" @click="backToStartCard">
      <img src="~assets/img/yt-logo.svg">
      <span>yt-random</span>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    backToStartCard() {
      if (!this.$store.state.visible.start_block) {
        this.$store.commit('visible/CHANGE_VISIBILITY', {type: 'comments', bool: false})
        this.$store.commit('comments/SET_DEFAULT_STATE')
        setTimeout(() => {
          this.$store.commit('visible/CHANGE_VISIBILITY', {type: 'start', bool: true})
        }, 500);
      }
    }
  }
}
</script>

<style lang="scss" >
  header {
    height: 70px;
    padding: 0 2%;
    max-width: 1920px;
    .logo {
      cursor: pointer;
      height: 25px;
      font-family: Avenir;
      font-size: 1.2em;
      img {
        height: 100%;
        margin-right: 10px;
      }
    }
  }
</style>
