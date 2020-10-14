<template>
  <div id="app">
    <Screen />
    <Toolbar @shutdown="handleShutdown" />
  </div>
</template>

<script>
import axios from 'axios';
import Folder from './utils/Folder';
import Screen from './components/Screen.vue';
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'app',

  components: {
    Screen,
    Toolbar,
  },

  data() {
    return {
      shutdown: false,
    };
  },

  methods: {
    handleShutdown() {
      this.shutdown = true;
    },
  },

  created() {
    axios.get('/files.json').then((response) => {
      this.$store.commit('setRootFolder', new Folder(response.data));
    });
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;

  margin: 0;
  padding: 0;
}

html,
body {
  color: white;

  width: 100%;
  height: 100%;
}

button {
  background-color: unset;
  border-color: unset;
  color: unset;
}

button:focus {
  outline: unset;
}

pre {
  white-space: pre-wrap;
}

.btn {
  transition: none;
}

.btn:focus {
  box-shadow: none;
}

.btn:active {
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  border-left: 1px solid #858585;
  border-top: 1px solid #858585;

  box-shadow: inset 1px 1px grey, 1px 0 #fff, 0 1px #fff, 1px 1px #fff;
}

.active-button {
  transition: none;

  border-bottom: 1px solid white;
  border-right: 1px solid white;
  border-left: 1px solid #858585;
  border-top: 1px solid #858585;

  box-shadow: inset 1px 1px grey, 1px 0 #fff, 0 1px #fff, 1px 1px #fff;
}

.active-button:focus {
  transition: none;

  border-bottom: 1px solid white;
  border-right: 1px solid white;
  border-left: 1px solid #858585;
  border-top: 1px solid #858585;

  box-shadow: inset 1px 1px grey, 1px 0 #fff, 0 1px #fff, 1px 1px #fff;
}

.active-button:before {
  border: none;
}

.active-button:hover {
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  border-left: 1px solid #858585;
  border-top: 1px solid #858585;
}

.center-items {
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.overflow-text {
  display: block;
  width: max-content;

  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
