import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

//components
import AdultListItem from './AdultListItem.vue';
//types
import Adult from 'src/types/Adult';
//mock data
import { manager } from './mockData/Adults';
import { adult } from './mockData/Adults';

describe('When given an Adult', () => {
  let wrapper: VueWrapper;

  const getImage = () => wrapper.get('img');
  const getRelation = () => wrapper.get('[data-test="relation"]');
  const findCrown = () => wrapper.find('[data-test="crown"]');
  const getAvatar = () => wrapper.get('[data-test="avatar"]');

  const createComponent = (adult: Adult) => {
    wrapper = mount(AdultListItem, {
      props: {
        adult: adult,
      },
    });
  };

  it('should have an avatar', () => {
    createComponent(adult);

    expect(getImage().attributes('src')).toBe(adult.avatar);
  });

  it('should display the adults relation to the family', () => {
    createComponent(adult);

    expect(getRelation().text()).toBe(adult.relation);
  });

  it('shows a crown icon on a manager', () => {
    createComponent(manager);

    expect(findCrown().exists()).toBe(true);
  });

  it('has no crown icon for non managers', () => {
    createComponent(adult);

    expect(findCrown().exists()).toBe(false);
  });

  it('emits a selected event if the avatar is clicked', async () => {
    createComponent(adult);

    await getAvatar().trigger('click');

    expect(wrapper.emitted().selected[0]).toEqual([adult.id]);
  });
});
