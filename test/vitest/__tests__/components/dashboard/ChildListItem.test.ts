import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import ChildListItem from 'src/components/dashboard/ChildListItem.vue';
import { child } from 'src/data/Children';

describe('When given a child property', () => {
  let wrapper: VueWrapper;

  const getImage = () => wrapper.get('img');
  const getAgeQuantity = () => wrapper.get('[data-test="age-quantity"]');
  const getAgeUnitOfTime = () => wrapper.get('[data-test="age-unit"]');
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

  it('should show the childs initials as alt text for the avatar', () => {
    createComponent();

    expect(child.name).toEqual('Amiya Boss');
    expect(getImage().attributes('alt')).toEqual('A B');
  });

  it('should show the childs age to one unit of measurement', () => {
    createComponent();

    expect(child.age).toEqual('2 years 4 months');

    expect(wrapper.html()).not.toContain('months');
    expect(getAgeQuantity().text()).toBe('2');
    expect(getAgeUnitOfTime().text()).toBe('years');
  });

  it('emits a selected event if its avatar is clicked', async () => {
    createComponent();

    await getAvatar().trigger('clicked');

    expect(wrapper.emitted().selected[0]).toEqual([child.id]);
  });
});
