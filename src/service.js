/* eslint-disable import/prefer-default-export */
import request from '@/utils/request';

export const getArticleList = (config) => request.get('', config);

export const getArticle = (config) => request.get('', config);

export const postArticle = ({ data, ...config }) =>
  request.post('', data, config);
