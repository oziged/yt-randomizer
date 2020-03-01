<template>
  <div class="input-container flex">
    <div class="label" @click="$refs.input.focus()">{{ label }}</div>
    <input 
      ref="input"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keypress="isNumber"
    >
  </div>
</template>

<script>
export default {
  props: ['label', 'value'],
  
  methods: {
    isNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if (keyCode < 48 || keyCode > 57) {
          $event.preventDefault();
      }
    }
  },

  mounted() {
  },
}
</script>

<style lang="scss" scoped>
  .input-container {
    position: relative;
    .label {
      background-color: #d85555;
      color: white;
      padding: 0 10px;
      display: flex;
      align-items: center;
    }
    input {
      border-radius: 0 5px 5px 0;
      border-top: 1px solid rgba(0, 0, 0, .1);
      border-right: 1px solid rgba(0, 0, 0, .1);
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      border-left: 0;
      padding: 3px 5px;
      outline: none;
      flex-grow: 1;
      text-align: center;
    }
  }

</style>