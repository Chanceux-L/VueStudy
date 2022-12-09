<template>
  <router-view :key="$route.fullPath" />
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';

  onMounted(async () => {});

</script>

<style lang="scss" scoped>
</style>
