<template>
    <AdultListItemVue
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
//components
import AdultListItemVue from './AdultListItem.vue';
//types
import Adult from 'src/types/Adult';

const props = defineProps({
  adults: {
    required: true,
    type: Array as PropType<Adult[]>,
  },
});
</script>
