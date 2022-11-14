import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../../app/layout";
import ContentHeader from "../../app/layout/ContentHeader";
import DealDetail from "../../app/home/DealDetail";

function Deal({ params }) {
    const { id } = params;

    return (
        <Layout>
            <ContentHeader title={`Deal ${id}`} />
            <div className="cardlist-container p-5">
                <DealDetail id={id} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}

export default dynamic(() => Promise.resolve(Deal), { ssr: false });