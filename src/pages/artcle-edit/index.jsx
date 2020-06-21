import React, { Component } from 'react';
import { getArticle, postArticle } from '@/service';
import Article from '@/modules/Artcle';
import style from './style.less';

class ArticleEdit extends Component {
  state = { title: '', content: '' };

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

  handleSubmit = async (data) => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    await postArticle({ data, match: { id } });
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
      <div className={style.article}>
        <Article initValue={{ ...this.state }} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default ArticleEdit;
