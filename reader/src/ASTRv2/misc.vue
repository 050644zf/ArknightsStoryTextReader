<template>
  <n-space class="misc" item-style="display:flex;" justify="center">
    <n-space vertical>
    <n-list class="list" hoverable clickable>
      <n-list-item
        @click="$router.push('/' + $route.params.server + '/analysis')"
      >
        <n-space item-style="display:flex;" align="center">
          <n-space item-style="display:flex;" align="baseline">
            <n-h2 prefix="bar">
              {{ $t('misc.analysis') }}
            </n-h2>
          </n-space>
        </n-space>
        <template #suffix>
          <n-button text>
            <n-icon size="32">
              <ForwardIcon />
            </n-icon>
          </n-button>
        </template>
      </n-list-item>
      <n-list-item
        @click="$router.push('/' + $route.params.server + '/isrecords')"
      >
        <n-space item-style="display:flex;" align="center">
          <n-space item-style="display:flex;" align="baseline">
            <n-h2 prefix="bar">
              {{ $t('misc.isrecords') }}
            </n-h2>
          </n-space>
        </n-space>
        <template #suffix>
          <n-button text>
            <n-icon size="32">
              <ForwardIcon />
            </n-icon>
          </n-button>
        </template>
      </n-list-item>
      <n-list-item
        @click="$router.push('/' + $route.params.server + '/act17side_log')"
      >
        <n-space item-style="display:flex;" align="center">
          <n-space item-style="display:flex;" align="baseline">
            <n-h2 prefix="bar">
              {{ $t('misc.act17side_log') }}
            </n-h2>
          </n-space>
        </n-space>
        <template #suffix>
          <n-button text>
            <n-icon size="32">
              <ForwardIcon />
            </n-icon>
          </n-button>
        </template>
      </n-list-item>
      <n-list-item
        @click="$router.push('/' + $route.params.server + '/act25side_log')"
      >
        <n-space item-style="display:flex;" align="center">
          <n-space item-style="display:flex;" align="baseline">
            <n-h2 prefix="bar">
              {{ $t('misc.act25side_log') }}
            </n-h2>
          </n-space>
        </n-space>
        <template #suffix>
          <n-button text>
            <n-icon size="32">
              <ForwardIcon />
            </n-icon>
          </n-button>
        </template>
      </n-list-item>
    </n-list>
    
    <n-divider dashed >已弃用 / Deprecated</n-divider>
    <n-list class="list">
      <n-list-item @click="$router.push('/' + $route.params.server + '/stats')">
        <n-space item-style="display:flex;" align="center">
          <n-space item-style="display:flex;" align="baseline">
            <n-h2 prefix="bar">
              {{ $t('misc.stats') }}
            </n-h2>
          </n-space>
        </n-space>
        <template #suffix>
          <n-button text>
            <n-icon size="32">
              <ForwardIcon />
            </n-icon>
          </n-button>
        </template>
      </n-list-item>
      <n-list-item
        @click="$router.push('/' + $route.params.server + '/stats2023')"
      >
        <n-space item-style="display:flex;" align="center">
          <n-space item-style="display:flex;" align="baseline">
            <n-h2 prefix="bar">
              {{ $t('misc.annual_report') }}
            </n-h2>
          </n-space>
        </n-space>
        <template #suffix>
          <n-button text>
            <n-icon size="32">
              <ForwardIcon />
            </n-icon>
          </n-button>
        </template>
      </n-list-item>
      <n-list-item @click="$router.push('/' + $route.params.server + '/extra')">
        <n-space item-style="display:flex;" align="center">
          <n-space item-style="display:flex;" align="baseline">
            <n-h2 prefix="bar">
              {{ $t('misc.extra') }}
            </n-h2>
          </n-space>
        </n-space>
        <template #suffix>
          <n-button text>
            <n-icon size="32">
              <ForwardIcon />
            </n-icon>
          </n-button>
        </template>
      </n-list-item>
    </n-list>
  </n-space>
  </n-space>
</template>

<script>
import { ArrowForwardOutlined } from "@vicons/material";
export default {
  props: ["eventype"],
  data() {
    return {
    };
  },
  components: {
    ForwardIcon: ArrowForwardOutlined,
  },
  methods: {},
};
</script>

<style>
.misc .list {
  width: 80vw;
  max-width: 1200px;
}
</style>
