import React from 'react';
import Article from '@/modules/Artcle';
import { postArticle } from '@/service';

function ArticleNew() {
  return (
    <Article
      applyBtn={false}
      onSubmit={async (result) => {
        await postArticle({ data: result });
      }}
    />
  );
}

export default ArticleNew;
