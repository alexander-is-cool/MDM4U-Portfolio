<template>
  <div @mousedown="handleMouseDown" class="background center-items">
    Alexander Azizi-Martin's MDM4U Portfolio
    <div v-if="drag" :style="dragStyles" class="drag"></div>
    <div v-if="drag" class="drag-background" />
  </div>
</template>

<script>
/* eslint-disable one-var-declaration-per-line, one-var */

export default {
  name: 'Background',

  data() {
    return {
      drag: null,
    };
  },

  computed: {
    calculatedDrag() {
      let top, left, width, height;

      if (this.drag.height < 0) {
        top = this.drag.y + this.drag.height;
        height = -1 * this.drag.height;
      } else {
        top = this.drag.y;
        height = this.drag.height;
      }

      if (this.drag.width < 0) {
        left = this.drag.x + this.drag.width;
        width = -1 * this.drag.width;
      } else {
        left = this.drag.x;
        width = this.drag.width;
      }

      return {
        top,
        left,
        width,
        height,
      };
    },
    dragStyles() {
      return {
        top: `${this.calculatedDrag.top}px`,
        left: `${this.calculatedDrag.left}px`,
        width: `${this.calculatedDrag.width}px`,
        height: `${this.calculatedDrag.height}px`,
      };
    },
  },

  methods: {
    handleDrag(event) {
      this.drag.width += event.clientX - this.drag.previousX;
      this.drag.height += event.clientY - this.drag.previousY;

      this.drag.previousX = event.clientX;
      this.drag.previousY = event.clientY;
    },
    handleMouseDown(event) {
      document.addEventListener('mouseup', this.cleanUp);
      document.addEventListener('mousemove', this.handleDrag);

      this.drag = {
        x: event.clientX,
        y: event.clientY,
        width: 0,
        height: 0,
        previousX: event.clientX,
        previousY: event.clientY,
      };
    },
    cleanUp() {
      document.removeEventListener('mouseup', this.cleanUp);
      document.removeEventListener('mousemove', this.handleDrag);

      this.drag = null;

      this.$el.dispatchEvent(new PointerEvent('click', { bubbles: true }));
    },
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;

  overflow: hidden;
}

.drag {
  position: absolute;

  border: 1px solid rgba(0, 0, 255, 1);
  background-color: rgba(0, 0, 255, 0.25);
}

.drag-background {
  position: absolute;

  top: 0px;
  left: 0px;

  width: 100vw;
  height: 100vh;

  z-index: 9999;
}
</style>
