<template>
  <div class="flex">
    <div class="first-page number">1</div>
      <div :class="{'temp-page' :true, number: true, 'number-disabled': lastPage < item}" v-for="(item,index) in tempPages" :key="index">
        {{ item }}
      </div>
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