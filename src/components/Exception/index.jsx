import React from 'react';
import cls from 'classnames';
import './style.less';

export const NotFound = Symbol('404-not-found');
const TipsMap = { [NotFound]: '页面不见了~' };

export default ({ className, type }) => (
  <div className={cls('u-exception', className)}>{TipsMap[type]}</div>
);
