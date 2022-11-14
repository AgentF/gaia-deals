import { useDatacontext } from "../context";
import { getBase58Address } from "../tronsvc";
import { BasicBadge, StatusBadge } from "./Badges";
import Review from "./Review";

const DealDetail = ({ id }) => {
    const {
        data: { categoriesList, articleList, dealsList },
        fn: { releaseDealAmount }
    } = useDatacontext();

    const handleReleaseDealAmount = () => {
        const conf = window.confirm("Do you want to release the money?");
        if (conf) {
            releaseDealAmount(id);
        }
    }

    const deal = dealsList.find(
        (o) => o.address.toLowerCase() == id.toLowerCase()
    );

    if (!deal) {
        return <div className="w-full lg:max-w-full lg:flex my-2 px-5">Loading...</div>;
    }

    const article = articleList.find((o) => o.id == deal.productId);
    const cat = categoriesList.find((o) => o.id === article.category);

    return (
        <div>
            <div className="w-full lg:max-w-full lg:flex my-2 px-5">
                <div className="h-48 lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden shadow-md">
                    <img src={article.image} alt="" className="h-64 w-auto " />
                </div>
                <div className="flex-1 border-r border-b border-l border-white lg:border-l-0 lg:border-t lg:border-white bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-md">
                    <div className="flex items-start justify-between mb-4">
                        <div className="">
                            <span className="inline-block py-1 leading-none text-yellow-600 uppercase tracking-wide text-xs">
                                {cat.name}
                            </span>
                            <div className="text-gray-900 font-bold text-xl">
                                {article.title}
                            </div>
                            <div>{article.description}</div>
                        </div>
                        <StatusBadge status={deal.status.toString()} />
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                        <div className="text-sm">
                            <BasicBadge
                                color="yellow"
                                text={`${article.details.age} Years`}
                            />
                            <BasicBadge
                                color="yellow"
                                text={article.details.country}
                            />
                            {article.details.materials.map((item, i) => (
                                <BasicBadge key={i} color="blue" text={item} />
                            ))}
                        </div>
                        <div>
                            <span className="text-gray-500 text-md font-semibold mr-4">Total</span>
                            <span className="font-bold text-2xl">
                                {deal.amount.toString()}
                            </span>
                            &nbsp;
                            <span className="text-xs font-semibold">TRX</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:max-w-full my-2 px-5">
                <h3 className="text-gray-500 font-bold text-xl my-4">
                    Deal Details
                </h3>
                <div className="w-full shadow-md border border-white bg-white rounded p-5 my-4">
                    <ul>
                        <li className="pb-2">
                            <b>Contract Addess: </b>
                            <a 
                                className="text-yellow-700"
                                target="_blank"
                                href={`https://nile.tronscan.org/#/address/${getBase58Address(deal.address)}`}
                            >
                                {getBase58Address(deal.address)}
                            </a>
                        </li>
                        <li className="pb-2">
                            <b>Seller: </b>
                            <span>{getBase58Address(deal.seller)}</span>
                        </li>
                        <li className="pb-2">
                            <b>Buyer: </b>
                            <span>{getBase58Address(deal.buyer)}</span>
                        </li>
                        <li className="flex justify-between items-end">
                            <div>
                                <b>Shipping Data</b>
                                <div>
                                    {deal.shippingAddress.split('\n').map(line => <div>{line}</div>)}
                                </div>
                            </div>
                            <div>
                                <button 
                                    onClick={() => handleReleaseDealAmount()}
                                    className="font-semibold mr-2 rounded-md bg-green-500 py-2 px-4 text-sm text-white transition-all duration-150 ease-in-out hover:bg-green-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 inline-block mr-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                        />
                                    </svg>

                                    <span>Close Deal</span>
                                </button>
                                <button className="font-semibold rounded-md bg-yellow-500 py-2 px-4 text-sm text-white transition-all duration-150 ease-in-out hover:bg-yellow-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 inline-block mr-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>

                                    <span>Dispute Deal</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full lg:max-w-full my-2 px-5">
                <h3 className="text-gray-500 font-bold text-xl my-4">
                    Reviews
                </h3>
                <Review />
                <Review />
            </div>
        </div>
    );
};

export default DealDetail;
