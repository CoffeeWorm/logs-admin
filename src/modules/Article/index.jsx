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
    try {
      const result = await this.formRef.validateFields();
      await this.props.onSubmit(result);
      cb && cb(result);
    } catch (e) {
      /* placeholder */
    }
  };

  jump2Listpage = () => this.props.history.push('/');

  render() {
    const { className, applyBtn } = this.props;
    return (
      <div className={cls('m-article', className)}>
        <Form ref={(node) => (this.formRef = node)} layout="vertical">
          <Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请填写标题' }]}
          >
            <Input />
          </Item>
          <Item
            label="简介"
            name="intro"
            rules={[{ required: true, message: '请填写简介' }]}
          >
            <Input />
          </Item>
          <Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请填写内容' }]}
          >
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
