<template>
  <div class="input-container">
    <input 
      type="text" 
      class="video-url-input" 
      @input="$emit('input', $event.target.value) " :value="value">
    <span class="bottom-line-default"></span>
    <span class="bottom-line-focus"></span>
  </div>
</template>

<script>
export default {
  props: ['value'],

  data() {
    return {
    }
  },


}
</script>

<style lang="scss" scoped>
  .input-container {
    position: relative;
    input {
      border: none;
      outline: none;
      padding: 15px 5px;
      width: 100%;
      transition: 5s;
      font-family: Akkurat;
      &:focus ~ .bottom-line-focus {
        width: 100%;
      }
    }
    .bottom-line-default, .bottom-line-focus {
      position: absolute;
      bottom: 0;
      height: 3px;
      transition: 1.2s ease-out;
    }
    .bottom-line-default {
      right: 0;
      width: 100%;
      background-color: rgba(231, 119, 119, 0.2);
    }
    .bottom-line-focus {
      left: 0;
      width: 0;
      background-color: $red;
      opacity: .5;
      z-index: 1;
    }
  }
</style>