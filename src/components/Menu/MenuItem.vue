<template>
  <li @click="propagateClick" class="menu-item d-flex align-content-center">
    <Icon :src="src" :alt="alt" />
    <span class="menu-item-content">
      <slot></slot>
    </span>
  </li>
</template>

<script>
import Icon from '../Icon.vue';

export default {
  name: 'MenuIcon',

  components: {
    Icon,
  },

  props: {
    src: String,
    alt: String,
  },

  methods: {
    propagateClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped>
.menu-item {
  display: flex;

  width: 100%;

  padding-top: 5px;
  padding-bottom: 5px;

  font-size: 0.55rem;
}

.menu-item:hover {
  background-color: #0090e4;
  color: white;
  cursor: pointer;
}

.menu-item-content {
  user-select: none;
  width: max-content;
  padding-right: 2px;
}
</style>
