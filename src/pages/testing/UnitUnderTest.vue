<template>
  <q-page class="row items-center justify-evenly">
    <ChildListItem :child="child" />
  </q-page>
</template>

<script setup lang="ts">
//setup unit
import ChildListItem from 'src/components/dashboard/ChildListItem.vue';
import { child as testData } from 'src/components/dashboard/mock/Children';

import { ref } from 'vue';

const child = ref(testData);
</script>
