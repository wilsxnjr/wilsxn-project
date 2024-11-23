<template>
  <div class="container">
    <h1 class="my-4">Gerenciador de Filmes - IMDb</h1>

    <MovieForm
      :isEditing="isEditing"
      :movieToEdit="selectedMovie"
      @refreshMovies="loadMovies"
    />

    <SearchBar @search="searchMovies" />

    <MovieList
      :movies="filteredMovies"
      @refreshMovies="loadMovies"
      @edit-movie="editMovie"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import MovieForm from "./components/MovieForm.vue";
import MovieList from "./components/MovieList.vue";
import SearchBar from "./components/SearchBar.vue";
import { movieStore } from "./store";

export default {
  components: { MovieForm, MovieList, SearchBar },
  setup() {
    const movies = ref(movieStore.movies);
    const filteredMovies = ref(movies.value);
    const selectedMovie = ref(null);
    const isEditing = ref(false);

    function loadMovies() {
      movies.value = movieStore.movies;
      filteredMovies.value = movies.value;
    }

    function searchMovies(query) {
      filteredMovies.value = movies.value.filter((movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    function editMovie(movie) {
      selectedMovie.value = movie;
      isEditing.value = true;
    }

    return {
      movies,
      filteredMovies,
      selectedMovie,
      isEditing,
      loadMovies,
      searchMovies,
      editMovie,
    };
  },

  created() {
    this.loadMovies();
  },
};
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
