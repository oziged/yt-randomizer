<template>
  <div>
    <span>
      {{ videoData.title }}
    </span> 
    <p>
      {{ videoData.description }}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      videoData: 'video/videoData'
    })
  },
}
</script>

<style lang="scss" scoped>

</style>