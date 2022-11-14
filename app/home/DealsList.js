import DealItem from "./DealItem";
import { useDatacontext } from "../context";

const DealsList = () => {
    const {
        data: { categoriesList, articleList, dealsList },
    } = useDatacontext();

    const _deals = dealsList.map((o) => o).reverse();

    if (dealsList.length < 1) {
        return <div className="flex flex-wrap -mx-4">Loading...</div>;
    }

    return (
        <div className="flex flex-wrap -mx-4">
            {_deals.map((obj, i) => (
                <DealItem
                    key={i}
                    data={obj}
                    articles={articleList}
                    categories={categoriesList}
                />
            ))}
        </div>
    );
};

export default DealsList;
