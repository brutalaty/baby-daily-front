import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { mount, flushPromises, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { StoreGeneric } from 'pinia';
import { useFamiliesStore } from 'src/stores/families-store';
import { families } from 'src/data/Families';

import DashboardPageVue from 'src/pages/DashboardPage.vue';

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
    wrapper = mount(DashboardPageVue, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            plugins: [stubDownloadFamiliesPlugin],
          }),
        ],
      },
    });

    familiesStore = useFamiliesStore();
    familiesStore.families = families;
  });

  afterEach(async () => {
    await flushPromises();
    vi.restoreAllMocks();
  });

  const findLoading = () => wrapper.find('[data-test="dashboard-loading"]');
  const findError = () => wrapper.find('[data-test="dashboard-loading-error"]');

  describe('Dashboard Page test suite, when setup correctly', () => {
    it('mocks the action familiesStore.downloadFamilies', () => {
      expect(familiesStore.downloadFamilies).toHaveBeenCalledOnce();
      expect(familiesStore.isLoading).toBe(false);
    });

    it('mock fills the getter familiesStore.families with data', () => {
      expect(familiesStore.families).toBe(families);
    });
  });

  describe('when mounted', () => {
    it('downloads families', async () => {
      expect(familiesStore.downloadFamilies).toHaveBeenCalledOnce();
    });
  });

  describe('isLoading', () => {
    it('shows loading if isLoading is true', async () => {
      familiesStore.setLoadingOn();
      await nextTick();

      expect(findLoading().exists()).toBe(true);
    });

    it('does not show loading if isLoading is false', async () => {
      familiesStore.setLoadingOff();
      await nextTick();

      expect(findLoading().exists()).toBe(false);
    });
  });

  describe('hasError', () => {
    it('shows error if hasError is true', async () => {
      familiesStore.setErrorOn();
      await nextTick();

      expect(findError().exists()).toBe(true);
    });

    it('shows error even if isLoading is also true', async () => {
      familiesStore.setErrorOn();
      familiesStore.setLoadingOn();
      await nextTick();

      expect(findError().exists()).toBe(true);
    });

    it('does not show error if hasError is false', async () => {
      familiesStore.setErrorOff();
      await nextTick();

      expect(findError().exists()).toBe(false);
    });
  });
});
