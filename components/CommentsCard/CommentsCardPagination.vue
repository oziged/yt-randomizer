<template>
  <div class="pagination-wrapper">
    <div
      :class="{'first-page': true, number: true, 'number-active': currentPage == 0}"
      @click="$emit('changePage', 1)"
    >
      1
    </div>
    <div class="divider">--</div>
    <div class="temp-pages">
      <div
        :class="{'temp-page': true, number: true, 'number-disabled': lastPage <= item, 'number-active': currentPage == item-1}"
        v-for="(item,index) in tempPages" :key="index"
        @click="lastPage <= item ? '' : $emit('changePage', item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="divider">--</div>
    <div :class="{'last-page': true, number: true, 'number-active': currentPage == lastPage-1 }" @click="$emit('changePage', lastPage)">
      {{ lastPage == 0 ? 1 : lastPage }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'itemsPerPage', 'totalItems', 'tempPagesCount'],

  computed: {
    tempPages()  {
      let currentPage = this.currentPage+1;
      let lastPage = this.lastPage
      if (currentPage < this.tempPagesCount) return Array(this.tempPagesCount).fill(0).map((_,index) => index + 2)
      if (currentPage > this.lastPage-this.tempPagesCount-2) return Array(this.tempPagesCount).fill(0).map((_,index) => lastPage-this.tempPagesCount+index)
      return Array(this.tempPagesCount).fill(0).map((_,index) => currentPage-Math.floor(this.tempPagesCount/2)+index)
    },

    lastPage() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
  },
}
</script>

<style lang="scss" scoped>
  .pagination-wrapper {
    display: flex;
  }

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
