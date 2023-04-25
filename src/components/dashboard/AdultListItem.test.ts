import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

//components
import AdultListItem from './AdultListItem.vue';
//types
import Adult from 'src/types/Adult';
//mock data
import { manager } from './mock/Adults';
import { adult } from './mock/Adults';

function factory(adult: Adult): VueWrapper {
  return mount(AdultListItem, {
    props: {
      adult: adult,
    },
  });
}

describe('Adult List Item', () => {
  it('should have an avatar', () => {
    const wrapper = factory(manager);
    const image = wrapper.get('img');

    expect(image.attributes('src')).toBe(manager.avatar);
  });

  it('should display the adults relation', () => {
    const wrapper = factory(manager);
    const relation = wrapper.get('[data-test="relation"]');

    expect(relation.text()).toBe(manager.relation);
  });

  it('shows a crown icon on a manager', () => {
    const wrapper = factory(manager);
    const crown = wrapper.find('[data-test="crown"]');

    expect(crown.exists()).toBe(true);
  });

  it('has no crown icon for non managers', () => {
    const wrapper = factory(adult);

    const crown = wrapper.find('[data-test="crown"]');

    expect(crown.exists()).toBe(false);
  });

  it('emits selected event when avatar is clicked', async () => {
    const wrapper = factory(adult);
    const avatar = wrapper.get('[data-test="avatar"]');

    await avatar.trigger('click');

    expect(wrapper.emitted().selected[0]).toEqual([adult.id]);
  });
});
