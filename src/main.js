import Vue from 'vue';
import App from './App.vue';
import store from './store';
import TextWindow from './components/Windows/TextWindow.vue';
import FileWindow from './components/Windows/FileWindow.vue';
import FileExplorer from './components/Windows/ExplorerWindow.vue';

Vue.config.productionTip = false;

Vue.component('TextWindow', TextWindow);
Vue.component('FileWindow', FileWindow);
Vue.component('FileExplorer', FileExplorer);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// Preload Images
const preload = async (...images) => {
  let image;
  for (let i = 0; i < images.length; i += 1) {
    image = new Image();
    image.src = images[i];
  }
};

preload(
  'img/documents.png',
  'img/shutdown.png',
  'img/folder.png',
  'img/text.png',
  'img/drive-harddisk.gif',
  'img/image.png',
);
