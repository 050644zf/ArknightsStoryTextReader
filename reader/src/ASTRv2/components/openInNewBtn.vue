<template>
  <n-tooltip>
    <template #trigger>
      <n-button tertiary type="tertiary" class="openinnew" tag="div">
        <template #icon>
          <n-icon @click="openInNew(link)">
            <OpenInNewIcon />
          </n-icon>
        </template>
      </n-button>
    </template>
    {{ $t('eventpage.openInNew') }}
  </n-tooltip>
</template>

<script>
import { OpenInNewOutlined } from "@vicons/material";
export default {
  props: ["link"],
  data() {
    return {
      server: this.$route.params.server,
    };
  },
  methods: {
    openInNew(link) {
      let route = this.$router.resolve(link);
      window.open(route.href, "_blank");
    },
  },
  components: {
    OpenInNewIcon: OpenInNewOutlined,
  },
};
</script>

<style>
@media (max-width: 700px) {
  .openinnew {
    display: none !important;
  }
}
</style>
