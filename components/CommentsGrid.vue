<template>
  <div style="height: 500px">
    <FilterList :filters="filters"/>
    {{ commentsCount  }}
    <ul>
      <li v-for="(item, index) in filteredData" :key="index">{{ item.textOriginal }}</li>
    </ul>
  </div>
</template>

<script>
import FilterList from './FilterList'

export default {
  components: {
    FilterList
  },


  data() {
    return {
      filters: {
        includeReplies: true,
        oneCommentForAuthor: false,
        onlySAMPNicknames: false
      }    
    }
  },


  computed: {
    filteredData() {
      let filteredArray = []
      let comments = Object.values(this.$store.state.comments.comments)
      let replies = Object.values(this.$store.state.comments.replies)

      comments = JSON.parse(JSON.stringify(comments))
      replies = JSON.parse(JSON.stringify(replies))

      if (!this.filters.oneCommentForAuthor) {
        comments = comments.concat(updateForMultipleComments(comments))
        replies = replies.concat(updateForMultipleComments(replies))
        console.log(123, comments)
      }

      if (this.filters.includeReplies) filteredArray = comments.concat(replies)
      else filteredArray = comments

      filteredArray = filteredArray.map(item => item[0])

      if (this.filters.onlySAMPNicknames) {
        filteredArray = filteredArray.filter(item => {
          return includesSAMPNickname(item.textOriginal)
        })
      }

      // console.log('- - - - DATA - - - -')
      // console.log(filteredArray)
      // filteredArray.forEach(item => console.log(item.textOriginal))
      // console.log('- - - - DATA - - - -')

      return filteredArray

      function updateForMultipleComments(array) {
        let multipliedComments = []

        array.forEach(item => {
          if (item.length > 1) {
            let temp = item.splice(1).map(item => [item])
            multipliedComments = multipliedComments.concat(temp)
          }
        })

        return multipliedComments
      }

      function includesSAMPNickname(str) {
        if (!str.includes('_')) return

        let arr = str.split('_')
        return [arr[0].slice(-2), arr[1].slice(0,2)].every(str => {
          return str.split('').every(char => char.toLowerCase() != char.toUpperCase())
        })
      }
    },

    commentsCount() {
      return this.filteredData.length
    }


  },
}
</script>

<style lang="scss" scoped>

</style>