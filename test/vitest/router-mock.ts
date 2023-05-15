/** https://github.com/quasarframework/quasar-testing/blob/dev/packages/unit-vitest/README.md#mocking-vue-router */
import { beforeEach } from 'vitest';
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
  RouterMockOptions,
} from 'vue-router-mock';
import { config } from '@vue/test-utils';

export function installRouter(options?: RouterMockOptions) {
  beforeEach(() => {
    const router = createRouterMock(options);
    injectRouterMock(router);
  });

  config.plugins.VueWrapper.install(VueRouterMock);
}
