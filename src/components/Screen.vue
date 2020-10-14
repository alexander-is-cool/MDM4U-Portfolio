<template>
  <div id="screen" class="screen">
    <Background />
    <div v-for="window in windows" :key="window.id">
      <Window v-show="!window.minimized" :id="window.id">
        <component :is="window.template" :id="window.id" v-bind="window.props"></component>
      </Window>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Background from './Background.vue';
import Window from './Window.vue';

export default {
  name: 'Screen',

  components: {
    Background,
    Window,
  },

  computed: mapState(['windows']),
};
</script>

<style scoped>
.screen {
  position: relative;
  background-color: #008081;

  user-select: none;

  width: 100%;
  height: calc(100vh - 33px);

  overflow: hidden;
}
</style>
