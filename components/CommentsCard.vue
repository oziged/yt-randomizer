<template>
  <div class="container flex justify-center align-center">
    <div class="content">
      <button @click="$modal.show('filters')">filters</button>
    <modal name="filters" width="400" height="auto">
      <FilterList :filters="filters"/>
    </modal>
    <!-- {{ filteredData  }} -->
      <div class="comments-list">
        <div class="comment-headers">
          <div class="username">user</div>
          <div class="comment-text">comment</div>
        </div>
        <div class="comment-item" v-for="(item, index) in filteredData" :key="index">
          <div class="username">{{ item.authorDisplayName }}</div>
          <div class="comment-text">{{ item.textOriginal }}</div>
        </div>
      </div>
      <!-- <ul> -->
        <!-- <li v-for="(item, index) in filteredData" :key="index">{{ item.textOriginal }}</li> -->
      <!-- </!-->
    <!-- </ul> -->
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
      test:[{textOriginal: '1 comment', authorDisplayName: 'lololshka'}, {authorDisplayName: 'asdad xds ', textOriginal: '2 comment'}],
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
      box-shadow: 0 0 5px #0000003b;
      padding: 20px;
      border-radius: 15px;
      .comments-list {
        width: 100%;
        .comment-headers {
          display: flex;
          padding: 10px 0;
          margin-bottom: 5px;
          border-top: 2px solid rgba(0,0,0,.04);
          border-bottom: 2px solid rgba(0,0,0,.04);
          .username {
            width: 30%;
          }
          .comments-text {
            width: 70%;
          }
        }
        .comment-item {
          display: flex;
          padding: 10px 0;
          .username {
            width: 30%;
          }
          .comments-text {
            width: 70%;
          }
        }
      }
    }
  }
</style>