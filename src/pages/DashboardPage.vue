<script setup lang="ts">
import { ref } from 'vue';
import DashboardFamilyVue from 'src/components/dashboard/DashboardFamily.vue';
import Family from 'src/types/Family';
import Adult from 'src/types/Adult';
import Child from 'src/types/Child';
import { families as familiesTestData } from 'src/data/Families';

const families = ref(familiesTestData);

function handleAddChild(family: Family) {
  console.log(family.id);
}
function handleInviteAdult(family: Family) {
  console.log(family.id);
}
function handleChildSelected(child: Child) {
  console.log(child);
}
function handleAdultSelected(adult: Adult) {
  console.log(adult);
}
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <DashboardFamilyVue
      manager
      v-for="family in families"
      :family="family"
      :key="family.id"
      @addChild="handleAddChild"
      @inviteAdult="handleInviteAdult"
      @childSelected="handleChildSelected"
      @adultSelected="handleAdultSelected"
    />
  </q-page>
</template>

<style lang="sass"></style>
