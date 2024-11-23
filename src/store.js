export const movieStore = {
  get movies() {
    const movies = localStorage.getItem("movies");
    return movies ? JSON.parse(movies) : [];
  },

  set movies(movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
  },

  addMovie(movie) {
    const movies = this.movies;
    movie.id = new Date().getTime();
    movies.push(movie);
    this.movies = movies;
  },

  updateMovie(id, updatedMovie) {
    const movies = this.movies.map((movie) =>
      movie.id === id ? { ...movie, ...updatedMovie } : movie
    );
    this.movies = movies;
  },

  deleteMovie(id) {
    const movies = this.movies.filter((movie) => movie.id !== id);
    this.movies = movies;
  },
};
