<template>
  <div>
    <AppHeader />
    <nuxt/>
    <notifications group="app-alerts" position="bottom left"/>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>


<style lang="scss" scoped>

</style>