<template>
  <div class="input-container">
    <input
      type="text"
      class="video-url-input"
      @input="$emit('input', $event.target.value)"
      :value="value"
    >
    <div class="label" v-if="!value.length">e.g youtube.com/watch?v=2xZcgwQiFJk</div>
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
      &:focus ~ .label {
        opacity: 0,
      }
    }
    .label {
      position: absolute;
      left: 5px;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      transition: .5s ease-out;
      pointer-events: none;
      opacity: .3;
    }
    .bottom-line-default, .bottom-line-focus {
      position: absolute;
      bottom: 0;
      height: 3px;
      transition: .7s ease-out;
    }
    .bottom-line-default {
      right: 0;
      width: 100%;
      background-color: rgba(231, 119, 119, 0.2);
    }
    .bottom-line-focus {
      left: 0;
      width: 0;
      background-color: $dark-red;
      opacity: .5;
      z-index: 1;
    }
  }
</style>
