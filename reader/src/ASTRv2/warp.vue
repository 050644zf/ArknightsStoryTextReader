<template>
  <n-auto-complete
    :placeholder="i18n.warp[currentLang]"
    v-model:value="value"
    :options="options"
    @select="select"
    :class="{ 'warp-search': true, 'warp-search-active': focused }"
    clear-after-select
    blur-after-select
    @focus="focused = true"
    @blur="
      focused = false;
      value = null;
    "
  />
</template>

<script>
import i18n from "./i18n.json";
import func from "./func.js";
import { computed } from "vue";
export default {
  data() {
    return {
      i18n: i18n,
      currentLang: func.l,
      eventList: window.sessionStorage.getItem("eventList")
        ? JSON.parse(window.sessionStorage.getItem("eventList"))
        : [],
      value: null,
      options: computed(() => {
        return this.search();
      }),
      server: this.$route.params.server,
      focused: false,
    };
  },
  methods: {
    search() {
      if (this.value == "" || this.value == null) {
        return [];
      }
      let result = [];
      for (var eventType in this.eventList) {
        for (var event of this.eventList[eventType]) {
          var stories = event.infoUnlockDatas;
          var children = [];
          for (var story of stories) {
            var code = story.storyCode ? story.storyCode : "";
            if (eventType == "or") {
              code = event.name;
            }
            var label = code + " " + story.storyName;
            if (label.toLowerCase().includes(this.value.toLowerCase())) {
              children.push({
                label: label + " - " + story.avgTag,
                value: `/${this.server}/content?f=${story.storyTxt}`,
              });
            }
          }
          if (children.length > 0) {
            if (eventType == "or") {
              var ename = event.name + " #" + event.set;
            } else {
              var ename = event.name;
            }
            result.push({
              label: ename,
              children: children,
              key: event.id,
              type: "group",
            });
          }
        }
      }
      return result;
    },
    select(link) {
      this.$router.push(link);
      this.value = null;
      this.options = [];
    },
  },
};
</script>

<style>
.warp-search {
  transition: width 0.5s;
  width: 150px;
}

.warp-search-active {
  width: 200px;
}

@media (max-width: 400px) {
  .warp-search {
    width: 100px;
  }

  .warp-search-active {
    width: 150px;
  }
}
</style>
