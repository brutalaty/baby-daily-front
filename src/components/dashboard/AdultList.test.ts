import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

//components
import AdultList from './AdultList.vue';
import AdultListItem from './AdultListItem.vue';
//types
import Adult from 'src/types/Adult';
//mock data
import adults from './mock/Adults';

function factory(adults: Adult[]): VueWrapper {
  return mount(AdultList, {
    props: {
      adults: adults,
    },
  });
}

describe('AdultList', () => {
  it('should display correct number of items', () => {
    const wrapper: VueWrapper = factory(adults);

    expect(wrapper.findAllComponents(AdultListItem)).toHaveLength(2);
  });
});
