<template>
  <span v-if="src" class="icon-img">
    <img :src="src" :alt="alt" :width="width" :height="height" />
  </span>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    src: String,
    alt: String,
    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
  },
};
</script>

<style scoped>
.icon-img {
  padding-right: 8px;
}
</style>
