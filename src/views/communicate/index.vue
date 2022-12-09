<template>
  <h1>1. $attrs和$listeners</h1>
  <Father :name="name" :hobby="hobby" @send-to-grand-father="ReceiveGrandSon" />
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import Father from './components/father.vue';

  const name = ref('梁小爷');
  const hobby = reactive(['麻将', '围棋', '游泳']);

  const ReceiveGrandSon = function() {
    // eslint-disable-next-line no-alert
    alert('爷爷已收到来自孙子的消息');
  };

</script>
<style lang="scss" scoped>
</style>
