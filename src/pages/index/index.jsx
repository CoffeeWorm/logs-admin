import React from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import ArticleList from './components/ArticleList';
import NewArticleJumper from './components/NewArticleJumper';

export default () => (
  <BasicLayout>
    <ArticleList />
    <NewArticleJumper />
  </BasicLayout>
);
