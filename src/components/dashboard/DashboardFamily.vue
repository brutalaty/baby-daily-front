<script setup lang="ts">
import { PropType } from 'vue';
import { QBtn } from 'quasar';
import AdultList from './AdultList.vue';
import ChildList from './ChildList.vue';
import Adult from 'src/types/Adult';
import Child from 'src/types/Child';

import Family from 'src/types/Family';

const props = defineProps({
  family: {
    type: Object as PropType<Family>,
    required: true,
  },
  manager: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'adultSelected', adult: Adult): void;
  (e: 'childSelected', child: Child): void;
  (e: 'createChild', family: Family): void;
  (e: 'inviteAdult', family: Family): void;
}>();

function handleAdultSelected(adult: Adult) {
  emit('adultSelected', adult);
}

function handleChildSelected(child: Child) {
  emit('childSelected', child);
}

function handleAddChildClicked() {
  emit('createChild', props.family);
}

function handleInviteAdultClicked() {
  emit('inviteAdult', props.family);
}
</script>

<template>
  <div class="dashboard-family">
    <h2 data-test="family-heading">{{ family.name }}</h2>
    <div v-if="manager">
      <QBtn data-test="add-child-button" @click="handleAddChildClicked"
        >add child</QBtn
      >
      <QBtn data-test="invite-adult-button" @click="handleInviteAdultClicked"
        >invite adult</QBtn
      >
    </div>
    <AdultList
      data-test="adult-list"
      class="dashboard-adults"
      :adults="family.adults"
      @selected="handleAdultSelected"
    />
    <ChildList
      data-test="child-list"
      class="dashboard-children"
      :children="family.children"
      @selected="handleChildSelected"
    />
  </div>
</template>

<style lang="sass">
.dashboard-family
  display: flex
  flex-direction: column
  justify-content: left

.dashboard-adults
  margin: 20px 0 10px
  padding: 20px 10px
  border-radius: 20px
  background: teal

.dashboard-children
  padding: 20px 10px
  border-radius: 20px
  background: aqua
</style>
