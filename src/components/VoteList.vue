<template>
  <div class="vote-list mt-2" v-if="votes">
    <vote-list-item
      class="vote-list-item"
      v-for="vote in votes"
      :key="vote.key"
      :vote="vote"
    ></vote-list-item>
  </div>
</template>

<script>
import VoteListItem from "./VoteListItem.vue";
import { usersRef, votesRef } from "../firebase";
export default {
  data() {
    return {
      votes: [],
    };
  },
  firestore: {
    votes: votesRef.orderBy("updated", "desc"),
  },
  components: {
    VoteListItem,
  },
};
</script>

<style></style>
