import Link from "next/link";
import Loader from "./Loader";
import EmptyState from "./EmptyState";
import { useDatacontext } from "../context";
import { splitHexAddress } from "../utils";

const Card = ({ categories, data: { id, title, image, category, price, seller, active } }) => {
    if (!active) 
        return <div className="hidden"></div>;

    const cat = categories.find((o) => o.id === category);
    const linkTo = `/article/${id}`;
    return (
        <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
            <Link href={linkTo}>
                <a
                    className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
                >
                    <div className="relative pb-48 overflow-hidden">
                        <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src={image}
                            alt=""
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="my-1 font-bold">{title}</h2>
                        <span className="inline-block py-1 leading-none text-gray-500 uppercase tracking-wide text-xs">
                            By {splitHexAddress(seller)}
                        </span>
                    </div>
                    <div className="px-4 py-2 border-t border-b text-xs text-gray-700">
                        <div className="mt-3 flex items-center justify-between">
                            <span className="inline-block px-2 py-1 leading-none bg-yellow-200 text-yellow-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                {cat.name}
                            </span>
                            <div>
                                <span className="font-bold text-xl">
                                    {price}
                                </span>
                                &nbsp;
                                <span className="text-xs font-semibold">
                                    TRX
                                </span>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
};

const ArticleList = ({ filter }) => {
    const { 
        data:{ categoriesList, articleList, articlesLoaded }
    } = useDatacontext();

    const articles = filter ? articleList.filter(o => o.category === filter) : articleList;

    if (!articlesLoaded) {
        return (
            <div className="flex flex-wrap">
                <Loader />
            </div>
        )
    }

    return (
        <div className="flex flex-wrap -mx-4">
            <EmptyState
                style="mx-8"
                message="No Publications available!"
                condition={articles.length === 0}
            />
            {articles.map((obj) => (
                <Card 
                    key={obj.id} 
                    data={obj}
                    categories={categoriesList} 
                />
            ))}
        </div>
    );
};

export default ArticleList;
