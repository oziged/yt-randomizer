<template>
  <div class="container flex justify-center align-center">
    <div class="content-wrapper">
      <!-- {{ filteredData }} -->
      <transition name="fade">
        <AppLoader v-if="isLoading" :title="`${loadedCommentsCount} / ${totalCommentsCount}`" style="border-radius: 15px;" />
      </transition>
      <div class="comments-nav">
        <div class="interact-buttons flex">
          <div class="button" @click="pickWinners">Randomize</div>
          <div class="button filters-button" @click="$modal.show('settings')">Settings</div>
        </div>
        <div class="comment-headers">
          <div class="username">user</div>
          <div class="like-count" @click="changeSort('likes')"><span :class="handleSortClassName('likes')">likes</span></div>
          <div class="comment-text">comment</div>
          <div class="comment-date" @click="changeSort('date')"><span :class="handleSortClassName('date')">date</span></div>
        </div>
      </div>

      <modal name="settings" width="400" height="auto">
        <div class="settings-content">
          <span class="title">Filters:</span>
          <FilterList :filters="filters"/>
          <div class="divider"></div>
          <CommentsCardInput label="Number of winners" v-model="winnersCount"/>
        </div>
      </modal>
      
      <modal name="winners" height="auto">
        <simplebar class="simplebar winners-content">      
              <div class="winner-card" v-for="(item, index) in winnersList" :key="index">
                <div class="username">{{ item.authorDisplayName }}</div>
                <div class="comment">{{ item.textOriginal }}</div>
              </div>
        </simplebar>
      </modal>

      <simplebar class="simplebar comments-content">      
        <div class="comments-list">
          <div class="comment-item" v-for="(item) in paginatedData" :key="item.publishedAt + Math.random()">
            <div class="username">{{ item.authorDisplayName }}</div>
            <div class="like-count">{{ item.likeCount }}</div>
            <div class="comment-text">{{ item.textOriginal.slice(0,50) + '...' }}</div>
            <div class="comment-date">{{ new Date(item.publishedAt).toLocaleDateString() }}</div>
          </div>
        </div>
        <CommentsCardPagination
          class="pagination-block"
          :currentPage="currentPage" 
          :itemsPerPage="itemsPerPage" 
          :totalItems="filteredData.length"
          @changePage="currentPage = $event"
        />
      </simplebar>

    </div>
  </div>
</template>

<script>
import FilterList from './FilterList'
import CommentsList from './CommentsList'
import AppLoader from './AppLoader'
import simplebar from 'simplebar-vue';
import CommentsCardInput from './CommentsCard/CommentsCardInput'
import CommentsCardPagination from './CommentsCard/CommentsCardPagination'

export default {
  components: {
    FilterList,
    CommentsList,
    AppLoader,
    simplebar,
    CommentsCardInput,
    CommentsCardPagination
  },


  data() {
    return {
      filters: {
        includeReplies: false,
        oneCommentForAuthor: false,
        onlySAMPNicknames: false
      },
      sortSettings: {
        key: null,
        type: null
      },
      currentPage: 0,
      itemsPerPage: 10,
      test: 'sort-default',
      winnersCount: 1
    }
  },


  methods: {
    pickWinners() {
      this.$store.dispatch('result/pickWinners', {winnersCount: this.winnersCount, comments: this.filteredData})
      this.$modal.show('winners')
    },

    changeSort(key) {
      if (this.sortSettings.key == key) {
        this.sortSettings.type = this.sortSettings.type == 'top' ? 'bottom' : 'top'
      } else {
        this.sortSettings = {
          key,
          type: 'top'
        }
      }
    },

    handleSortClassName(key) {
      if (this.sortSettings.key != key) return 'sort-default'
      else return `sort-${this.sortSettings.type}`
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

    winnersList() {
      return this.$store.state.result.winners_list
    },

    paginatedData() {
      let start = this.currentPage * this.itemsPerPage
      let end = start + this.itemsPerPage
      return this.filteredData.slice(start, end)
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

      if (this.sortSettings.key) {
        switch (this.sortSettings.key) {
          case 'likes':
            if (this.sortSettings.type == 'top') filteredArray.sort((a,b) => b.likeCount - a.likeCount)
            else filteredArray.sort((a,b) => a.likeCount - b.likeCount)
            break;

          case 'date':
            if (this.sortSettings.type == 'top') filteredArray.sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt))
            else filteredArray.sort((a,b) => new Date(a.publishedAt) - new Date(b.publishedAt))
            break;

          default:
            break;
        }
      }
      // filteredArray.sort((a,b) => b.likeCount - a.likeCount)

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

  mounted() {
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
      max-height: calc(100vh - 200px);
      min-height: 400px;
      box-shadow: 0 0 5px #0000003b;
      border-radius: 15px;
      .comments-content {
        padding: 20px;
        padding-top: 115px;
        min-height: 400px;
        max-height: calc(100vh - 200px);
      }
      .pagination-block {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .comments-nav {
        position: absolute;
        z-index: 10;
        width: calc(100% - 40px);
        left: 20px;
        top: 0;
        padding-top: 20px;
        background-color: white;
        .interact-buttons {
          .filters-button {
            margin-left: auto;
          }
        }
        .button {
          cursor: pointer;
          padding: 5px;
          width: fit-content;
          margin-bottom: 17px;
          padding: 6px 30px;
          transition: border .5s;
          color: white;
          background-color: #e73333;
          font-family: Akkurat;
          border-radius: 10px;
          box-shadow: 0 0 5px 0px rgba(228,24,24,0.32157);
          transition: box-shadow .3s ease-out;
        }
        .comment-headers {
          display: flex;
          border-top: 2px solid rgba(0,0,0,.04);
          border-bottom: 2px solid rgba(0,0,0,.04);
          &>div {
            padding: 10px 0;
            cursor: pointer;
          }
          span {
            position: relative;
          }
          .username {
            width: 30%;
          }
          .like-count {
            width: 10%;
          }
          .comment-text {
            width: 50%;
          }
          .comment-date {
            width: 10%;
          }
        }
      }
      .settings-content {
        font-family: Akkurat;
        padding: 20px;
        .title {
          display: block;
          margin-bottom: 10px;
        }
        .divider {
          width: 100%;
          height: 2px;
          background-color: rgba(0,0,0,.05);
          margin: 10px 0;
        }
      }
      .winners-content {
        padding: 30px;
        max-height: 70vh;
        background-color: #ececec;
        .winner-card {
          padding: 30px;
          margin-bottom: 20px;
          border-radius: 10px;
          text-align: center;
          color: white;
          font-family: Scada;
          text-transform: uppercase;
          box-shadow: 0 0 13px #a52c2c;
          background: linear-gradient(to right, #cb2d3e, #ef473a);
          &:last-child {
            margin-bottom: 0;
          }
          .username {
            width: fit-content;
            background-color: #ffffff33;
            margin: 0 auto;
            padding: 5px 10px;
            border-radius: 10px;
            margin-bottom: 15px;
          }
        }
      }
      .comments-list {
        width: 100%;
        overflow-x: hidden;
        .comment-item {
          display: flex;
          padding: 10px 0;
          transition: .5s;
          border-bottom: 1px dashed rgba(0,0,0,.1);
          .username {
            width: 30%;
            padding-right: 20px;
          }
          .like-count {
            width: 10%;
          }
          .comment-text {
            width: 50%;
            padding-right: 20px;
          }
          .comment-date {
            width: 10%;
          }
        }
      }
    }
  }

  .simplebar {
    height: 100%;
  }

  .sort-default, .sort-top, .sort-bottom {
    &:after {
      content: '';
      position: absolute;
      width: 0; 
      height: 0; 
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid rgb(189, 189, 189);
      right: -13px;
      top: 7px;
      transition: .5s;
      transform: rotate(-90deg);
    }
  }

  .sort-top:after {
    border-top: 5px solid rgb(78, 200, 129);
    transform: rotate(0deg);
  }

  .sort-bottom:after {
    border-top: 5px solid rgb(78, 200, 129);
    transform: rotate(180deg);
  }
</style>