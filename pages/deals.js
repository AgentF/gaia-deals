import DealsList from "../app/home/DealsList";
import Layout from "../app/layout";
import ContentHeader from "../app/layout/ContentHeader";

const Deals = () => {
    return (
        <Layout>
            <ContentHeader title="Your Deals" />
            <div className="cardlist-container p-5">
                <DealsList />
            </div>
        </Layout>
    );
}

export default Deals;
