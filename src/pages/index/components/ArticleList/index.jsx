import React, { PureComponent } from 'react';
import { Link, generatePath } from 'react-router-dom';
import cls from 'classnames';
import moment from 'moment';
import { List, Empty } from 'antd';
import { getArticleList } from '@/service';
import style from './style.less';

const { Item: ListItem } = List;
const { Meta } = ListItem;
class ArticleList extends PureComponent {
  state = {
    list: [],
    current: 1,
    total: 0,
    pageSize: 10,
  };

  componentDidMount() {
    this.getList();
  }

  async getList() {
    const { current, pageSize } = this.state;
    const {
      data: {
        rows: data,
        pagination: { total },
      },
    } = await getArticleList({ params: { page: current, pageSize } });
    this.setState({ total, list: data });
  }

  handlePageChange = (current, pageSize) =>
    this.setState({ current, pageSize }, this.getList);

  render() {
    const { list, current, pageSize, total } = this.state;
    const { className } = this.props;
    if (!total) {
      return <Empty />;
    }
    return (
      <List
        className={cls(style.articleList, className)}
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          onShowSizeChange: this.handlePageChange,
          onChange: this.handlePageChange,
        }}
      >
        {list.map(({ id, title, intro, updatedAt }) => (
          <ListItem key={id}>
            <Link to={generatePath('/article/:id', { id })}>
              <Meta
                title={title}
                description={`修改于: ${moment(updatedAt).format('YYYY/MM/DD')}`}
              />
            </Link>

            {intro}
          </ListItem>
        ))}
      </List>
    );
  }
}

export default ArticleList;
