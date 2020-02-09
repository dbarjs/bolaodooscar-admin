<template>
  <div v-if="categoryId">
    <v-radio-group
      @change="onChange"
      v-model="winner"
      v-if="nominees"
      refs="radioGroup"
    >
      <v-radio
        class="mb-4"
        label="Nenhum"
        value="false"
        v-if="nominees.length > 0"
      ></v-radio>
      <v-radio
        v-for="nominee in nominees"
        :key="nominee.id"
        :label="nominee.name"
        :value="nominee.id"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
import { categoriesRef } from "../firebase";
export default {
  data() {
    return {
      winner: "false",
      nominees: false
    };
  },
  methods: {
    onChange(value) {
      this.updateWinner(!value || value === "false" ? false : value);
    },
    updateWinner(nomineeId) {
      if (this.categoryId) {
        console.log(nomineeId);
        try {
          categoriesRef.doc(this.categoryId).update({
            winner: nomineeId
              ? categoriesRef
                  .doc(this.categoryId)
                  .collection("nominees")
                  .doc(nomineeId)
              : false
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  props: {
    categoryId: {
      required: true
    },
    categoryWinner: {
      required: true
    }
  },
  watch: {
    categoryId: {
      immediate: true,
      handler(categoryId) {
        if (categoryId) {
          this.$bind(
            "nominees",
            categoriesRef.doc(categoryId).collection("nominees")
          );
        }
      }
    },
    categoryWinner: {
      immediate: true,
      handler(winner) {
        this.winner = !winner ? "false" : winner.id;
      }
    }
  }
};
</script>

<style>
</style>