<template>
  <div class="paginator-container">
    <transition-group
      name="list"
      class="paginator"
    >
      <div
        v-for="(item,index) in PaginationArray"
        :key="`paginator_${index}`"
        class="paginator-item"
        :class="{'active' : item.active}"
        @click="changePage(item.label)"
      >
        <span class="paginator-text">{{ item.label }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    paginatorItems: {
      type: Object,
      required: true
    }
  },
  computed: {
    PaginationArray () {
      const data = this.paginatorItems.links

     data.splice(0, 1)
      data.pop()

      return data

      //
      // return data
    },
  },
  methods: {
    changePage (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
