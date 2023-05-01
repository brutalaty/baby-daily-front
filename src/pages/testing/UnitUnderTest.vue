<script setup lang="ts">
//setup unit
import AdultList from 'src/components/dashboard/AdultList.vue';
import { default as testData } from 'src/components/dashboard/mockData/Adults';

import { ref } from 'vue';

const data = ref(testData);
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <AdultList :adults="data" />
  </q-page>
</template>
