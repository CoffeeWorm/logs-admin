import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export default [
  {
    path: '/index',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "index_page" */ './pages/index/index')),
  },
  {
    path: '/artcle',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "artcle_new_page" */ './pages/artcle-new')),
  },
  {
    path: '/artcle/:id',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "artcle_edit_page" */ './pages/artcle-edit')),
  },
  { path: '/', exact: true, render: () => <Redirect from="/" to="/index" /> },
  { path: '/404', component: () => <div>404</div> },
  // { path: '*', render: () => <Redirect to="/404" /> },
];
