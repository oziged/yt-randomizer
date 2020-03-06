<template>
  <div>
    <div 
      :class="{'first-page': true, number: true, 'number-active': currentPage == 0}" 
      @click="$emit('changePage', 0)"
    >
      1
    </div>
    <div class="divider">--</div>
    <div class="temp-pages">
      <div 
        :class="{'temp-page': true, number: true, 'number-disabled': lastPage < item, 'number-active': currentPage == item}" 
        v-for="(item,index) in tempPages" :key="index"
        @click="$emit('changePage', item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="divider">--</div>
    <div :class="{'last-page': true, number: true, 'number-active': currentPage == lastPage}" @click="$emit('changePage', lastPage)">
      {{ lastPage }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'itemsPerPage', 'totalItems'],

  computed: {
    tempPages()  {
      let currentPage = this.currentPage;
      let lastPage = this.lastPage
      if (currentPage < 5) return [2,3,4,5,6]
      if (currentPage > this.lastPage-3) return [lastPage-5, lastPage-4, lastPage-3, lastPage-2, lastPage-1]
      return [currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2]
    },

    lastPage() {
      return Math.floor(this.totalItems / this.itemsPerPage)
    }
  },

  mounted() {
    setInterval(() => {
      console.log(this.currentPage, this.lastPage, this.totalItems)
    }, 100);
  },
}
</script>

<style lang="scss" scoped>
  .divider {
    padding: 10px;
    font-size: .9em;
    font-family: Akkurat;
  }

  .temp-page {
    margin: 0 5px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  .number {
    padding: 10px 20px;
    border-radius: 5px;
    display: inline-block;
    border: 1px solid rgba(0,0,0,.09);
    display: inline-block;
    cursor: pointer;
    user-select: none;  
  }

  .number-active {
    background-color: $pagination-active;
  }

  .number-inactive {
    background-color: $pagination-inactive;
  }

  .number-disabled {
    background-color: $pagination-disabled;
    color: #b6b6b6;
    cursor: not-allowed;
  }
</style>