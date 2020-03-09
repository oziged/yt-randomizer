<template>
  <div class="loader-container">
    <div class="default-loader"><div></div><div></div></div>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="scss" scoped>
  .title {
    font-family: monospace;
  }

  .loader-container {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, .8);
  }

  .default-loader {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .default-loader div {
    position: absolute;
    border: 4px solid $loader-color;
    opacity: 1;      
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: default-loader 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .default-loader div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes default-loader {
    0% {
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
</style>