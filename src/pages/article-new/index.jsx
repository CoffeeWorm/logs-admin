import React from 'react';
import Article from '@/modules/Article';
import BasicLayout from '@/layouts/BasicLayout';
import { postArticle } from '@/service';

function ArticleNew() {
  return (
    <BasicLayout>
      <Article
        applyBtn={false}
        onSubmit={async (result) => postArticle({ data: result })}
      />
    </BasicLayout>
  );
}

export default ArticleNew;
