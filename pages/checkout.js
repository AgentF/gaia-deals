import Layout from "../app/layout";
import ContentHeader from "../app/layout/ContentHeader";

function Checkout() {
    return (
        <Layout>
            <ContentHeader title="Checkout" />
            <div className="p-5 ">
                Checkout Info!
            </div>
        </Layout>
    )
}

export default Checkout