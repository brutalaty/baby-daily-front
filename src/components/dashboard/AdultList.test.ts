import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

//components
import AdultListVue from './AdultList.vue';
import AdultListItemVue from './AdultListItem.vue';
//types
import Adult from 'src/types/Adult';
//mock data
import adults from './mockData/Adults';

function factory(adults: Adult[]): VueWrapper {
  return mount(AdultListVue, {
    props: {
      adults: adults,
    },
  });
}

describe('AdultList', () => {
  it('should display correct number of adults', () => {
    const wrapper = factory(adults);
    const items = wrapper.findAllComponents(AdultListItemVue);

    expect(items).toHaveLength(2);
  });

  it('should re emit an adults selected event', () => {
    const wrapper = factory(adults);
    const adultItems = wrapper.findAllComponents(AdultListItemVue);

    adultItems[0].vm.handleAdultSelected(1);
    adultItems[1].vm.handleAdultSelected(2);

    expect(wrapper.emitted().selected[0]).toEqual([1]);
    expect(wrapper.emitted().selected[1]).toEqual([2]);
  });
});
