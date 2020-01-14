<template>
  <div class="movie-editor" v-if="movie">
    <input
      type="text"
      v-model="movie.imdbId"
      placeholder="IMDB ID"
      @input="update($event, 'imdbId', String)"
    />
    <button @click="fetchApiData">Get IMDB data</button>
    <input
      type="text"
      v-model="movie.title"
      placeholder="Title"
      @input="update($event, 'title', String)"
    />
    <input
      type="number"
      v-model="movie.year"
      placeholder="Year"
      @input="update($event, 'year', Number)"
    />
    <input
      type="number"
      v-model="movie.rate"
      step="0.1"
      placeholder="Rate"
      @input="update($event, 'rate', Number)"
    />
    <input
      type="text"
      v-model="movie.director"
      placeholder="Director"
      @input="update($event, 'director', String)"
    />
    <button @click="deleteMovie">Excluir Filme</button>
    <button @click="closeEditor">Fechar editor</button>
  </div>
</template>

<script>
import { moviesRef } from "../firebase";
import autoParse from "auto-parse";
import axios from "axios";
export default {
  computed: {
    movie: function() {
      return this.$store.state.currentMovie;
    },
  },
  methods: {
    update(event, fieldName, type) {
      this.source.update({
        // method to parse input value
        [fieldName]: autoParse(event.target.value.trim(), type),
      });
    },
    closeEditor() {
      this.$store.commit("setCurrentMovie", false);
    },
    deleteMovie() {
      this.source.delete();
      this.closeEditor();
    },
    fetchApiData() {
      if (this.movie.imdbId) {
        axios({
          method: "GET",
          url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key":
              "d829a7ddbdmsh61447fa124697f6p1eefd6jsn2e983d49a512",
          },
          params: {
            i: this.movie.imdbId,
            r: "json",
          },
        })
          .then(response => {
            const data = response.data;
            console.log(data);
            this.source.update({
              originalTitle: data.Title,
              rate: autoParse(data.imdbRating, Number),
              imdbRating: autoParse(data.imdbRating, Number) || 0,
              imdbVotes: autoParse(data.imdbVotes, Number) || 0,
              metascore: autoParse(data.Metascore, Number) || 0,
              runtime: Number.parseInt(data.Runtime) || 0,
              poster: data.Poster,
              year: autoParse(data.Year, Number),
              production: data.Production,
              language: data.Language,
              country: data.Country,
              director: data.Director,
              writer: data.Writer,
              actors: data.Actors,
              released: data.Released,
              genre: data.Genre,
              rated: data.Rated,
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
  },
  beforeUpdate: function() {
    if (this.movie.id) {
      this.source = moviesRef.doc(this.movie.id);
    }
  },
};
</script>

<style>
.movie-editor {
  background-color: red;
  display: flex;
  flex-flow: column;
}
</style>
