import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../../app/layout";
import ContentHeader from "../../app/layout/ContentHeader";
import ShippingForm from "../../app/home/ShippingForm";

function Shipping({ params }) {
    const { id } = params;

    return (
        <Layout>
            <ContentHeader title="Checkout"/>
            <div className="cardlist-container p-5">
               <ShippingForm articleId={id}/>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });