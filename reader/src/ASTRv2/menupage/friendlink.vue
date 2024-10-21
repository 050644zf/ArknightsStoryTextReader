<template>
  <n-card class="friend" hoverable clickable @click="showLinks = true">
    <template #header>
      <n-text bold>{{ data.localized_name[lang] }}</n-text>
    </template>
    <template #header-extra>
      <n-avatar :size="48" :src="data.icon_url" round :style="{ backgroundColor: 'white' }"></n-avatar>
    </template>
    <n-space>
      <n-tag v-for="tag in data.localized_tags[lang]" :key="tag" :bordered="true" type="info">{{ tag }}</n-tag>
    </n-space>
    <n-modal 
      v-model:show="showLinks" 
      @close="showLinks = false"
      style="width: 600px"
      size="huge"
      class="font"
      >
      <n-card >
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
        <n-flex vertical>
            <n-button
            v-for="link in data.links"
            :key="link.url"
            :href="link.url"
            :secondary="link.primary"
            :tertiary="!link.primary"
            type="warning"
            @click="openInNew(link.url)"
            >
              <n-text v-if="link.regionality=='CHINA_MAINLAND'">🇨🇳</n-text>
              <n-text v-else>🌏</n-text>
              &nbsp;
              {{ link.localized_name[lang] }}
              <n-icon>
                <OpenInNewOutlined />
              </n-icon>
            </n-button>
        </n-flex>
      </n-card>
    </n-modal>
  </n-card>
</template>

<script>
import { OpenInNewOutlined } from "@vicons/material";
import func from '../func.js'
export default {
  props: ['data'],
  data() {
    return {
      lang: func.l == 'zh_CN' ? 'zh_CN' : 'en_US',
      showLinks: false
    }
  },
  components: {
    OpenInNewOutlined
  },
  methods:{
    openInNew(url){
      window.open(url, '_blank')
    }
  }
}
</script>

<style>
.friend {
  height: 100%;
}
</style>