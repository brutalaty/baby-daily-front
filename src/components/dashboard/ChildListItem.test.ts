import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

//components
import ChildListItem from './ChildListItem.vue';
//types
import Child from 'src/types/Child';
//mock data
import { child as baby } from './mockData/Children';

function factory(child: Child): VueWrapper {
  return mount(ChildListItem, {
    props: {
      child: child,
    },
  });
}

describe('When given a child property', () => {
  it('should show an avatar', () => {
    const wrapper = factory(baby);
    const image = wrapper.get('img');

    expect(image.attributes('src')).toBe(baby.avatar);
  });

  it('should show the childs age', () => {
    const wrapper = factory(baby);
    const age = wrapper.get('[data-test="age"]');

    expect(age.text()).toBe(baby.age);
  });

  it('emits selected event if its avatar is clicked', async () => {
    const wrapper = factory(baby);
    const avatar = wrapper.get('[data-test="avatar"]');

    await avatar.trigger('clicked');

    expect(wrapper.emitted().selected[0]).toEqual([baby.id]);
  });
});
