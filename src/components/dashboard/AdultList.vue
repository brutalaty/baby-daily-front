<script setup lang="ts">
import { PropType } from 'vue';

import AdultListItem from './AdultListItem.vue';
import Adult from 'src/types/Adult';

defineProps({
  adults: {
    required: true,
    type: Array as PropType<Adult[]>,
  },
});

const emit = defineEmits<{ (e: 'selected', id: Adult): void }>();

function handleAdultSelected(adult: Adult) {
  emit('selected', adult);
}
</script>

<template>
  <div class="adults">
    <AdultListItem
      v-for="adult in adults"
      data-test="adult-list-item"
      :adult="adult"
      :key="adult.id"
      @selected="handleAdultSelected"
    />
  </div>
</template>

<style lang="sass">
.adults
  display: flex
  flex-direction: row
  gap: 2rem
</style>
