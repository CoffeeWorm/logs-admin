/* eslint-disable import/prefer-default-export */
import request from '@/utils/request';

export const getArticleList = (config) => request.get('/api/articles', config);

export const getArticle = (config) => request.get('/api/article/:id', config);

export const postArticle = ({ data, ...config }) =>
  request.post('/api/article', data, config);

export const patchArticle = ({ data, ...config }) =>
  request.patch('/api/article/:id', data, config);
