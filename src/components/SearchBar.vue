<template>
  <div class="mb-3">
    <input
      v-model="searchQuery"
      @input="$emit('search', searchQuery)"
      type="text"
      class="form-control"
      placeholder="Pesquisar por nome do filme"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  }
};
</script>

<style scoped>
</style>
