import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

import AdultListItem from 'src/components/dashboard/AdultListItem.vue';
import Adult from 'src/types/Adult';
import { manager, adult } from 'src/data/Adults';

const RELATION = '[data-test="relation"]';
const CROWN = '[data-test="crown"]';
const AVATAR = '[data-test="adult-avatar"]';

describe('Adult List Item', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    createComponent();
  });

  const createComponent = (adultProp: Adult = adult) => {
    wrapper = shallowMount(AdultListItem, {
      props: {
        adult: adultProp,
      },
    });
  };

  const getRelation = () => wrapper.get(RELATION);
  const findCrown = () => wrapper.find(CROWN);
  const findAvatar = () => wrapper.find(AVATAR);

  describe('adult prop', () => {
    it('is required', () => {
      expect(AdultListItem.props.adult.required).toBe(true);
    });
  });

  describe('avatar', () => {
    it('renders', () => {
      expect(findAvatar().exists()).toBe(true);
    });

    describe('when the avatar is clicked', () => {
      it('emits a selected event', async () => {
        await findAvatar().trigger('click');

        expect(wrapper.emitted().selected[0]).toEqual([adult]);
      });
    });
  });

  describe('the adults relation to the children', () => {
    it('renders', () => {
      expect(getRelation().text()).toBe(adult.relation);
    });
  });

  describe('managers crown', () => {
    describe('when the adult is the families manager', () => {
      it('shows a crown icon', () => {
        createComponent(manager);

        expect(findCrown().exists()).toBe(true);
      });
    });

    describe('when the adult is not the manager', () => {
      it('does not show a crown', () => {
        expect(findCrown().exists()).toBe(false);
      });
    });
  });
});
