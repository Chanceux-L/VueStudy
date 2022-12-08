<template>
  <div class="global-layout">
    <Header />
    <div class="main">
      <router-view :key="$route.fullPath" />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';

  onMounted(async () => {});

</script>

<style lang="scss" scoped>
.global-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .main {
    flex: 1;
  }
}
</style>
