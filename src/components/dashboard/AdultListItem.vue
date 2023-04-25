<template>
  <div class="adult-list-item">
    <span data-test="relation">{{ adult.relation }}</span>
    <q-avatar>
      <img
        data-test="avatar"
        :src="adult.avatar"
        class="adult-list-item-img"
        @click="$emit('selected', adult.id)"
      />
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

<script setup lang="ts">
import { PropType } from 'vue';
//types
import Adult from 'src/types/Adult';

const props = defineProps({
  adult: {
    required: true,
    type: Object as PropType<Adult>,
  },
});

const emits = defineEmits<{ (e: 'selected', id: number): void }>();
</script>

<style lang="sass">
.adult-list-item
  display: flex
  flex-direction: column
  align-items: center

.adult-list-item-img
  cursor: pointer
  &:hover
    filter: brightness(1.1)
</style>
