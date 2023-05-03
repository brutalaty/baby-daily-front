<script setup lang="ts">
import { PropType, computed } from 'vue';

import Child from 'src/types/Child';

const props = defineProps({
  child: {
    required: true,
    type: Object as PropType<Child>,
  },
});

const emit = defineEmits<{ (e: 'selected', id: number): void }>();

const avatarAltText = computed(() => childsInitials());

const childsInitials = () =>
  props.child.name
    .split(' ')
    .map((el) => el[0])
    .join(' ')
    .toUpperCase();

function handleChildSelected() {
  emit('selected', props.child.id);
}
</script>

<template>
  <div class="child-list-item">
    <q-avatar
      data-test="avatar"
      @clicked="handleChildSelected"
      class="child-list-item-avatar"
    >
      <img
        class="child-list-item-img"
        :src="child.avatar"
        :alt="avatarAltText"
      />
    </q-avatar>
    <span data-test="age" class="child-age">
      {{ child.age }}
    </span>
  </div>
</template>

<style lang="sass">
.child-list-item
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
