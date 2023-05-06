<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

function handleClick() {
  emit('click');
}
</script>

<template>
  <q-btn
    data-test="avatar-button"
    @click="handleClick"
    rounded
    unelevated
    padding="0"
  >
    <q-avatar>
      <img
        data-test="avatar-button-image"
        class="avatar-button-img"
        :src="src"
        :alt="alt"
      />
      <slot></slot>
    </q-avatar>
  </q-btn>
</template>

<style lang="sass">
.avatar-button-img
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
