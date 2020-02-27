<template>
  <div class="container flex justify-center align-center">
    <div class="content-wrapper">
      <transition name="fade">
        <AppLoader v-if="isLoading" :title="`${loadedCommentsCount} / ${totalCommentsCount}`" style="border-radius: 15px;" />
      </transition>
      <div class="comments-nav">
        <div class="filters-button" @click="$modal.show('filters')">Filters</div>
        <div class="comment-headers">
          <div class="username">user</div>
          <div class="comment-text">comment</div>
        </div>
      </div>

      <modal name="filters" width="400" height="auto">
        <FilterList :filters="filters"/>
      </modal>

      <simplebar class="content">      
        <div class="comments-list">
          <div class="comment-item" v-for="(item, index) in filteredData" :key="index">
            <div class="username">{{ item.authorDisplayName }}</div>
            <div class="comment-text">{{ item.textOriginal }}</div>
          </div>
        </div>
      </simplebar>
    </div>
  </div>
</template>

<script>
import FilterList from './FilterList'
import CommentsList from './CommentsList'
import AppLoader from './AppLoader'
import simplebar from 'simplebar-vue';

export default {
  components: {
    FilterList,
    CommentsList,
    AppLoader,
    simplebar
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
    isLoading() {
      return this.$store.state.comments.is_loading
    },

    loadedCommentsCount() {
      return this.$store.state.comments.loaded_count
    },

    totalCommentsCount() {
      return this.$store.state.video.fetched_data.commentCount || 0
    },
    
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

<style>
 @import 'simplebar/dist/simplebar.min.css';
</style>

<style lang="scss" scoped>
  .container {
    height: 100%;
    .content-wrapper {
      position: relative;
      width: 100%;
      max-width: 900px;
      height: 50vh;
      min-height: 400px;
      box-shadow: 0 0 5px #0000003b;
      border-radius: 15px;
      .content {
        padding: 20px;
        padding-top: 115px;
        height: 100%;
      }
      .comments-nav {
        position: absolute;
        z-index: 10;
        width: calc(100% - 40px);
        left: 20px;
        top: 0;
        padding-top: 20px;
        background-color: white;
        .filters-button {
          cursor: pointer;
          padding: 5px;
          border: 2px solid $light-red;
          width: fit-content;
          border: 2px solid #e7333357;
          margin-bottom: 10px;
          transition: border .5s;
          &:hover {
            border: 2px solid #e73333ce;
          }
        }
        .comment-headers {
          display: flex;
          padding: 10px 0;
          border-top: 2px solid rgba(0,0,0,.04);
          border-bottom: 2px solid rgba(0,0,0,.04);
          .username {
            width: 30%;
          }
          .comment-text {
            width: 70%;
          }
        }
      }
      .comments-list {
        width: 100%;
        .comment-item {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px dashed rgba(0,0,0,.1);
          .username {
            width: 30%;
            padding-right: 20px;
          }
          .comment-text {
            width: 70%;
          }
        }
      }
    }
  }
</style>