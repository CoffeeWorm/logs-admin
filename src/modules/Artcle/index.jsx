import React, { Component } from 'react';
import cls from 'classnames';
import { Input, Form, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Markdown from '@@/Markdown';
import './style.less';

const { Item } = Form;

class Article extends Component {
  static defaultProps = { applyBtn: true };

  componentDidUpdate({ initValue: preVal }) {
    const { initValue } = this.props;
    if (preVal !== initValue) {
      this.formRef.setFieldsValue(initValue);
    }
  }

  setValue(value) {
    this.formRef.setFieldsValue(value);
  }

  handleSubmit = async (cb) => {
    const result = await this.formRef.validateFields();
    this.props.onSubmit(result);
    cb && cb(result);
  };

  jump2Listpage = () => this.props.history.push('/');

  render() {
    const { className, applyBtn } = this.props;
    return (
      <div className={cls('m-article', className)}>
        <Form ref={(node) => (this.formRef = node)} layout="vertical">
          <Item label="标题" name="title">
            <Input />
          </Item>
          <Item name="content" label="内容">
            <Markdown />
          </Item>
          <div className="operator">
            {applyBtn && <Button onClick={this.handleSubmit}>应用</Button>}
            <Button
              onClick={() => this.handleSubmit(this.jump2Listpage)}
              type="primary"
            >
              提交
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(Article);
