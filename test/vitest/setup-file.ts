// This file will be run before each test file
import { installRouter } from './router-mock';
import { vi } from 'vitest';

installRouter({
  spy: {
    create: (fn) => vi.fn(fn),
    reset: (spy) => spy.mockReset(),
  },
});
