<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useFamiliesStore } from 'src/stores/families-store';
import DashboardError from 'src/components/dashboard/DashboardError.vue';
import DashboardSkeleton from 'src/components/dashboard/DashboardSkeleton.vue';
import DashboardFamily from 'src/components/dashboard/DashboardFamily.vue';

const familiesStore = useFamiliesStore();

const { families, isLoading, hasError } = storeToRefs(familiesStore);

onBeforeMount(() => {
  familiesStore.downloadFamilies();
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <DashboardError v-if="hasError" data-test="dashboard-error" />
    <DashboardSkeleton v-else-if="isLoading" data-test="dashboard-loading" />
    <div v-else data-test="dashboard-content">
      <q-btn data-test="create-family-button" label="Create Family" />
      <DashboardFamily
        v-for="family in families"
        :key="family.id"
        data-test="dashboard-family"
        :family="family"
        :manager="false"
      />
    </div>
  </q-page>
</template>

<style lang="sass"></style>
