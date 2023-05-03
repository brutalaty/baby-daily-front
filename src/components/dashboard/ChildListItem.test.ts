import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ChildListItem from './ChildListItem.vue';
import { child } from './mockData/Children';

describe('When given a child property', () => {
  let wrapper: VueWrapper;

  const getImage = () => wrapper.get('img');
  const getAge = () => wrapper.get('[data-test="age"]');
  const getAvatar = () => wrapper.get('[data-test="avatar"]');

  const createComponent = () => {
    wrapper = mount(ChildListItem, {
      props: {
        child: child,
      },
    });
  };

  it('should show an avatar img', () => {
    createComponent();

    expect(getImage().attributes('src')).toBe(child.avatar);
  });

  it('should show the childs age', () => {
    createComponent();

    expect(getAge().text()).toBe(child.age);
  });

  it('emits a selected event if its avatar is clicked', async () => {
    createComponent();

    await getAvatar().trigger('clicked');

    expect(wrapper.emitted().selected[0]).toEqual([child.id]);
  });
});
