import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect } from 'vitest';

import { useIsLoading } from 'src/composables/isloading';

describe('useLoading', () => {
  it('defaults isLoading to false', () => {
    const { isLoading } = useIsLoading();
    expect(isLoading.value).toBe(false);
  });

  describe('setErrorOn()', () => {
    it('sets isLoading to true', () => {
      const { isLoading, setLoadingOn } = useIsLoading();
      expect(isLoading.value).toBe(false);

      setLoadingOn();

      expect(isLoading.value).toBe(true);
    });
  });

  describe('setErrorOff()', () => {
    it('sets isLoading to true', () => {
      const { isLoading, setLoadingOff, setLoadingOn } = useIsLoading();
      setLoadingOn();
      expect(isLoading.value).toBe(true);

      setLoadingOff();

      expect(isLoading.value).toBe(false);
    });
  });
});
