import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'new', component: () => import('pages/New.vue') },
      { path: 'history', name: 'history', component: () => import('pages/History.vue') },
      { path: 'key', name: 'key', component: () => import('pages/Chave.vue') },
      { path: 'params', name: 'params', component: () => import('pages/Params.vue') },
      { path: 'pix/:id', name: 'pix', component: () => import('pages/Pix.vue') },
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
