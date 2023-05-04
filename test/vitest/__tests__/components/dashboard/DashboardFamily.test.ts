import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';

import DashboardFamilyVue from 'src/components/dashboard/DashboardFamily.vue';
import AdultListVue from 'src/components/dashboard/AdultList.vue';
import ChildListVue from 'src/components/dashboard/ChildList.vue';
import { family } from 'test/vitest/data/Families';

describe('When given a Family', () => {
  let wrapper: VueWrapper;

  const createComponent = (options: object = {}) => {
    wrapper = mount(DashboardFamilyVue, {
      props: { family: family },
      ...options,
    });
  };

  const findHeading = () => wrapper.find('[data-test="family-heading"]');
  const findAdultList = () => wrapper.findComponent(AdultListVue);
  const findChildList = () => wrapper.findComponent(ChildListVue);

  it('requires a family', () => {
    expect(DashboardFamilyVue.props.family.required).toBe(true);
  });

  it('Displays the families name', () => {
    createComponent();

    expect(findHeading().exists()).toBe(true);
    expect(findHeading().text()).toBe(family.name);
  });

  it('Displays Adults', () => {
    createComponent();

    expect(findAdultList().exists()).toBe(true);
    expect(wrapper.html()).contains(family.adults[0].relation);
  });

  it('Displays Children', () => {
    createComponent();

    expect(findChildList().exists()).toBe(true);
  });

  it.todo('Display shows the active invitations');
});

describe('when an Adult is selected', () => {
  it.todo('navigates to that adults page');
});

describe('when a Child is selected', () => {
  it.todo('navigates to that childs page');
});

describe("DashboardFamily's manager prop", () => {
  let wrapper: VueWrapper;

  const createComponent = (manager: boolean) => {
    wrapper = mount(DashboardFamilyVue, {
      props: {
        family: family,
        manager: manager,
      },
    });
  };

  const findChildButton = () => wrapper.find('[data-test="add-child-button"]');

  it('defaults to false', () => {
    expect(DashboardFamilyVue.props.manager.default).toBe(false);
  });

  it('Shows an Add Child button if true', () => {
    createComponent(true);

    expect(findChildButton().exists()).toBe(true);
  });
  it.todo('Shows an Invite Adult button if true');
  it.todo('routes to the add child page when the add child button is clicked');
  it.todo('routes to the invite page when the invite adult button is clicked');
  it.todo('Does not show the Add Child button if false');
  it.todo('Does not shows the Invite Adult button if false');
});
