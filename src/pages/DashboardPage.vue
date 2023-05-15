<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useFamiliesStore } from 'src/stores/families-store';
import DashboardError from 'src/components/dashboard/DashboardError.vue';
import DashboardSkeleton from 'src/components/dashboard/DashboardSkeleton.vue';
import DashboardFamily from 'src/components/dashboard/DashboardFamily.vue';
import { useRouter, Router } from 'vue-router';
import Family from 'src/types/Family';
import Adult from 'src/types/Adult';
import Child from 'src/types/Child';

const familiesStore = useFamiliesStore();
const { families, isLoading, hasError } = storeToRefs(familiesStore);

const router: Router = useRouter();

function handleCreateFamily() {
  router.push({ name: 'create-family' });
}

function handleInviteAdult(family: Family) {
  router.push({ name: 'invite-adult', params: { familyId: family.id } });
}

function handleAdultSelected(adult: Adult) {
  router.push({
    name: 'adult',
    params: { familyId: adult.family_id, adultId: adult.id },
  });
}

function handleAddChild(family: Family) {
  router.push({ name: 'create-child', params: { familyId: family.id } });
}

function handleChildSelected(child: Child) {
  router.push({
    name: 'child',
    params: { childId: child.id },
  });
}

onBeforeMount(() => {
  familiesStore.downloadFamilies();
});
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <DashboardError v-if="hasError" data-test="dashboard-error" />
    <DashboardSkeleton v-else-if="isLoading" data-test="dashboard-loading" />
    <div v-else data-test="dashboard-content">
      <q-btn
        data-test="create-family-button"
        label="Create Family"
        @click="handleCreateFamily"
      />
      <DashboardFamily
        v-for="family in families"
        :key="family.id"
        data-test="dashboard-family"
        :family="family"
        :manager="false"
        @invite-adult="handleInviteAdult"
        @create-child="handleAddChild"
        @adult-selected="handleAdultSelected"
        @child-selected="handleChildSelected"
      />
    </div>
  </q-page>
</template>

<style lang="sass"></style>
