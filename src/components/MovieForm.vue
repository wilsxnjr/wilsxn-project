<template>
  <div class="container mt-4">
    <h2>Adicionar Filme</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="movieName" class="form-label">Nome do Filme</label>
        <input
          type="text"
          class="form-control"
          id="movieName"
          v-model="movieName"
          placeholder="Ex: Inception"
        />
      </div>
      <div class="mb-3">
        <label for="movieCategory" class="form-label">Categoria</label>
        <input
          type="text"
          class="form-control"
          id="movieCategory"
          v-model="movieCategory"
          placeholder="Ex: Ação"
        />
      </div>
      <div class="mb-3">
        <label for="movieYear" class="form-label">Ano</label>
        <input
          type="number"
          class="form-control"
          id="movieYear"
          v-model="movieYear"
          placeholder="Ex: 2010"
        />
      </div>
      <div class="mb-3">
        <label for="movieImage" class="form-label">Link da Imagem</label>
        <input
          type="text"
          class="form-control"
          id="movieImage"
          v-model="movieImage"
          placeholder="URL da imagem"
        />
      </div>
      <button type="submit" class="btn btn-primary">Adicionar Filme</button>
    </form>

    <div class="mt-4">
      <h3>Pesquisar Filme</h3>
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Pesquise por nome de filme"
        @keyup.enter="searchMovie"
      />
      <button class="btn btn-info mt-2" @click="searchMovie">Pesquisar</button>

      <div v-if="searchResults.length > 0" class="mt-4">
        <h4>Resultados</h4>
        <div v-for="movie in searchResults" :key="movie.imdbID" class="mb-3">
          <img
            :src="movie.Poster"
            alt="Poster"
            class="img-thumbnail"
            style="width: 80px; height: 120px"
          />
          <div>
            <h5>{{ movie.Title }} ({{ movie.Year }})</h5>
            <button @click="addMovie(movie)" class="btn btn-success btn-sm">
              Adicionar à Lista
            </button>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="alert alert-danger mt-4">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { movieStore } from "../store";

export default {
  data() {
    return {
      movieName: "",
      movieCategory: "",
      movieYear: "",
      movieImage: "",
      searchQuery: "",
      searchResults: [],
      errorMessage: "",
    };
  },
  methods: {
    async searchMovie() {
      if (!this.searchQuery.trim()) {
        alert("Por favor, insira um nome de filme para pesquisar!");
        return;
      }

      this.errorMessage = "";
      try {
        const response = await axios.get(
          "https://api.collectapi.com/imdb/imdbSearchByName",
          {
            params: { query: this.searchQuery },
            headers: {
              authorization: "apikey your_token",
              "content-type": "application/json",
            },
          }
        );

        if (response.data.success && response.data.result.length > 0) {
          this.searchResults = response.data.result;
        } else {
          this.errorMessage = "Nenhum filme encontrado com esse nome.";
          this.searchResults = [];
        }
      } catch (error) {
        console.error("Erro ao buscar filme na IMDb:", error);
        this.errorMessage = "Erro ao buscar filme. Tente novamente.";
        this.searchResults = [];
      }
    },

    addMovie(movie) {
      const newMovie = {
        name: movie.Title,
        category: this.movieCategory || "N/A",
        year: movie.Year || this.movieYear,
        image: movie.Poster || this.movieImage,
      };

      movieStore.addMovie(newMovie);
      alert("Filme adicionado à lista local!");
    },

    submitForm() {
      const newMovie = {
        name: this.movieName,
        category: this.movieCategory,
        year: this.movieYear,
        image: this.movieImage,
      };

      movieStore.addMovie(newMovie);
      alert("Filme adicionado!");
    },
  },
};
</script>

<style scoped></style>
