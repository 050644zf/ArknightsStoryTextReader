<template>
  <n-card class="friend" hoverable clickable @mouseenter="hovering = true" @mouseleave="hovering = true" >
    <template #header>
      <n-text bold>{{ data.localized_name[lang] }}</n-text>
    </template>
    <template #header-extra>
      <n-avatar :size="48" :src="data.icon_url" round :style="{ backgroundColor: 'white' }"></n-avatar>
    </template>
      <n-space>
        <n-tag v-for="tag in data.localized_tags[lang]" :key="tag" :bordered="false" type="success">{{ tag }}</n-tag>
      </n-space>
      <p><n-text depth="3" italic>{{ data.localized_slogan[lang] }}</n-text></p>
      <p><n-text>{{ data.localized_description[lang] }}</n-text></p>
    <n-collapse-transition :show="hovering">
      <n-divider></n-divider>
      <n-flex vertical>
        <n-a v-for="link in data.links" :key="link.url" :href="link.url">
          <n-button v-if="link.primary"
          type="primary" 
          >
            {{ link.localized_name[lang] }}
            <n-icon>
              <OpenInNewOutlined />
            </n-icon>
          </n-button>
          <n-button v-else
          strong secondary type="primary">
            {{ link.localized_name[lang] }}
        </n-button>
        </n-a>
      </n-flex>
      </n-collapse-transition>

  </n-card>
</template>

<script>
import {OpenInNewOutlined } from "@vicons/material";
import func from '../func.js'
export default {
  props: ['data'],
  data() {
    return {
      lang: func.l == 'zh_CN' ? 'zh_CN' : 'en_US',
      hovering: false
    }
  },
  components: {
    OpenInNewOutlined
  }
}
</script>

<style>
/* .friend {
  height: 100%;
} */
</style>