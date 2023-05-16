import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it, beforeEach } from 'vitest';

import AdultList from 'src/components/dashboard/AdultList.vue';
import adults from 'src/data/Adults';

const ADULT_ITEM = '[data-test="adult-list-item"]';

describe('Adult List', () => {
  let wrapper: VueWrapper;

  beforeEach(() => createComponent());

  const createComponent = () => {
    wrapper = shallowMount(AdultList, {
      props: {
        adults: adults,
      },
    });
  };

  const findAdultListItems = () => wrapper.findAllComponents(ADULT_ITEM);

  it('should display correct number of Adults', () => {
    expect(findAdultListItems()).toHaveLength(adults.length);
  });

  describe('when receiving a selected event', () => {
    it('emits that selected event', () => {
      const items = findAdultListItems();
      expect(wrapper.emitted().selected).toBeUndefined();

      items[0].vm.$emit('selected', adults[0]);
      items[1].vm.$emit('selected', adults[1]);

      expect(wrapper.emitted().selected[0]).toEqual([adults[0]]);
      expect(wrapper.emitted().selected[1]).toEqual([adults[1]]);
    });
  });
});
