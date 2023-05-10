<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useFamiliesStore } from 'src/stores/families-store';
import DashboardError from 'src/components/dashboard/DashboardError.vue';
import DashboardSkeleton from 'src/components/dashboard/DashboardSkeleton.vue';

const familiesStore = useFamiliesStore();

onBeforeMount(() => {
  familiesStore.downloadFamilies();
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <DashboardError v-if="familiesStore.hasError" data-test="dashboard-error" />
    <DashboardSkeleton
      v-else-if="familiesStore.isLoading"
      data-test="dashboard-loading"
    />
    <div v-else data-test="dashboard-content">content</div>
  </q-page>
</template>

<style lang="sass"></style>
