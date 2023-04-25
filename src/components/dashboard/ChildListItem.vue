<template>
  <q-avatar>
    <img class="child-img" :src="child.avatar" />
  </q-avatar>
  <span data-test="age" class="child-age">
    {{ child.age }}
  </span>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
//types
import Child from 'src/types/Child';

const props = defineProps({
  child: {
    required: true,
    type: Object as PropType<Child>,
  },
});
</script>
