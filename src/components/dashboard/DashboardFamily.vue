<script setup lang="ts">
import { PropType } from 'vue';
import { QBtn } from 'quasar';
import AdultListVue from './AdultList.vue';
import ChildListVue from './ChildList.vue';

import Family from 'src/types/Family';

defineProps({
  family: {
    type: Object as PropType<Family>,
    required: true,
  },
  manager: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="dashboard-family">
    <h2 data-test="family-heading">{{ family.name }}</h2>
    <div v-if="manager">
      <QBtn data-test="add-child-button">add child</QBtn>
      <QBtn data-test="add-adult-button">add adult</QBtn>
    </div>
    <AdultListVue class="dashboard-adults" :adults="family.adults" />
    <ChildListVue class="dashboard-children" :children="family.children" />
  </div>
</template>

<style lang="sass">
.dashboard-family
  display: flex
  flex-direction: column
  justify-content: left
</style>
