<template>
  <div class="movie-list-item" @click="active()">
    <div class="movie-list-item-poster elevation-8">
      <v-img
        v-bind:src="movieData.poster"
        alt=""
        class="movie-list-item-image"
      />
    </div>
    <div class="movie-list-item-meta">
      <span class="movie-list-item-title subtitle-2">
        <span>{{ movieData.title }}</span>
      </span>
      <span class="movie-list-item-rating overline">
        <span v-if="movieData.imdbRating" class="imdb">
          {{ movieData.imdbRating }}<v-icon x-small>mdi-star</v-icon>
        </span>
        <span v-if="movieData.metascore">{{ movieData.metascore }}/100</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieListItem",
  computed: {
    getImdbUrl() {
      if (this.movieData.imdbId) {
        return "http://www.imdb.com/title/" + this.movieData.imdbId;
      }
    },
    getOriginalTitle() {
      return this.movieData.originalTitle &&
        this.movieData.originalTitle !== this.movieData.title
        ? this.movieData.originalTitle
        : false;
    }
  },
  props: {
    movieData: Object
  },
  methods: {
    active: function() {
      this.$store.commit("setCurrentMovie", this.movieData);
    }
  }
};
</script>

<style lang="sass">
.movie-list-item
  display: block
  margin: 0 .5625em 1.125em
  width: 90px

  .movie-list-item-poster
    margin-bottom: .75em
    border-radius: 7px
    overflow: hidden

    .movie-list-item-image
      width: 90px
      height: 133px
      object-fit: cover

  .movie-list-item-meta 
    display: flex
    flex-flow: column
    width: 100%

    .movie-list-item-title 
      text-overflow: ellipsis
      overflow: hidden
      line-height: 1.1
      
      span
        font-size: .77em
        font-weight: 500
        line-height: .5em
      
    .movie-list-item-rating
      display: flex
      flex-flow: row
      align-content: center
      font-weight: 400

      span
        letter-spacing: inherit

      .imdb
        margin-right: .375em
</style>
