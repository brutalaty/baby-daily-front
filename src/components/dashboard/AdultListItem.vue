<script setup lang="ts">
import { PropType, computed } from 'vue';

import Adult from 'src/types/Adult';

const props = defineProps({
  adult: {
    required: true,
    type: Object as PropType<Adult>,
  },
});

const emit = defineEmits<{ (e: 'selected', adult: Adult): void }>();

const avatarAltText = computed(() => adultsInitials());

const adultsInitials = () =>
  props.adult.name
    .split(' ')
    .map((el) => el[0])
    .join(' ')
    .toUpperCase();

function handleAdultSelected() {
  emit('selected', props.adult);
}
</script>

<template>
  <div class="adult-list-item">
    <span data-test="relation">{{ adult.relation }}</span>
    <q-avatar
      data-test="adult-avatar"
      @click="handleAdultSelected"
      class="adult-list-item-avatar"
    >
      <img
        :src="adult.avatar"
        class="adult-list-item-img"
        :alt="avatarAltText"
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

<style lang="sass">
.adult-list-item
  display: flex
  flex-direction: column
  align-items: center

  &-img
    line-height: 48px
    text-align: center
    display: flex
    align-items: center
    justify-content: center

  &-avatar
    cursor: pointer
    &:hover
      filter: brightness(1.1)
</style>
