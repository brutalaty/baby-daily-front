import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect } from 'vitest';

import { useLoading, useError } from 'src/composables/apiFetchState';

describe('useError', () => {
  it('defaults hasError to flase', () => {
    const { hasError } = useError();
    expect(hasError.value).toBe(false);
  });

  describe('setErrorOn()', () => {
    it('sets hasError to true', () => {
      const { hasError, setErrorOn } = useError();
      expect(hasError.value).toBe(false);

      setErrorOn();

      expect(hasError.value).toBe(true);
    });
  });

  describe('setErrorOff()', () => {
    it('sets hasError to true', () => {
      const { hasError, setErrorOff, setErrorOn } = useError();
      setErrorOn();
      expect(hasError.value).toBe(true);

      setErrorOff();

      expect(hasError.value).toBe(false);
    });
  });
});

describe('useLoading', () => {
  it('defaults isLoading to false', () => {
    const { isLoading } = useLoading();
    expect(isLoading.value).toBe(false);
  });

  describe('setErrorOn()', () => {
    it('sets isLoading to true', () => {
      const { isLoading, setLoadingOn } = useLoading();
      expect(isLoading.value).toBe(false);

      setLoadingOn();

      expect(isLoading.value).toBe(true);
    });
  });

  describe('setErrorOff()', () => {
    it('sets isLoading to true', () => {
      const { isLoading, setLoadingOff, setLoadingOn } = useLoading();
      setLoadingOn();
      expect(isLoading.value).toBe(true);

      setLoadingOff();

      expect(isLoading.value).toBe(false);
    });
  });
});
