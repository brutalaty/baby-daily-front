import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AdultListVue from 'src/components/dashboard/AdultList.vue';
import AdultListItemVue from 'src/components/dashboard/AdultListItem.vue';
import adults from 'test/vitest/data/Adults';

describe('When given a list of adults', () => {
  let wrapper: VueWrapper;

  const findAdultListItems = () => wrapper.findAllComponents(AdultListItemVue);

  const createComponent = (options: object = {}) => {
    wrapper = mount(AdultListVue, {
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

    items[0].vm.$emit('selected', 1);
    items[1].vm.$emit('selected', 2);

    expect(wrapper.emitted().selected[0]).toEqual([1]);
    expect(wrapper.emitted().selected[1]).toEqual([2]);
  });
});
