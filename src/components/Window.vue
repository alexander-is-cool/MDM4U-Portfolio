<template>
  <div @mousedown="handleFocus" :style="[position, dimensions]" class="window">
    <div class="card card-tertiary">
      <div @mousedown="handleDrag" class="card-header d-flex justify-content-between">
        <div class="overflow-text center-items">
          <Icon :src="window.header.icon" alt="Window Icon" />{{ window.header.title }}
        </div>
        <div class="window-buttons center-items">
          <button @click="toggleMinimize" class="minimize-button" />
          <button
            v-if="window.expandable && !beforeFullScreen"
            @click="toggleFullScreen"
            class="maximize-button"
          />
          <button
            v-else-if="window.expandable && beforeFullScreen"
            @click="toggleFullScreen"
            class="maximize-minimize-button"
          />
          <button @click="closeWindow" class="close-button" />
        </div>
      </div>
      <div class="card-body h-100">
        <div @mousedown="handleFocus" class="card-text h-100">
          <slot></slot>
        </div>
      </div>
      <div v-if="window.expandable" class="resize">
        <span @mousedown="handleResize">
          <img width="10" height="10" src="img/resize.png" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from './Icon.vue';

export default {
  name: 'Window',

  components: {
    Icon,
  },

  props: {
    id: String,
  },

  data() {
    return {
      x: null,
      y: null,
      width: null,
      height: null,
      initialWidth: null,
      initialHeight: null,
      beforeFullScreen: null,
    };
  },

  computed: {
    ...mapState({
      window(state) {
        return state.windows.find((window) => window.id === this.id);
      },
    }),
    screen() {
      return this.$parent.$el;
    },
    position() {
      return {
        top: `${this.y}px`,
        left: `${this.x}px`,
        zIndex: this.window.zIndex,
      };
    },
    dimensions() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },
  },

  methods: {
    handleFocus() {
      this.$store.commit('focusWindow', this.id);
    },
    toggleMinimize() {
      this.$store.commit('minimizeWindow', this.id);
    },
    toggleFullScreen() {
      if (this.beforeFullScreen) {
        this.setDimensions(this.beforeFullScreen.width, this.beforeFullScreen.height);
        this.setPosition(this.beforeFullScreen.x, this.beforeFullScreen.y);

        this.beforeFullScreen = null;
      } else {
        this.beforeFullScreen = {
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height,
        };

        this.setPosition(0, 0);
        this.setDimensions(this.screen.clientWidth, this.screen.clientHeight);
      }
    },
    closeWindow() {
      this.$store.commit('closeWindow', this.id);
    },
    handleDrag(e) {
      if (!this.beforeFullScreen) {
        let previousX = e.clientX;
        let previousY = e.clientY;

        const dragWindow = (event) => {
          this.setPosition(
            this.x + (event.clientX - previousX),
            this.y + (event.clientY - previousY),
          );

          previousX = event.clientX;
          previousY = event.clientY;
        };
        const cleanUp = () => {
          document.removeEventListener('mousemove', dragWindow);
          document.removeEventListener('mouseup', cleanUp);
        };

        document.addEventListener('mousemove', dragWindow);
        document.addEventListener('mouseup', cleanUp);
      }
    },
    handleResize(e) {
      if (!this.beforeFullScreen) {
        let previousX = e.clientX;
        let previousY = e.clientY;

        const resizeWindow = (event) => {
          this.setDimensions(
            this.width + (event.clientX - previousX),
            this.height + (event.clientY - previousY),
          );

          previousX = event.clientX;
          previousY = event.clientY;
        };
        const cleanUp = () => {
          document.removeEventListener('mousemove', resizeWindow);
          document.removeEventListener('mouseup', cleanUp);
        };

        document.addEventListener('mousemove', resizeWindow);
        document.addEventListener('mouseup', cleanUp);
      }
    },
    setPosition(x, y) {
      this.x = x;
      this.y = y;

      // if (x + this.width >= this.screen.clientWidth) {
      //   this.x = this.screen.clientWidth - this.width;
      // } else if (x < 0) {
      //   this.x = 0;
      // } else {
      //   this.x = x;
      // }

      // if (y + this.height >= this.screen.clientHeight) {
      //   this.y = this.screen.clientHeight - this.height;
      // } else if (y < 0) {
      //   this.y = 0;
      // } else {
      //   this.y = y;
      // }
    },
    setDimensions(width, height) {
      if (this.x + width >= this.screen.clientWidth) {
        this.width = this.screen.clientWidth - this.x;
      } else if (width < this.initialWidth) {
        this.width = this.initialWidth;
      } else {
        this.width = width;
      }

      if (this.y + height >= this.screen.clientHeight) {
        this.height = this.screen.clientHeight - this.y;
      } else if (height < this.initialHeight) {
        this.height = this.initialHeight;
      } else {
        this.height = height;
      }
    },
  },

  mounted() {
    this.initialWidth = this.$el.clientWidth;
    this.initialHeight = this.$el.clientHeight;

    this.setDimensions(this.initialWidth, this.initialHeight);

    this.setPosition(
      this.screen.clientWidth / 2 - this.$el.clientWidth / 2,
      this.screen.clientHeight / 2 - this.$el.clientHeight / 2,
    );

    const content = this.$el.querySelector('.card');
    content.style.width = '100%';
    content.style.height = '100%';
  },
};
</script>

<style scoped>
.window {
  position: absolute;
  top: 50%;
  left: 50%;
}

.card {
  width: max-content;
  height: max-content;
}

.card-header {
  font-size: 0.7rem;
}

.card-header:hover {
  cursor: grab;
}

.card-header:active {
  cursor: grabbing;
}

.card-body {
  overflow: hidden;
}

.card-text {
  font-size: 0.6rem;

  color: black;
}

.window-buttons {
  margin-left: 10px;
}

.window-buttons > button {
  width: 16px;
  height: 16px;
  background-size: 12px 12px;
  margin-right: 6px;
}

.window-buttons > button:last-child {
  margin-right: 0px;
}

.minimize-button {
  background-image: url('../assets/minimize.png');
}

.maximize-button {
  background-image: url('../assets/maximize.png');
}

.maximize-minimize-button {
  background-image: url('../assets/maximize-minimize.png');
}

.close-button {
  background-image: url('../assets/close.png');
}

.resize {
  display: flex;
  justify-content: flex-end;

  height: 10px;
}

.resize img {
  position: relative;
  bottom: 10px;

  pointer-events: none;
}

.resize span {
  cursor: url('../assets/icons/resize.svg'), auto !important;
}
</style>
