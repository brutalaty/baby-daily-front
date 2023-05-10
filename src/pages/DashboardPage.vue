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
    <DashboardError
      data-test="dashboard-loading-error"
      v-if="familiesStore.hasError"
    />
    <DashboardSkeleton
      data-test="dashboard-loading"
      v-if="familiesStore.isLoading"
    />
    <div v-else>content</div>
  </q-page>
</template>

<style lang="sass"></style>
