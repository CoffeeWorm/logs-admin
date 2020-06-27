import React, { Component } from 'react';
import cls from 'classnames';
import { Menu } from 'antd';

const { Item: MenuItem, SubMenu } = Menu;

class Nav extends Component {
  static defaultProps = {
    mode: 'horizontal',
  };

  state = {
    defaultSelectedKeys: [],
    defaultOpenKeys: [],
    selectedKeys: [],
    openKeys: [],
  };

  static getDetivedStateFromProps({
    defaultSelectedKeys,
    defaultOpenKeys,
    selectedKeys,
    openKeys,
  }) {
    const result = {};
    defaultSelectedKeys && (result.defaultSelectedKeys = defaultSelectedKeys);
    defaultOpenKeys && (result.defaultOpenKeys = defaultOpenKeys);
    selectedKeys && (result.selectedKeys = selectedKeys);
    openKeys && (result.openKeys = openKeys);
    return result;
  }

  componentDidMount() {
    this.getSelectedKeys();
    this.getOpenKeys();
  }

  componentDidUpdate() {
    this.getSelectedKeys();
    this.getOpenKeys();
  }

  getSelectedKeys() {
    const { defaultSelectedKeys } = this.props;
    if (defaultSelectedKeys || this.state.selectedKeys.length) {
      return;
    }
    this.setState({ selectedKeys: [window.location.pathname] });
  }

  getOpenKeys() {
    const { defaultOpenKeys } = this.props;
    if (defaultOpenKeys || this.state.openKeys.length) {
      return;
    }
    this.setState({ openKeys: [window.location.pathname] });
  }

  renderChildrenItem(
    { children, popupClassName, disabled, title, icon, onTitleClick },
    index
  ) {
    return (
      <SubMenu
        key={index}
        popupClassName={popupClassName}
        title={title}
        disabled={disabled}
        icon={icon}
        onTitleClick={onTitleClick}
      >
        {children.map(this.renderItem)}
      </SubMenu>
    );
  }

  static renderSingleItem({ path, disabled, title, icon, danger }) {
    return (
      <MenuItem
        disabled={disabled}
        key={path}
        title={title}
        icon={icon}
        danger={danger}
      >
        {title}
      </MenuItem>
    );
  }

  renderItem = (child, index) => {
    const { children } = child;
    if (children && Array.isArray(children)) {
      return this.renderChildrenItem(child, index);
    }
    return Nav.renderSingleItem(child);
  };

  render() {
    const { menu, className, ...props } = this.props;
    const {
      defaultOpenKeys,
      defaultSelectedKeys,
      selectedKeys,
      openKeys,
    } = this.state;
    return (
      <Menu
        {...props}
        className={cls('u-nav', className)}
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
      >
        {menu.map(this.renderItem)}
      </Menu>
    );
  }
}

export default Nav;
