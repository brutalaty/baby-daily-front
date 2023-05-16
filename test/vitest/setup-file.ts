// This file will be run before each test file

/**
 * Mock router
 */
import { installRouter } from './router-mock';
import { vi } from 'vitest';

installRouter({
  spy: {
    create: (fn) => vi.fn(fn),
    reset: (spy) => spy.mockReset(),
  },
});

/**
 * Render default slots
 */
import { config } from '@vue/test-utils';
config.global.renderStubDefaultSlot = true;
