<script setup lang="ts">
import { PropType } from 'vue';

import ChildListItemVue from './ChildListItem.vue';
import Child from 'src/types/Child';

defineProps({
  children: {
    required: true,
    type: Array as PropType<Child[]>,
  },
});

const emit = defineEmits<{ (e: 'selected', id: number): void }>();

function handleChildSelected(id: number) {
  emit('selected', id);
}
</script>

<template>
  <div class="children">
    <ChildListItemVue
      v-for="child in children"
      data-test="child-item"
      :child="child"
      :key="child.id"
      @selected="handleChildSelected"
    />
  </div>
</template>

<style lang="sass">
.children
  display: flex
  flex-direction: row
  gap: 2rem
</style>
