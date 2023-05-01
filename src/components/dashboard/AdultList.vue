<template>
  <div class="adults">
    <AdultListItemVue
      v-for="adult in adults"
      data-test="adult-item"
      :adult="adult"
      :key="adult.id"
      @selected="handleAdultSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
//components
import AdultListItemVue from './AdultListItem.vue';
//types
import Adult from 'src/types/Adult';

defineProps({
  adults: {
    required: true,
    type: Array as PropType<Adult[]>,
  },
});

const emit = defineEmits<{ (e: 'selected', id: number): void }>();

function handleAdultSelected(id: number) {
  emit('selected', id);
}
</script>

<style lang="sass">
.adults
  display: flex
  flex-direction: row
  gap: 2rem
</style>
