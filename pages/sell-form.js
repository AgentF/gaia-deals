import React from 'react';
import Layout from '../app/layout';
import ContentHeader from '../app/layout/ContentHeader';
import SellForm from '../app/home/SellForm';

function SellFormPage() {
  return (
    <Layout>
      <ContentHeader title="Publish Product" />
      <div className="cardlist-container px-10 py-6 w-full">
        <SellForm />
      </div>
    </Layout>
  );
}

export default SellFormPage;
