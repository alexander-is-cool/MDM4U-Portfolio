<template>
  <ul class="menu">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;

  z-index: 100;

  margin: 0px;
  padding: 2px;

  color: black;
  background-color: #c0c0c0;

  border-top: 2px solid white;
  border-left: 2px solid white;
  border-right: 2px solid #393939;
  border-bottom: 2px solid #393939;
  border-radius: 0;

  list-style: none;
}
</style>
