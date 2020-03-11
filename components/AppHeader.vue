<template>
  <header class="header flex align-center">
    <div class="logo flex">
      <img src="~assets/img/yt-logo.svg">
      <span>yt-random</span>
    </div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" >
  header {
    height: 70px;
    padding: 0 2%;
    max-width: 1920px;
    .logo {
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