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

const emit = defineEmits<{ (e: 'selected', id: number): void }>();

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
      <img class="child-img" :src="child.avatar" />
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

  &-avatar
    cursor: pointer
    &:hover
      filter: brightness(1.1)
</style>
