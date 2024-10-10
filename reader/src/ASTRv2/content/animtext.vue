<template>
  <n-alert :title="title" :bordered="false">
    <template #icon>
      <n-icon>
        <Compass v-if="line.attributes.name == 'group_location_stamp'" />
      </n-icon>
    </template>
    {{ content }}
  </n-alert>
  </template>
  
  <script>
  import {Compass} from '@vicons/fa';

  export default {
    data() {
      return {
        line: this.inputline,
        title: "",
        content: ""
      };
    },
    props: {
      inputline: Object,
    },
    created() {
      this.process();
    },
    components: {
      Compass,
    },
    methods: {
        process(){
            if(this.line.attributes.name == "group_location_stamp"){
              var raw = this.line.attributes.content;
              // the raw string is in the format of "<p=1> title </><p=2> content </>"
              // the p=1 or 2 is optional, but the closing tag is required
              var title = raw.match(/<p=1>(.*?)<\/>/);
              var content = raw.match(/<p=2>(.*?)<\/>/);
              this.title = title ? title[1] : "";
              this.content = content ? content[1] : "";
            }
        }
    }
  };
  </script>
  
  <style></style>
  