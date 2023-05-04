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

//Age
interface UnitOfTime {
  quantity: string;
  unit: string;
}

const ageFirstUnitOfTime = computed((): UnitOfTime => {
  const firstUnit = props.child.age.split(' ').slice(0, 2);
  return {
    quantity: firstUnit[0],
    unit: firstUnit[1],
  };
});

//Avatar
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
  <div class="child">
    <q-avatar data-test="avatar" @clicked="handleChildSelected" class="avatar">
      <img class="img" :src="child.avatar" :alt="avatarAltText" />
    </q-avatar>
    <div class="age">
      <div data-test="age-quantity" class="quantity">
        {{ ageFirstUnitOfTime.quantity }}
      </div>
      <div data-test="age-unit" class="unit">
        {{ ageFirstUnitOfTime.unit }}
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.child
  display: flex
  flex-direction: column
  align-items: center
  & .img
    line-height: 48px
    text-align: center
    display: flex
    align-items: center
    justify-content: center

.avatar
    cursor: pointer
    &:hover
      filter: brightness(1.1)

.age
  margin-top: 5px
  text-align: center
  & .quantity
    margin-top: 4px
    line-height: 12px
  & .unit
    margin-top: 0px
</style>
