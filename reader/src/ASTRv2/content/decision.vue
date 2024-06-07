<template>
  <div :class="line.prop">
    <div
      v-for="(option, index) in line.attributes.values.split(';')"
      :key="option"
      class="option"
      @click="jumpTo(line.targetLine['option' + option])"
      @mouseover="
        addClass(line.targetLine['option' + option], 'PredicateFocused')
      "
      @mouseout="
        removeClass(line.targetLine['option' + option], 'PredicateFocused')
      "
      v-html="parseContent(line.attributes.options.split(';')[index])"
    ></div>
  </div>
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
  methods: {
    parseContent(content) {
      return func.parseContent(content);
    },
    jumpTo(id) {
      var optLine = document.getElementById(id);
      optLine.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    addClass(id, className) {
      var optLine = document.getElementById(id);
      optLine.classList.add(className);
    },
    removeClass(id, className) {
      var optLine = document.getElementById(id);
      optLine.classList.remove(className);
    },
  },
};
</script>

<style>
.Decision {
  margin: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.option {
  text-align: center;
  max-width: 800px;
  min-width: 30vw;
  margin: 4px;
  padding: 4px;
  transition: background-color 0.5s;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.option:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
