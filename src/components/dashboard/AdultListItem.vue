<script setup lang="ts">
import { PropType, computed } from 'vue';
import AvatarButtonVue from '../AvatarButton.vue';
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
    <AvatarButtonVue
      data-test="adult-avatar"
      @click="handleAdultSelected"
      :src="adult.avatar"
      :alt="avatarAltText"
    >
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
    </AvatarButtonVue>

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
</style>
