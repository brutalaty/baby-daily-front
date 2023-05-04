<script setup lang="ts">
//setup unit
import ComponentUnderTested from 'src/components/dashboard/DashboardFamily.vue';
import { family as testData } from 'app/test/vitest/components/dashboard/mockData/Families';

import { ref } from 'vue';

const data = ref(testData);
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <ComponentUnderTested :family="data" />
  </q-page>
</template>
