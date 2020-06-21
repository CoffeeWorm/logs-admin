/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { Input } from 'antd';
import cls from 'classnames';
import marked from 'marked';
import { throttle } from 'lodash';
import './style.less';

const { TextArea } = Input;

class Markdown extends Component {
  state = { inputValue: '', htmlContent: '' };

  setHtml = throttle(
    (value) => this.setState({ htmlContent: marked(value) }),
    60
  );

  constructor(props) {
    super(props);
    this.state.inputValue = props.defaultValue;
  }

  componentDidUpdate({ value: preVal }, { inputValue: preIptVal }) {
    const { value } = this.props;
    const { inputValue } = this.state;

    if ((value !== preVal || inputValue !== preIptVal)) {
      this.setHtml(value || inputValue || '');
    }
  }

  handleChange = (e) => {
    const {
      target: { value },
    } = e;
    const { onChange } = this.props;
    onChange && onChange(value);
    this.setState({ inputValue: value });
  };

  render() {
    const { inputValue, htmlContent } = this.state;
    const { className, value } = this.props;
    return (
      <div className={cls('u-markdown-editor', className)}>
        <TextArea className="input-area" value={value || inputValue} onChange={this.handleChange} />
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    );
  }
}

export default Markdown;
