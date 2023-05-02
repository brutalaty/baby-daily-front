<script setup lang="ts">
import { PropType } from 'vue';

import Adult from 'src/types/Adult';

const props = defineProps({
  adult: {
    required: true,
    type: Object as PropType<Adult>,
  },
});

const emit = defineEmits<{ (e: 'selected', id: number): void }>();

function handleAdultSelected() {
  emit('selected', props.adult.id);
}
</script>

<template>
  <div class="adult-list-item">
    <span data-test="relation">{{ adult.relation }}</span>
    <q-avatar
      data-test="avatar"
      @click="handleAdultSelected"
      class="adult-list-item-avatar"
    >
      <img :src="adult.avatar" class="adult-list-item-img" />
      <q-badge
        v-if="adult.manager"
        data-test="crown"
        color="transparent"
        text-color="yellow-8"
        floating
        rounded
      >
        <q-icon name="fa-solid fa-crown" />
      </q-badge>
    </q-avatar>
  </div>
</template>

<style lang="sass">
.adult-list-item
  display: flex
  flex-direction: column
  align-items: center

  &-img
    line-height: 48px

  &-avatar
    cursor: pointer
    &:hover
      filter: brightness(1.1)
</style>
