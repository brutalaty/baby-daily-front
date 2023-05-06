import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';

import AvatarButtonVue from 'src/components/AvatarButton.vue';

describe('properties', () => {
  it('requires a src', () => {
    expect(AvatarButtonVue.props.src.required).toBe(true);
  });
  it('requires altText', () => {
    expect(AvatarButtonVue.props.alt.required).toBe(true);
  });
});

describe('when mounted', () => {
  let wrapper: VueWrapper;

  const createComponent = () =>
    (wrapper = mount(AvatarButtonVue, {
      props: { src: 'test address', alt: 'T A' },
    }));

  const getButton = () => wrapper.find('[data-test="avatar-button"]');
  const getImage = () => wrapper.find('[data-test="avatar-button-image"]');

  it('emits a click event when clicked', async () => {
    createComponent();

    await getButton().trigger('click');

    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('displays an image', () => {
    createComponent();

    expect(getImage().attributes('src')).toEqual('test address');
  });

  it('displays alt text', () => {
    createComponent();

    expect(getImage().attributes('alt')).toBe('T A');
  });

  describe('slots', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
      wrapper = mount(AvatarButtonVue, {
        props: {
          src: 'test src',
          alt: 'T S',
        },
        slots: {
          default: '<div>Awesome Badge</div>',
        },
      });
    });

    it('badge slot renders', () => {
      expect(wrapper.text()).toContain('Awesome Badge');
    });
  });
});
