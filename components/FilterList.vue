<template>
  <div class="filter-list">
    <p-check class="p-switch p-fill" color="danger" v-model="filters.includeReplies">Include replies for comments</p-check>
    <p-check class="p-switch p-fill" color="danger" v-model="filters.oneCommentForAuthor">Allow only 1 comment for user</p-check>
    <p-check class="p-switch p-fill" color="danger" v-model="filters.onlySAMPNicknames">Only SAMP nicknames</p-check>
  </div>
</template>

<script>
export default {
  props: ['filters'],
  data() {
    return {
      test: true
    }
  },

  mounted() {
  },
}

</script>

<style src="../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css"></style>
<style lang="scss">
  .filter-list {
    padding: 20px;
    border-radius: 10px;
  }
  .p-switch {
    display: block;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>