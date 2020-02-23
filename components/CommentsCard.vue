<template>
  <div class="container flex justify-center align-center">
    <div class="content">
      <FilterList :filters="filters"/>
        {{ filteredData  }}
      <CommentsList :comments="[{textOriginal: '1 comment'}, {textOriginal: '2 comment'}]"/>
      <!-- <ul> -->
        <!-- <li v-for="(item, index) in filteredData" :key="index">{{ item.textOriginal }}</li> -->
      <!-- </!-->
    </div>
  </div>
</template>

<script>
import FilterList from './FilterList'
import CommentsList from './CommentsList'

export default {
  components: {
    FilterList,
    CommentsList
  },


  data() {
    return {
      filters: {
        includeReplies: false,
        oneCommentForAuthor: false,
        onlySAMPNicknames: false
      }    
    }
  },


  computed: {
    filteredData() {
      let filteredArray = JSON.parse(JSON.stringify(this.$store.state.comments.fetched_data))

      if (!this.filters.includeReplies) {
        for (const [key, value] of Object.entries(filteredArray)) {
          if (value.replies) {
            delete filteredArray[key].replies
            if (!value.comments) {
              delete filteredArray[key]
            }
          }
        }
      }

      if (this.filters.oneCommentForAuthor) {
        for (const [key, value] of Object.entries(filteredArray)) {
          if (value.comments) {
            value.comments.splice(1)
            delete filteredArray[key].replies
          }
          else value.replies.splice(1)
        }
      }

      let tempArr = []

      Object.values(filteredArray).map(item => {
        if (item.comments) item.comments.forEach(comment => {
          tempArr.push(comment)
        })  
        if (item.replies) item.replies.forEach(reply => {
          tempArr.push(reply)
        })  
      })

      filteredArray = tempArr
 
      if (this.filters.onlySAMPNicknames) {
        filteredArray = filteredArray.filter(item => {
          return includesSAMPNickname(item.textOriginal)
        })
      }

      function includesSAMPNickname(str) {
        if (!str.includes('_')) return

        let arr = str.split('_')
        return [arr[0].slice(-2), arr[1].slice(0,2)].every(str => {
          return str.split('').every(char => char.toLowerCase() != char.toUpperCase())
        })
      }

      return filteredArray
    }


  },
}
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    .content {
      width: 100%;
      max-width: 700px;
    }
  }
</style>