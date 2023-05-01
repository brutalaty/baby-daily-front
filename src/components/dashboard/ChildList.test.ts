import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it, afterEach } from 'vitest';

//components
import ChildListVue from './ChildList.vue';
import ChildListItemVue from './ChildListItem.vue';
//mock data
import children from './mockData/Children';

describe('When given a a list of children', () => {
  let wrapper: VueWrapper;

  const findChildListItems = () => wrapper.findAllComponents(ChildListItemVue);

  const createComponent = (options: object = {}) => {
    wrapper = mount(ChildListVue, {
      props: {
        children: children,
      },
      ...options,
    });
  };

  it('dispays the correct number of ChildListItems', () => {
    createComponent();

    expect(findChildListItems()).toHaveLength(children.length);
  });

  it('should re emit any child selected events', () => {
    createComponent();
    const childItems = findChildListItems();

    childItems[0].vm.$emit('selected', children[0].id);
    childItems[1].vm.$emit('selected', children[1].id);

    expect(wrapper.emitted().selected[0]).toEqual([1]);
    expect(wrapper.emitted().selected[1]).toEqual([2]);
  });
});
