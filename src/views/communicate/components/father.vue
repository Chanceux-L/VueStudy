<template>
  <div class="father">
    我是父组件，我的名字是{{ name }}
    <br>
    我爸爸的名字：{{ $attrs.name }}，我爸爸的兴趣：{{ (props.hobby as Array<String>).join(',') }}

    <!-- Vue3: $listeners已废弃，合并到$attrs -->
    <Grandson :father-name="name" v-bind="$attrs" @send-to-father="ReceiveSon" />
    <!-- Vue2 -->
    <!-- <Grandson :father-name="name" v-bind="$attrs" v-on="$listeners" @send-to-father="ReceiveSon" /> -->
  </div>
</template>

<script lang="ts" setup>
  import { defineProps, ref } from 'vue';
  import Grandson from './grandson.vue';

  const props = defineProps({
    hobby: Array,
  });

  const name = ref('梁小爸');

  const ReceiveSon = function() {
    // eslint-disable-next-line no-alert
    alert('爸爸已收到来自儿子的消息');
  };
</script>

<style lang="scss" scoped>
  .father {
    background-color: #baf;
  }
</style>
