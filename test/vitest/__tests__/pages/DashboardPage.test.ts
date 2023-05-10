import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { PiniaPlugin, StoreGeneric } from 'pinia';
import { useFamiliesStore } from 'src/stores/families-store';
import { families } from 'src/data/Families';

import DashboardPageVue from 'src/pages/DashboardPage.vue';

function mountDashboardPage(plugins: PiniaPlugin[]): VueWrapper {
  return mount(DashboardPageVue, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
          plugins: [...plugins],
        }),
      ],
    },
  });
}

const stubDownloadFamiliesPlugin = ({ store }) => {
  const spy = vi.fn();
  const { downloadFamilies } = store.downloadFamilies;
  store.downloadFamilies = spy;
  spy.mockImplementation(downloadFamilies);
};

describe('Dashboard Page', () => {
  let wrapper: VueWrapper;
  let familiesStore: StoreGeneric;

  beforeEach(() => {
    const piniaPlugins = [stubDownloadFamiliesPlugin];
    wrapper = mountDashboardPage(piniaPlugins);
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

  describe('loading', () => {
    describe('when mounted', () => {
      it('downloads families', async () => {
        expect(familiesStore.downloadFamilies).toHaveBeenCalledOnce();
      });
    });

    describe('while loading', () => {
      it('shows loading', async () => {
        familiesStore.setLoadingOn();
        await nextTick();

        expect(findLoading().exists()).toBe(true);
      });

      it('does not show content', async () => {
        familiesStore.setLoadingOn();
        await nextTick();

        expect(findContent().exists()).toBe(false);
      });
    });

    describe('if loading is complete', () => {
      it('shows content', async () => {
        familiesStore.setLoadingOff();
        await nextTick();

        expect(findContent().exists()).toBe(true);
      });

      it('does not show loading', async () => {
        familiesStore.setLoadingOff();
        await nextTick();

        expect(findLoading().exists()).toBe(false);
      });

      describe('if there was an error loading', () => {
        it('shows the error', async () => {
          familiesStore.setErrorOn();
          await nextTick();

          expect(findError().exists()).toBe(true);
        });

        it('does not show content', async () => {
          familiesStore.setErrorOn();
          await nextTick();

          expect(findContent().exists()).toBe(false);
        });
      });

      describe('if there was no error loading', () => {
        it.only('does not show the error', async () => {
          familiesStore.setErrorOff();
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
