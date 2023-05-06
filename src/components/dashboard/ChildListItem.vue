<script setup lang="ts">
import { PropType, computed } from 'vue';
import AvatarButtonVue from 'src/components/AvatarButton.vue';
import Child from 'src/types/Child';

const props = defineProps({
  child: {
    required: true,
    type: Object as PropType<Child>,
  },
});

const emit = defineEmits<{ (e: 'selected', child: Child): void }>();

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
  emit('selected', props.child);
}
</script>

<template>
  <div class="child-list-item">
    <!-- <q-btn @click="handleChildSelected" rounded unelevated padding="0">
      <q-avatar data-test="child-avatar" class="child-list-item-avatar">
        <img
          class="child-list-item-img"
          :src="child.avatar"
          :alt="avatarAltText"
        />
      </q-avatar>
    </q-btn> -->
    <AvatarButtonVue
      data-test="child-avatar-button"
      @click="handleChildSelected"
      :src="child.avatar"
      :alt="avatarAltText"
    />

    <div class="child-list-item-age">
      <div data-test="age-quantity" class="child-list-item-age-quantity">
        {{ ageFirstUnitOfTime.quantity }}
      </div>
      <div data-test="age-unit" class="child-list-item-age-unit">
        {{ ageFirstUnitOfTime.unit }}
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.child-list-item
  display: flex
  flex-direction: column
  align-items: center

  &-age
    margin-top: 5px
    text-align: center
    &-quantity
      margin-top: 4px
      line-height: 12px
    &-unit
      margin-top: 0px
</style>
