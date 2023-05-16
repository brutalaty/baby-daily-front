import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ChildList from 'src/components/dashboard/ChildList.vue';
import children from 'src/data/Children';

describe('When given a a list of children', () => {
  let wrapper: VueWrapper;

  const findChildListItems = () =>
    wrapper.findAllComponents('[data-test="child-item"]');

  const createComponent = () => {
    wrapper = shallowMount(ChildList, {
      props: {
        children: children,
      },
    });
  };

  it('dispays the correct number of ChildListItems', () => {
    createComponent();

    expect(findChildListItems()).toHaveLength(children.length);
  });

  it('should re emit any childs selected events', () => {
    createComponent();
    const childItems = findChildListItems();

    childItems[0].vm.$emit('selected', children[0]);
    childItems[1].vm.$emit('selected', children[1]);

    expect(wrapper.emitted().selected[0]).toStrictEqual([children[0]]);
    expect(wrapper.emitted().selected[1]).toStrictEqual([children[1]]);
  });
});
