<template>
  <div class="movie-editor" v-if="movie">
    <v-overlay>
      <v-card min-width="320" class="mx-auto">
        <v-img height="180" v-bind:src="movie.poster"></v-img>
        <v-form>
          <v-container>
            <v-text-field
              dense
              name="imdbId"
              label="IMDb ID"
              id="imdbId"
              type="text"
              v-model="movie.imdbId"
              @input="update($event, 'imdbId', String)"
            ></v-text-field>
            <v-text-field
              dense
              name="title"
              label="Título do Filme"
              id="title"
              type="text"
              v-model="movie.title"
              @input="update($event, 'title', String)"
            ></v-text-field>
            <v-text-field
              dense
              name="year"
              label="Ano de Lançamento"
              id="year"
              type="number"
              v-model="movie.year"
              @input="update($event, 'year', Number)"
            ></v-text-field>
            <v-text-field
              dense
              name="imdbRating"
              label="Nota no IMDb"
              id="imdbRating"
              type="number"
              step="0.1"
              v-model="movie.imdbRating"
              @input="update($event, 'imdbRating', Number)"
            ></v-text-field>
            <v-text-field
              dense
              name="metascore"
              label="Metacritic"
              id="metascore"
              type="number"
              suffix="/100"
              v-model="movie.metascore"
              @input="update($event, 'metascore', Number)"
            ></v-text-field>
            <v-text-field
              dense
              name="director"
              label="Diretor"
              id="director"
              type="text"
              v-model="movie.director"
              @input="update($event, 'director', String)"
            ></v-text-field>
            <v-text-field
              dense
              name="actors"
              label="Elenco"
              id="actors"
              type="text"
              v-model="movie.actors"
              @input="update($event, 'actors', String)"
            ></v-text-field>
            <v-text-field
              dense
              name="genre"
              label="Gênero"
              id="genre"
              type="text"
              v-model="movie.genre"
              @input="update($event, 'genre', String)"
            ></v-text-field>
            <v-text-field
              dense
              name="runtime"
              label="Tempo"
              id="runtime"
              type="text"
              v-model="movie.runtime"
              suffix="minutos"
              @input="update($event, 'runtime', Number)"
            ></v-text-field>
            <v-text-field
              dense
              name="poster"
              label="URL do Poster"
              id="poster"
              type="text"
              v-model="movie.poster"
              @input="update($event, 'poster', String)"
            ></v-text-field>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-btn text @click="closeEditor">Fechar</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="fetchApiData" color="orange">
            <v-icon>mdi-cloud-sync</v-icon>
          </v-btn>
          <v-btn text @click="deleteMovie" color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
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
    }
  },
  methods: {
    update(event, fieldName, type) {
      this.source.update({
        // method to parse input value
        [fieldName]: autoParse(event.trim(), type)
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
              "d829a7ddbdmsh61447fa124697f6p1eefd6jsn2e983d49a512"
          },
          params: {
            i: this.movie.imdbId,
            r: "json"
          }
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
              rated: data.Rated
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  beforeUpdate: function() {
    if (this.movie.id) {
      this.source = moviesRef.doc(this.movie.id);
    }
  }
};
</script>

<style lang="sass">
.movie-editor
  display: flex
  flex-flow: column
</style>
