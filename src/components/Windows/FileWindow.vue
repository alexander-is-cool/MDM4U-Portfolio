<template>
  <div class="file-window"><div v-html="html" class="file-window-body"></div></div>
</template>

<script>
import axios from 'axios';
import showdown from 'showdown';
import pathBrowserify from 'path-browserify';

export default {
  props: {
    src: String,
  },

  data() {
    return {
      html: '',
      converter: new showdown.Converter(),
    };
  },

  computed: {
    url() {
      return pathBrowserify.join('files', this.src);
    },
  },

  created() {
    switch (this.src.split('.').pop()) {
      case 'txt':
        axios.get(this.url).then((response) => {
          this.html = `<pre>${response.data}</pre>`;
        });
        break;
      case 'md':
        axios.get(this.url).then((response) => {
          this.html = this.converter.makeHtml(response.data);
        });
        break;
      case 'png':
        this.html = `<img src="${this.url}?id=${Date.now()}" class="w-100 h-100" />`;
        break;
      case 'jpg':
        this.html = `<img src="${this.url}?id=${Date.now()}" class="w-100 h-100" />`;
        break;
      default:
        break;
    }
  },
};
</script>

<style>
.file-window {
  overflow-y: scroll;

  height: 100%;

  user-select: text;

  background-color: white;
}

.file-window-body {
  min-width: 400px;
  min-height: 200px;
  padding: 30px;

  font-size: 16px;
}

.file-window h1,
h2,
h3,
h4 {
  font-family: Arial, Helvetica, sans-serif;
}

.file-window ul > li,
ol > li,
p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
}

.file-window ul,
ol {
  padding-left: 20px;
}

.file-window img {
  display: block;

  width: 75%;
  height: 75%;

  margin: 0px auto;
}
</style>
