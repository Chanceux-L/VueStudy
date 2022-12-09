<template>
  <div class="grandson">
    我是孙子组件，我的名字是{{ name }}
    <br>
    我爸爸的名字：{{ props.fatherName }}<button @click="emits('send-to-father');">点击传给爸爸</button>，
    我爷爷的名字：{{ $attrs.name }}<button @click="emits('send-to-grand-father');">点击传给爷爷</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    fatherName: String,
  });
  const emits = defineEmits(['send-to-father', 'send-to-grand-father']);

  const name = ref('梁小孙');
</script>

<style lang="scss" scoped>
  .grandson {
    background-color: rgb(235, 235, 144);
  }
</style>
