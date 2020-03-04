<template>
  <div>
    <div class="first-page">
      <div class="number">1</div>
    </div>
    <div class="temp-pages">
      {{ tempPages }}
    </div>
    <div class="last-page">

    </div>
  </div>
</template>

<script>
export default {
  props: ['paginationParams'],

  computed: {
    tempPages()  {
      // NOTE -> not reactive paginationParams prop
        let centerNum = this.paginationParams.currentPage;
        return [centerNum-2, centerNum-1, centerNum, centerNum+1, centerNum+2]
      }
  },

  mounted() {
    setInterval(() => {
      let centerNum = this.paginationParams.currentPage;
      console.log([centerNum-2, centerNum-1, centerNum, centerNum+1, centerNum+2])
    }, 500);
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
  }
</style>