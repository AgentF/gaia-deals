import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../app/layout';
import ContentHeader from '../../app/layout/ContentHeader';
// import ArticleDetail from '../../app/home/ArticleDetail';
import ArticleDetail from '../../app/home/AltArticleDetail';

const Article = ({ params }) => {
  const { id } = params;

  return (
    <Layout>
      <ContentHeader title="" />
      <div className="p-5">
        <ArticleDetail id={id} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Article), { ssr: false });
