import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it, beforeEach } from 'vitest';

import ChildListItem from 'src/components/dashboard/ChildListItem.vue';
import { child } from 'src/data/Children';

const AVATAR_BUTTON = '[data-test="child-avatar-button"]';
const AGE_QUANTITY = '[data-test="age-quantity"]';
const AGE_UNIT_OF_TIME = '[data-test="age-unit"]';

describe('Child List Item', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    createComponent();
  });

  const createComponent = () => {
    wrapper = shallowMount(ChildListItem, {
      props: {
        child: child,
      },
    });
  };

  const getAgeQuantity = () => wrapper.get(AGE_QUANTITY);
  const getAgeUnitOfTime = () => wrapper.get(AGE_UNIT_OF_TIME);
  const getAvatarButton = () => wrapper.find(AVATAR_BUTTON);

  describe('child prop', () => {
    it('is required', () => {
      expect(ChildListItem.props.child.required).toBe(true);
    });
  });

  describe('avatar', () => {
    it('renders', () => {
      expect(getAvatarButton().exists()).toBe(true);
    });

    describe('when clicked', () => {
      it('emits a selected event', async () => {
        await getAvatarButton().trigger('click');

        expect(wrapper.emitted().selected[0]).toEqual([child]);
      });
    });
  });

  describe('age section', () => {
    it('Shows the childs age to one unit of measurement', () => {
      expect(child.age).toEqual('2 years 4 months');

      expect(wrapper.html()).not.toContain('months');
      expect(getAgeQuantity().text()).toBe('2');
      expect(getAgeUnitOfTime().text()).toBe('years');
    });
  });
});
