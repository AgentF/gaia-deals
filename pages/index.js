import Layout from "../app/layout";
import ContentHeader from "../app/layout/ContentHeader";
import ArticleList from "../app/home/ArticleList";

const Home = () => {
    return (
        <Layout>
            <ContentHeader title="Latest Publications" />
            <div className="cardlist-container p-5 ">
                <ArticleList />
            </div>
        </Layout>
    )
}

export default Home;
