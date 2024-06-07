<template>
  <div
    :class="line.prop"
    :style="{ height: line.attributes.time * 30 + 'px' }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      line: this.inputline,
    };
  },
  props: {
    inputline: Object,
  },
};
</script>

<style></style>
