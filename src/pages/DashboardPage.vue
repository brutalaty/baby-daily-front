<script setup lang="ts">
import { ref } from 'vue';
import DashboardFamilyVue from 'src/components/dashboard/DashboardFamily.vue';
import { families as familiesTestData } from 'src/data/Families';

const families = ref(familiesTestData);
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <DashboardFamilyVue
      manager
      v-for="family in families"
      :family="family"
      :key="family.id"
    />
  </q-page>
</template>

<style lang="sass"></style>
