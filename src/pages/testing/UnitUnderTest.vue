<script setup lang="ts">
//setup unit
import ComponentUnderTest from 'src/components/dashboard/DashboardFamily.vue';
import PageUnderTest from 'src/pages/DashboardPage.vue';
import { family as testData } from 'src/data/Families';

import { ref } from 'vue';

const data = ref(testData);
</script>

<template>
  <!-- Pages -->
  <PageUnderTest />

  <!-- Components -->
  <!-- <q-page class="row items-center justify-evenly">
    <ComponentUnderTest :family="data" manager />
  </q-page> -->
</template>
