import Layout from "../app/layout";
import ContentHeader from "../app/layout/ContentHeader";

function Articles() {
    return (
        <Layout>
            <ContentHeader title="Article List" />
            <div className="p-5 ">
                Articles here!
            </div>
        </Layout>
    )
}

export default Articles