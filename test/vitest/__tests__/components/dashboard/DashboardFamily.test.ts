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

  const findAddChildButton = () =>
    wrapper.find('[data-test="add-child-button"]');
  const findInviteAdultButton = () =>
    wrapper.find('[data-test="invite-adult-button"]');

  it('defaults to false', () => {
    expect(DashboardFamilyVue.props.manager.default).toBe(false);
  });

  it('Shows an Add Child button if true', () => {
    createComponent(true);

    expect(findAddChildButton().exists()).toBe(true);
  });

  it('Shows an Invite Adult button if true', () => {
    createComponent(true);

    expect(findInviteAdultButton().exists()).toBe(true);
  });

  it('Does not show the Add Child button if false', () => {
    createComponent(false);

    expect(findAddChildButton().exists()).toBe(false);
  });

  it('Does not shows the Invite Adult button if false', () => {
    createComponent(false);

    expect(findInviteAdultButton().exists()).toBe(false);
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
  let wrapper: VueWrapper;

  const createComponent = () => {
    wrapper = mount(DashboardFamilyVue, {
      props: { family: family, manager: true },
    });
  };

  const getAdultList = () => wrapper.getComponent(AdultListVue);
  const getChildList = () => wrapper.getComponent(ChildListVue);
  const getAddChildButton = () => wrapper.get('[data-test="add-child-button"]');
  const getInviteAdultButton = () =>
    wrapper.get('[data-test="invite-adult-button"]');

  it('emits an adultSelected event when an adult is clicked', () => {
    createComponent();

    getAdultList().vm.$emit('selected', family.adults[0]);

    expect(wrapper.emitted().adultSelected[0]).toStrictEqual([
      family.adults[0],
    ]);
  });

  it('emits a childSelected event when a child is clicked', () => {
    createComponent();

    getChildList().vm.$emit('selected', family.children[0]);

    expect(wrapper.emitted().childSelected[0]).toStrictEqual([
      family.children[0],
    ]);
  });

  it('emits an addChild event when the add child is clicked', async () => {
    createComponent();

    await getAddChildButton().trigger('click');

    expect(wrapper.emitted().addChild[0]).toStrictEqual([family]);
  });

  it('emits an inviteAdult event when the invite adult is clicked', async () => {
    createComponent();

    await getInviteAdultButton().trigger('click');

    expect(wrapper.emitted().inviteAdult[0]).toStrictEqual([family]);
  });
});
