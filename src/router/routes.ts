import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/testing/UnitUnderTest.vue'),
      },
      {
        name: 'create-family',
        path: 'create-family',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'invite-adult',
        path: 'families/:family-id/invite',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'invite-adult',
        path: 'families/:family-id/invite',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'adult',
        path: 'families/:family-id/adults/:adult-id',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'child',
        path: 'children/:child-id',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'create-child',
        path: 'families/:family-id',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
