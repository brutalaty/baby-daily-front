import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';

import DashboardFamilyVue from 'src/components/dashboard/DashboardFamily.vue';
import AdultListVue from 'src/components/dashboard/AdultList.vue';
import ChildListVue from 'src/components/dashboard/ChildList.vue';
import { family } from 'src/data/Families';

describe('manager prop', () => {
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
  const findAdultButton = () => wrapper.find('[data-test="add-adult-button"]');

  it('defaults to false', () => {
    expect(DashboardFamilyVue.props.manager.default).toBe(false);
  });

  it('Shows an Add Child button if true', () => {
    createComponent(true);

    expect(findChildButton().exists()).toBe(true);
  });

  it('Shows an Invite Adult button if true', () => {
    createComponent(true);

    expect(findAdultButton().exists()).toBe(true);
  });

  it('Does not show the Add Child button if false', () => {
    createComponent(false);

    expect(findChildButton().exists()).toBe(false);
  });

  it('Does not shows the Invite Adult button if false', () => {
    createComponent(false);

    expect(findAdultButton().exists()).toBe(false);
  });
});

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

describe('DashboardFamily interactability', () => {
  it.todo('emits an adult selected event when an adult is clicked');
  it.todo('emits a child selected event when a child is clicked');
  it.todo('emits an add child event when the add child is clicked');
  it.todo('emits an invite adult event when the invite adult is clicked');
});
