import React from 'react';
import { withRouter } from 'react-router-dom';
import cls from 'classnames';
import Nav from '@@/Nav';
import menu from '@/config/nav';
import './style.less';

function BasicLayout({ className, children, history }) {
  return (
    <div className={cls('layout-basic', className)}>
      <header className="layout-basic-header">
        <Nav
          className="nav"
          menu={menu}
          onClick={({ key }) => history.push(key)}
        />
      </header>
      <section className="layout-basic-content">{children}</section>
    </div>
  );
}
export default withRouter(BasicLayout);
