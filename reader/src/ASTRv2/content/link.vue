<template>
  <n-popover
    trigger="manual"
    :show-arrow="false"
    :show="copied"
    class="linkwidget"
  >
    <template #trigger>
      <n-icon-wrapper
        :size="32"
        color="#00000000"
        icon-color="#7f7f7f"
        class="link"
        v-show="showLink"
        @click="hyperlink2line(line.id)"
      >
        <n-icon size="24">
          <LinkOutlined />
        </n-icon>
      </n-icon-wrapper>
    </template>
    {{ i18n["copied"][currentLang] }}
  </n-popover>
</template>

<script>
import func from "../func";
import i18n from "../i18n";
import { LinkOutlined } from "@vicons/material";

export default {
  data() {
    return {
      line: this.inputline,
      hideName: func.hideName,
      i18n: i18n,
      currentLang: func.l,
      copied: false,
    };
  },
  // mounted(){
  //     this.hideName = this.isHideName();
  // },
  props: {
    inputline: Object,
    showLink: Boolean,
  },
  components: {
    LinkOutlined,
  },
  methods: {
    hyperlink2line(lineid) {
      var l =
        document.location.href.split("#")[0] +
        "#" +
        document.location.hash.split("#")[1] +
        "#line" +
        lineid;
      // write l into clipboard
      navigator.clipboard.writeText(l).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1000);
      });
    },
  },
};
</script>

<style>
.linkwidget {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Generic */

  /* float  */
  position: fixed;
  bottom: 10%;
  right: 10%;
  z-index: 100;
}
.linkwidget .link:hover {
  color: yellow !important;
}
</style>
