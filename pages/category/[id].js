import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../../app/layout';
import ContentHeader from '../../app/layout/ContentHeader';
import ArticleList from '../../app/home/ArticleList';

function Category({ params }) {
    const { id } = params;

    return (
        <Layout>
            <ContentHeader title="Category" titleLv2={id} />
            <div className="cardlist-container p-5 ">
                <ArticleList filter={id} />
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}
  
export default dynamic(() => Promise.resolve(Category), { ssr: false });