import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import {
  shallowMount,
  flushPromises,
  VueWrapper,
  config,
} from '@vue/test-utils';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { StoreGeneric } from 'pinia';

import { useFamiliesStore } from 'src/stores/families-store';
import { families } from 'src/data/Families';

import DashboardPageVue from 'src/pages/DashboardPage.vue';

function mountDashboardPage(): VueWrapper {
  return shallowMount(DashboardPageVue, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
      // stubs: {
      //   QPage: false,
      // },
    },
  });
}

describe('Dashboard Page', () => {
  let wrapper: VueWrapper;
  let familiesStore: StoreGeneric;

  beforeAll(() => {
    config.global.renderStubDefaultSlot = true;
  });
  afterAll(() => {
    config.global.renderStubDefaultSlot = true;
  });

  beforeEach(() => {
    wrapper = mountDashboardPage();
    familiesStore = useFamiliesStore();
    familiesStore.families = families;
  });

  afterEach(async () => {
    await flushPromises();
    vi.restoreAllMocks();
  });

  const findContent = () => wrapper.find('[data-test="dashboard-content"]');
  const findLoading = () => wrapper.find('[data-test="dashboard-loading"]');
  const findError = () => wrapper.find('[data-test="dashboard-error"]');
  const findCreateFamilyButton = () =>
    wrapper.find('[data-test="create-family-button"]');
  const findFamilies = () => wrapper.findAll('[data-test="dashboard-family"]');

  describe('loading', () => {
    describe('when mounted', () => {
      it('downloads families', async () => {
        expect(familiesStore.downloadFamilies).toHaveBeenCalledOnce();
      });
    });

    describe('while loading', () => {
      it('shows loading', async () => {
        familiesStore.isLoading = true;
        await nextTick();

        expect(findLoading().exists()).toBe(true);
      });

      it('does not show content', async () => {
        familiesStore.isLoading = true;
        await nextTick();

        expect(findContent().exists()).toBe(false);
      });
    });

    describe('if loading is complete', () => {
      it('shows content', async () => {
        familiesStore.isLoading = false;
        await nextTick();

        expect(findContent().exists()).toBe(true);
      });

      it('does not show loading', async () => {
        familiesStore.isLoading = false;
        await nextTick();

        expect(findLoading().exists()).toBe(false);
      });

      describe('if there was an error loading', () => {
        it('shows the error', async () => {
          familiesStore.hasError = true;
          await nextTick();

          expect(findError().exists()).toBe(true);
        });

        it('does not show content', async () => {
          familiesStore.hasError = true;
          await nextTick();

          expect(findContent().exists()).toBe(false);
        });
      });

      describe('if there was no error loading', () => {
        it('does not show the error', async () => {
          familiesStore.hasError = false;
          await nextTick();

          expect(findError().exists()).toBe(false);
        });
      });
    });
  });

  describe('The Dashboard Page testing suite', () => {
    it('mocks the action familiesStore.downloadFamilies', () => {
      expect(familiesStore.downloadFamilies).toHaveBeenCalledOnce();
      expect(familiesStore.isLoading).toBe(false);
    });

    it('mock fills the getter familiesStore.families with data', () => {
      expect(familiesStore.families).toBe(families);
    });
  });
});
