import { installQuasar } from '@quasar/quasar-app-extension-testing-unit-vitest';
installQuasar();
import { describe, it, expect } from 'vitest';

import { useHasError } from 'src/composables/haserror';

describe('useHasError', () => {
  it('defaults hasError to flase', () => {
    const { hasError } = useHasError();
    expect(hasError.value).toBe(false);
  });

  describe('setErrorOn()', () => {
    it('sets hasError to true', () => {
      const { hasError, setErrorOn } = useHasError();
      expect(hasError.value).toBe(false);

      setErrorOn();

      expect(hasError.value).toBe(true);
    });
  });

  describe('setErrorOff()', () => {
    it('sets hasError to true', () => {
      const { hasError, setErrorOff, setErrorOn } = useHasError();
      setErrorOn();
      expect(hasError.value).toBe(true);

      setErrorOff();

      expect(hasError.value).toBe(false);
    });
  });
});
