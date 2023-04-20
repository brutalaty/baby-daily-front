<template>
  <q-page class="row items-center justify-evenly">
    <AdultList :adults="adults" />
  </q-page>
</template>

<script setup lang="ts">
//setup unit
import AdultList from 'src/components/dashboard/AdultList.vue';
import testData from 'src/components/dashboard/mock/Adults';

import { ref } from 'vue';

const adults = ref(testData);
</script>
