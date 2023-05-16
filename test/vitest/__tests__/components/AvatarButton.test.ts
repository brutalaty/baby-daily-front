import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';

import AvatarButton from 'src/components/AvatarButton.vue';

const BUTTON = '[data-test="avatar-button"]';
const IMAGE = '[data-test="avatar-button-image"]';

describe('Avatar Button', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    createComponent();
  });

  const createComponent = (options: object = {}) =>
    (wrapper = shallowMount(AvatarButton, {
      props: {
        src: 'test address',
        alt: 'T A',
      },
      ...options,
    }));

  const findButton = () => wrapper.find(BUTTON);
  const findImage = () => wrapper.find(IMAGE);

  describe('src prop', () => {
    it('is required', () => {
      expect(AvatarButton.props.src.required).toBe(true);
    });
  });

  describe('alt prop', () => {
    it('is required', () => {
      expect(AvatarButton.props.alt.required).toBe(true);
    });
  });

  describe('button', () => {
    describe('when clicked', () => {
      it('emits a click event', async () => {
        await findButton().trigger('click');

        expect(wrapper.emitted().click).toHaveLength(1);
      });
    });
  });

  describe('image', () => {
    it('renders', () => {
      expect(findImage().attributes('src')).toEqual('test address');
    });

    it('displays alt text', () => {
      expect(findImage().attributes('alt')).toBe('T A');
    });
  });

  describe('default slot', () => {
    beforeEach(() => {
      createComponent({
        slots: { default: '<div>Awesome Badge</div>' },
      });
    });

    it('renders', () => {
      expect(wrapper.text()).toContain('Awesome Badge');
    });
  });
});
