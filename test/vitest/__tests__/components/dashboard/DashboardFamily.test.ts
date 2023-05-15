import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import DashboardFamilyVue from 'src/components/dashboard/DashboardFamily.vue';
import { family } from 'src/data/Families';

const ADULT_LIST_COMPONENT = '[data-test="adult-list"]';
const CHILD_LIST_COMPONENT = '[data-test="child-list"]';
const ADD_CHILD_BUTTON = '[data-test="add-child-button"]';
const INVITE_ADULT_BUTTON = '[data-test="invite-adult-button"]';
const FAMILY_HEADING = '[data-test="family-heading"]';

describe('Dashboard Family', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    createComponent();
  });

  const createComponent = (manager = false) => {
    wrapper = shallowMount(DashboardFamilyVue, {
      props: {
        family: family,
        manager: manager,
      },
    });
  };

  const findAddChildButton = () => wrapper.find(ADD_CHILD_BUTTON);
  const findInviteAdultButton = () => wrapper.find(INVITE_ADULT_BUTTON);
  const findHeading = () => wrapper.find(FAMILY_HEADING);
  const findAdultList = () => wrapper.findComponent(ADULT_LIST_COMPONENT);
  const findChildList = () => wrapper.findComponent(CHILD_LIST_COMPONENT);
  const getAdultList = () => wrapper.getComponent(ADULT_LIST_COMPONENT);
  const getChildList = () => wrapper.getComponent(CHILD_LIST_COMPONENT);
  const getAddChildButton = () => wrapper.get(ADD_CHILD_BUTTON);
  const getInviteAdultButton = () => wrapper.get(INVITE_ADULT_BUTTON);

  describe('manager prop', () => {
    it('defaults to false', () => {
      expect(DashboardFamilyVue.props.manager.default).toBe(false);
    });

    describe('when manager is set to true', () => {
      beforeEach(() => createComponent(true));
      it('Shows an Add Child button', () => {
        expect(findAddChildButton().exists()).toBe(true);
      });

      it('Shows an Invite Adult button', () => {
        expect(findInviteAdultButton().exists()).toBe(true);
      });
    });

    describe('when manager is set to false', () => {
      beforeEach(() => createComponent(false));
      it('Does not show the Add Child button', () => {
        expect(findAddChildButton().exists()).toBe(false);
      });

      it('Does not show the Invite Adult button', () => {
        expect(findInviteAdultButton().exists()).toBe(false);
      });
    });
  });

  describe('Family prop', () => {
    it('requires a family', () => {
      expect(DashboardFamilyVue.props.family.required).toBe(true);
    });

    it('Displays the families name', () => {
      expect(findHeading().exists()).toBe(true);
      expect(findHeading().text()).toBe(family.name);
    });

    it('Displays Adults', () => {
      expect(findAdultList().exists()).toBe(true);
    });

    it('Displays Children', () => {
      expect(findChildList().exists()).toBe(true);
    });

    it.todo('Display shows the active invitations');
  });

  describe('Buttons', () => {
    beforeEach(() => {
      createComponent(true);
    });

    describe('When an adult is clicked', () => {
      it('emits an adultSelected event', () => {
        getAdultList().vm.$emit('selected', family.adults[0]);

        expect(wrapper.emitted().adultSelected[0]).toStrictEqual([
          family.adults[0],
        ]);
      });
    });

    describe('When a child is clicked', () => {
      it('emits a childSelected event', () => {
        getChildList().vm.$emit('selected', family.children[0]);

        expect(wrapper.emitted().childSelected[0]).toStrictEqual([
          family.children[0],
        ]);
      });
    });

    describe('when add child is clicked', () => {
      it('emits an createChild event when the add child is clicked', async () => {
        await getAddChildButton().trigger('click');

        expect(wrapper.emitted().createChild[0]).toStrictEqual([family]);
      });
    });

    describe('when invite adult is clicked', () => {
      it('emits an inviteAdult event', async () => {
        await getInviteAdultButton().trigger('click');

        expect(wrapper.emitted().inviteAdult[0]).toStrictEqual([family]);
      });
    });
  });
});
