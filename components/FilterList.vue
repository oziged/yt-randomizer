<template>
  <div class="filter-list">
    <label for="includeReplies">Include replies</label>
    <input type="checkbox" id="includeReplies" v-model="filters.includeReplies">

    <label for="includeReplies">One comment for author</label>
    <input type="checkbox" id="includeReplies" v-model="filters.oneCommentForAuthor">

    <label for="includeReplies">SAMP NICKNAMES</label>
    <input type="checkbox" id="includeReplies" v-model="filters.onlySAMPNicknames">
  </div>
</template>

<script>

export default {
  props: ['filters']
}

</script>

<style lang="scss" scoped>

</style>