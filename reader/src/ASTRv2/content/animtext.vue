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
              // we need to extract the title and content
              // we can do this by splitting the string by the "<p=1>" and "<p=2>" tags
              // and then removing the closing tags "</>"
              let parts = raw.split("<p=1>");
              this.title = parts[1].split("</>")[0];
              parts = parts[1].split("<p=2>");
              this.content = parts[1].split("</>")[0];
            }
        }
    }
  };
  </script>
  
  <style></style>
  