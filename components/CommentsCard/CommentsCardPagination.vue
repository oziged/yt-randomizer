<template>
  <div>
    <div class="first-page number">1</div>
    <div class="divider">--</div>
    <div class="temp-pages">
      <div 
        :class="{'temp-page' :true, number: true, 'number-disabled': lastPage < item}" 
        v-for="(item,index) in tempPages" :key="index"
        @click="$emit('changePage', item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="divider">--</div>
    <div class="last-page number">
      {{ lastPage }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentPage', 'itemsPerPage', 'totalItems'],

  computed: {
    tempPages()  {
      let centerPage = this.currentPage;
      if (centerPage < 5) return [2,3,4,5,6]
      return [centerPage-2, centerPage-1, centerPage, centerPage+1, centerPage+2]
    },

    lastPage() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    }
  },

  mounted() {
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