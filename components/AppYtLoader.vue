<template>
  <div class="loader-container">
    <div class="rectangle"></div>
    <div class="triangle"></div>
  </div>
</template>

<style lang="scss" scoped>
  .loader-container {
    position: relative;
    width: 55px;
    height: 35px;
  }

  .rectangle, .triangle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: scale(0) rotate(180deg) translate(-50%, -50%);
    transform-origin: 0 0;
  }

  .rectangle {
    width: 55px;
    height: 35px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $light-red;
    animation: rectangle 4s infinite;
  }

  .triangle {
    position: absolute;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 16px solid white;
    animation: triangle 4s infinite;
    animation-delay: .5s;
  }

  @keyframes rectangle {
    0% {
      transform: scale(0) rotate(0deg) translate(-50%, -50%);
    }

    50%, 70% {
      transform: scale(1) rotate(180deg) translate(-50%, -50%);
    }

    100% {
      transform: scale(0) rotate(360deg) translate(-50%, -50%);
    }
  }

  @keyframes triangle {
    0%, 100% {
      transform: scale(0) rotate(180deg) translate(-50%, -50%);
    }

    40%, 55% {
      transform: scale(1) rotate(360deg) translate(-50%, -50%);
    }

    80% {
      transform: scale(0) rotate(180deg) translate(-50%, -50%);
    }
  }
</style>