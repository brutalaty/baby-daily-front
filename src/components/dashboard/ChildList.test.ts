import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

//components
import ChildListVue from './ChildList.vue';
import ChildListItemVue from './ChildListItem.vue';
//types
import Child from 'src/types/Child';
//mock data
import children from './mockData/Children';

function factory(children: Child[]): VueWrapper {
  return mount(ChildListVue, { props: { children: children } });
}

describe('Child List', () => {
  it('dispays the correct number of children', () => {
    const wrapper = factory(children);
    const items = wrapper.findAllComponents(ChildListItemVue);

    expect(items).toHaveLength(children.length);
  });

  it('should re emit a childs selected event', () => {
    const wrapper = factory(children);
    const childItems = wrapper.findAllComponents(ChildListItemVue);

    childItems[0].vm.handleChildSelected(1);
    childItems[1].vm.handleChildSelected(2);

    expect(wrapper.emitted().selected[0]).toEqual([1]);
    expect(wrapper.emitted().selected[1]).toEqual([2]);
  });
});
