<template>
  <n-divider
    title-placement="left"
    v-if="!line.endOfOpt"
    class="Predicate"
    dashed
  >
    Options: {{ line.attributes.references.replaceAll(";", " ") }}
  </n-divider>
</template>

<script>
import func from "../func";

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

<style>
.Predicate {
  font-size: 20%;
  transition: background-color 0.5s;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(255, 255, 255, 0);
}
.PredicateFocused {
  background-color: rgba(135, 193, 175, 0.2);
}
</style>
