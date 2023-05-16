import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it, beforeEach } from 'vitest';

import ChildList from 'src/components/dashboard/ChildList.vue';
import children from 'src/data/Children';

const CHILD_ITEM = '[data-test="child-item"]';

describe('Child List', () => {
  let wrapper: VueWrapper;

  beforeEach(() => createComponent());

  const createComponent = () => {
    wrapper = shallowMount(ChildList, {
      props: {
        children: children,
      },
    });
  };

  const findChildListItems = () => wrapper.findAllComponents(CHILD_ITEM);

  it('renders the correct number of children', () => {
    expect(findChildListItems()).toHaveLength(children.length);
  });

  describe('when receiving a selected event', () => {
    it('emits that selected event', () => {
      const childItems = findChildListItems();

      childItems[0].vm.$emit('selected', children[0]);
      childItems[1].vm.$emit('selected', children[1]);

      expect(wrapper.emitted().selected[0]).toStrictEqual([children[0]]);
      expect(wrapper.emitted().selected[1]).toStrictEqual([children[1]]);
    });
  });
});
