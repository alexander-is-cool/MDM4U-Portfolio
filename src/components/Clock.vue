<template>
  <div class="clock text-center">
    {{ formatedTime }}
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'Clock',

  data() {
    return {
      currentTime: Date.now(),
    };
  },

  computed: {
    formatedTime() {
      return dayjs(this.currentTime).format('HH:mm - ddd D MMM YYYY');
    },
  },

  mounted() {
    setInterval(() => {
      this.currentTime = Date.now();
    }, 10000);
  },
};
</script>

<style>
.clock {
  font-size: 0.65rem;
  border-top: 1px solid #08080e;
  border-left: 1px solid #08080e;
  border-right: 1px solid #fcfcfc;
  border-bottom: 1px solid #fcfcfc;
  padding: 5px 15px;
}
</style>
