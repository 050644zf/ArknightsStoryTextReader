<template>
  <div
    :style="{ 'text-align': line.attributes.alignment }"
    @mousemove="showLink = true"
    @mouseout="showLink = false"
    :class="['Subtitle', { whitebg: isFontBlack() }, line.prop]"
  >
    <n-popover trigger="manual" :show-arrow="false" :show="copied">
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
      {{ $t("contentpage.copied") }}
    </n-popover>
    <div v-html="parseContent(line.attributes.text)"></div>
  </div>
</template>

<script>
import func from "../func";
import { LinkOutlined } from "@vicons/material";

export default {
  data() {
    return {
      line: this.inputline,
      showLink: false,
      copied: false,
    };
  },
  props: {
    inputline: Object,
  },
  components: {
    LinkOutlined,
  },
  methods: {
    parseContent(content) {
      return func.parseContent(content);
    },
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
    isFontBlack() {
      // check if the content has #000000
      var parsed = this.parseContent(this.line.attributes.text);
      // console.log(parsed);
      if (parsed) return parsed.indexOf("#000000") > -1;
    },
  },
};
</script>

<style>
.Subtitle {
  /* background-color: unset;
    margin: 4px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding: 10px;
    clear: both; */
}
.whitebg {
  background-color: white;
}
.Subtitle .link {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Generic */

  position: absolute;
  margin-left: -40px;
  padding-right: 40px;
  display: flex;
  justify-content: center;
}
.Subtitle .link:hover {
  color: yellow !important;
}
</style>
