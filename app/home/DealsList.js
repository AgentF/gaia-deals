import DealItem from "./DealItem";
import Loader from "./Loader";
import { useDatacontext } from "../context";
import EmptyState from "./EmptyState";

const DealsList = () => {
    const {
        data: { categoriesList, articleList, dealsList },
    } = useDatacontext();

    const _deals = dealsList === null ? [] : dealsList.map((o) => o).reverse();

    if (dealsList === null) {
        return (
            <div className="flex flex-wrap">
                <Loader />
            </div>
        );
    }

    if (dealsList.length === 0) {
        return (
            <EmptyState
                style="mx-5"
                message="You have no Deals opened yet!"
                condition={dealsList.length === 0}
            />
        );
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
