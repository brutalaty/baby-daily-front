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
    <q-btn
      @click="handleAdultSelected"
      class="adult-list-item-button"
      rounded
      unelevated
      padding="0"
    >
      <q-avatar data-test="adult-avatar" class="adult-list-item-avatar">
        <img
          :src="adult.avatar"
          class="adult-list-item-img"
          :alt="avatarAltText"
        />
        <q-badge
          v-if="adult.manager"
          data-test="crown"
          class="adult-list-item-crown"
          color="transparent"
          text-color="yellow-8"
          floating
          rounded
        >
          <q-icon name="fa-solid fa-crown" />
        </q-badge>
      </q-avatar>
    </q-btn>
    <span data-test="relation">{{ adult.relation }}</span>
  </div>
</template>

<style lang="sass">
.adult-list-item
  display: flex
  flex-direction: column
  align-items: center

  &-crown
    right: 10px
    top: -10px
    font-size: 8px

  &-img
    font-size: 18px
    text-color: black
    line-height: 48px
    text-align: center
    display: flex
    align-items: center
    justify-content: center
    &:hover
      filter: brightness(1.05)
</style>
