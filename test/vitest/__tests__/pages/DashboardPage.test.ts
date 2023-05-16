import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { shallowMount, flushPromises, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { nextTick } from 'vue';

import { createTestingPinia } from '@pinia/testing';
import { StoreGeneric } from 'pinia';

import { getRouter } from 'vue-router-mock';

import { useFamiliesStore } from 'src/stores/families-store';
import { families } from 'src/data/Families';

import DashboardPage from 'src/pages/DashboardPage.vue';

function mountDashboardPage(): VueWrapper {
  return shallowMount(DashboardPage, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  });
}

describe('Dashboard Page', () => {
  let wrapper: VueWrapper;
  let familiesStore: StoreGeneric;

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
  const findFamilies = () =>
    wrapper.findAllComponents('[data-test="dashboard-family"]');
  const findFirstFamily = () => findFamilies()[0];

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

  describe('main section', () => {
    it('renders a create family button', () => {
      expect(findCreateFamilyButton().exists()).toBe(true);
      expect(findCreateFamilyButton().attributes('label')).toBe(
        'Create Family'
      );
    });

    describe('when clicking the Create Family button', () => {
      it('should route to the Create new Family Page', async () => {
        await findCreateFamilyButton().trigger('click');

        expect(getRouter().push).toHaveBeenCalledTimes(1);
        expect(getRouter().push).toHaveBeenCalledWith(
          expect.objectContaining({ name: 'create-family' })
        );
      });
    });
  });

  describe('families section', () => {
    it('renders the families', async () => {
      expect(familiesStore.families).toHaveLength(2);
      expect(findFamilies()).toHaveLength(2);
    });

    describe('when receiving an invite-adult event', () => {
      it('navigates to the invite adult page', async () => {
        await wrapper.vm.$router.push('/new-location?q=silly');
        const family = families[0];

        findFirstFamily().vm.$emit('invite-adult', family);

        expect(getRouter().push).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'invite-adult',
            params: { familyId: family.id },
          })
        );
      });
    });

    describe('when receiving a create-child event', () => {
      it('navigates to the create child page', () => {
        const child = families[0].children[0];

        findFirstFamily().vm.$emit('child-selected', child);

        expect(getRouter().push).toHaveBeenCalledOnce();
        expect(getRouter().push).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'child',
            params: { childId: child.id },
          })
        );
      });
    });

    describe('when receiving an adult-selected event', () => {
      it('navigates to the adult page', () => {
        const adult = families[0].adults[0];

        findFirstFamily().vm.$emit('adult-selected', adult);

        expect(getRouter().push).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'adult',
            params: {
              familyId: adult.family_id,
              adultId: adult.id,
            },
          })
        );
      });
    });

    describe('when receiving a child-selected event', () => {
      it('navigates to the childs page', () => {
        const child = families[0].children[0];

        findFirstFamily().vm.$emit('child-selected', child);

        expect(getRouter().push).toHaveBeenCalledOnce();
        expect(getRouter().push).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'child',
            params: { childId: child.id },
          })
        );
      });
    });

    describe('when receiving a create-child event', () => {
      it('navigates to the create childs page', () => {
        const family = families[0];

        findFirstFamily().vm.$emit('create-child', family);

        expect(getRouter().push).toHaveBeenCalledOnce();
        expect(getRouter().push).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'create-child',
            params: { familyId: family.id },
          })
        );
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
