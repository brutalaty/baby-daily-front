import { useQuasar } from 'quasar';
useQuasar();

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock';

import DashboardFamilyVue from 'src/components/dashboard/DashboardFamily.vue';
import { family } from 'src/data/Families';

describe('', () => {
  it.todo('');
});
