import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export default [
  {
    path: '/index',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "index_page" */ './pages/index/index')),
  },
  {
    path: '/article',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "article_new_page" */ './pages/article-new')),
  },
  {
    path: '/article/:id',
    exact: true,
    component: lazy(() => import(/* webpackChunkName: "article_edit_page" */ './pages/article-edit')),
  },
  { path: '/', exact: true, render: () => <Redirect from="/" to="/index" /> },
  { path: '/404', component: () => <div>404</div> },
  { path: '*', render: () => <Redirect to="/404" /> },
];
