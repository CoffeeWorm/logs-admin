import React from 'react';
import { Link } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import style from './style.less';

function NewArticleJumper() {
  return (
    <div className={style['u-new-article-jumper']}>
      <Link to="/article">
        <EditOutlined />
      </Link>
    </div>
  );
}

export default NewArticleJumper;
