<template>
  <div class="textblock" @mousemove="showLink = true" @mouseout="showLink = false">
    <n-tooltip trigger="hover" :disabled="!line.figure_art">
      <template #trigger>
        <span :class="{ nameblock: true, figure: line.figure_art }">{{
          line.attributes.name
        }}</span>
      </template>
      <n-image :src="getCharAvgUrl()" width="100"></n-image>
    </n-tooltip>

    <span class="contentblock" v-html="parseContent(line.attributes.content)"></span>
    <n-popover trigger="manual" :show-arrow="false" :show="copied">
      <template #trigger>
        <n-icon-wrapper :size="32" color="#00000000" icon-color="#7f7f7f" class="link" v-show="showLink"
          @click="hyperlink2line(line.id)">
          <n-icon size="24">
            <LinkOutlined />
          </n-icon>
        </n-icon-wrapper>
      </template>
      {{ $t("contentpage.copied") }}
    </n-popover>
  </div>
</template>

<script>
import func from "../func";
import source from "../source";
import { LinkOutlined } from "@vicons/material";

export default {
  data() {
    return {
      line: this.inputline,
      hideName: func.hideName,
      showLink: false,
      currentLang: func.l,
      copied: false,
    };
  },
  // mounted(){
  //     this.hideName = this.isHideName();
  // },
  props: {
    inputline: Object,
    story: Object,
    lidx: Number,
  },
  components: {
    LinkOutlined,
  },
  methods: {
    parseContent(content) {
      return func.parseContent(content);
    },
    isHideName() {
      console.log([this.lidx, this.hideName, this.line]);
      if (this.lidx == "0" || this.hideName == "n" || !this.line) {
        return false;
      } else {
        var lastLine = this.story[this.lidx - 1];

        if (
          lastLine.prop == "name" &&
          lastLine.attributes &&
          this.line.attributes
        ) {
          //console.log(lastLine);
          if (lastLine.attributes.name == this.line.attributes.name) {
            return true;
          }
        }

        return false;
      }
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
    getCharAvgUrl() {
      console.log(source.getCharAvgUrl("fexli", this.line.figure_art));
      return source.getCharAvgUrl("fexli", this.line.figure_art);
    },
  },
};
</script>

<style>
.textblock {
  margin: 4px;
  display: flex;
}

.textblock .nameblock {
  display: flex;
  flex: 1.5 70px;
  justify-content: flex-end;
  background-color: unset;

  margin: 2px;
  margin-right: 10px;
  text-align: right;
  font-weight: bold;
  color: #7f7f7f;
}

.textblock .contentblock {
  display: block;
  flex: 6 300px;
  background-color: unset;

  margin: 2px;
}

.textblock .hideName {
  color: rgba(0, 0, 0, 0);
}

.textblock .link {
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Generic */

  position: absolute;
  margin-left: -40px;
  padding-right: 40px;
  display: flex;
  justify-content: center;
}

.textblock .link:hover {
  color: yellow !important;
}
</style>
