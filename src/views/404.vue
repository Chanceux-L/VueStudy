<template>
  <div class="container">
    <div class="text-center">
      <div class="text">
        404
      </div>
      <b-button variant="primary" :to="{ name: 'home' }">
        Back to homepage
      </b-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  onMounted(() => {});
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0;

    .text {
      margin-bottom: 30px;
      font-size: 200px;
      color: #ddd;
    }
  }
</style>
