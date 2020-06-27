import React, { Component } from 'react';
import { getArticle, patchArticle } from '@/service';
import BasicLayout from '@/layouts/BasicLayout';
import Article from '@/modules/Article';

class ArticleEdit extends Component {
  state = { title: '', content: '', intro: '' };

  componentDidMount() {
    this.fetchArtile();
  }

  componentDidUpdate({
    match: {
      params: { id: preId },
    },
  }) {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (id !== preId) {
      this.fetchArtile();
    }
  }

  handleSubmit = (data) => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return patchArticle({ data, match: { id } });
  };

  jump2Listpage = () => this.props.history.push('/');

  async fetchArtile() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { data } = await getArticle({ match: { id } });
    this.setState({ ...data });
  }

  render() {
    return (
      <BasicLayout>
        <Article initValue={{ ...this.state }} onSubmit={this.handleSubmit} />
      </BasicLayout>
    );
  }
}

export default ArticleEdit;
