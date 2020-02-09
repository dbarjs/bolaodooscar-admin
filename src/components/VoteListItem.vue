<template>
  <v-card class="mx-auto mb-4" max-width="344" v-if="vote">
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img :src="userPhoto" v-if="userPhoto"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">
          <span v-if="userDisplayName">{{ userDisplayName }}</span>
          <span v-else>Sem Usuário</span>
        </v-list-item-title>
        <v-list-item-subtitle v-if="updatedTime">
          {{ updatedTime }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn
        text
        @click="showChoiceList = !showChoiceList"
        :disabled="numberOfChoices == 0"
      >
        <span v-if="numberOfChoices > 0">
          Mostrar {{ numberOfChoices }} votos
        </span>
        <span v-else>Não há votos</span>
        <v-icon v-if="numberOfChoices > 0">
          {{ showChoiceList ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon color="red" @click="deleteVote">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-list v-show="showChoiceList">
        <v-list-item
          v-for="(choice, categoryId) in orderedChoices"
          :key="categoryId"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ choice.movie.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ choice.category.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { DateTime } from "luxon";
import { votesRef } from "../firebase";
export default {
  data() {
    return {
      showChoiceList: false,
      aux: 0,
    };
  },
  computed: {
    userPhoto() {
      try {
        return this.vote.user.providerData.photoURL;
      } catch (e) {
        console.warn(e);
        return false;
      }
    },
    userDisplayName() {
      try {
        return this.vote.user.providerData.displayName;
      } catch (e) {
        console.warn(e);
        return false;
      }
    },
    updatedTime() {
      try {
        return this.vote.created
          ? DateTime.fromSeconds(
              this.vote.created.seconds + this.aux
            ).toRelative()
          : false;
      } catch (e) {
        console.warn(e);
        return false;
      }
    },
    numberOfChoices() {
      return Object.values(this.vote.choices).length;
    },
    orderedChoices() {
      // order Choices using Category "order" property
      return Object.values(this.vote.choices).sort((a, b) => {
        if (a.category.order < b.category.order) {
          return -1;
        } else if (a.category.order > b.category.order) {
          return 1;
        }
        return 0;
      });
    },
  },
  methods: {
    deleteVote() {
      if (this.vote.id && confirm("Você confirma a exclusão do voto?")) {
        votesRef.doc(this.vote.id).delete();
      }
    },
  },
  props: {
    vote: {
      required: true,
    },
  },
  mounted() {
    setInterval(() => {
      // interval to force recalculate the "updateTime" property
      this.aux = this.aux == 0 ? 1 : 0;
    }, 10000);
  },
};
</script>

<style></style>
