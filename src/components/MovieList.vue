<template>
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="card mb-3">
      <img :src="movie.image" class="card-img-top" alt="Poster" />
      <div class="card-body">
        <h5 class="card-title">{{ movie.name }} ({{ movie.year }})</h5>
        <p class="card-text">Categoria: {{ movie.category }}</p>
        <button class="btn btn-warning" @click="editMovie(movie)">
          Editar
        </button>
        <button class="btn btn-danger" @click="deleteMovie(movie.id)">
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { movieStore } from "../store";

export default {
  props: ["movies"],
  methods: {
    editMovie(movie) {
      this.$emit("edit-movie", movie);
    },

    deleteMovie(id) {
      movieStore.deleteMovie(id);
      this.$emit("refreshMovies");
    },
  },
};
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 18rem;
  margin: 10px;
}
</style>
