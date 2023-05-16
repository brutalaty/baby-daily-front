import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AdultList from 'src/components/dashboard/AdultList.vue';
import adults from 'src/data/Adults';

describe('When given a list of adults', () => {
  let wrapper: VueWrapper;

  const findAdultListItems = () =>
    wrapper.findAllComponents('[data-test="adult-list-item"]');

  const createComponent = (options: object = {}) => {
    wrapper = shallowMount(AdultList, {
      props: {
        adults: adults,
      },
      ...options,
    });
  };

  it('should display correct number of AdultListItems', () => {
    createComponent();
    expect(findAdultListItems()).toHaveLength(2);
  });

  it('should re emit an adults selected event', () => {
    createComponent();
    const items = findAdultListItems();

    expect(wrapper.emitted().selected).toBeUndefined();

    items[0].vm.$emit('selected', adults[0]);
    items[1].vm.$emit('selected', adults[1]);

    expect(wrapper.emitted().selected[0]).toEqual([adults[0]]);
    expect(wrapper.emitted().selected[1]).toEqual([adults[1]]);
  });
});
