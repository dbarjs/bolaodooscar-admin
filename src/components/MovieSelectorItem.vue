<template>
  <div>
    <strong>{{ item.title }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true }
  }
};
</script>

<style></style>
