import Link from "next/link";
import { StatusBadge, BasicBadge } from "./Badges";

const DealItem = ({
    articles,
    categories,
    data: {
        address,
        amount,
        productId,
        status
    },
}) => {
    const article = articles.find((o) => o.id == productId);
    if (!article) {
        return <div></div>;
    }

    const cat = categories.find((o) => o.id == article.category);
    return (
        <div className=" w-full lg:max-w-full lg:flex my-2 px-5">
            <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden shadow-md"
                style={{ backgroundImage: `url(${article.image})` }}
                title="Mountain"
            ></div>
            <div className="flex-1 border-r border-b border-l border-white lg:border-l-0 lg:border-t lg:border-white bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-md">
                <div className="flex items-start justify-between mb-4">
                    <div className="">
                        <span className="inline-block py-1 leading-none text-yellow-600 uppercase tracking-wide text-xs">
                            {cat.name}
                        </span>
                        <div className="text-gray-900 font-bold text-xl">
                            {article.title}
                        </div>
                    </div>
                    <StatusBadge status={status.toString()} />
                </div>
                <div className="text-sm">
                    <BasicBadge
                        color="yellow"
                        text={`${article.details.age} Years`}
                    />
                    <BasicBadge color="yellow" text={article.details.country} />
                    {article.details.materials.map((item, i) => (
                        <BasicBadge key={i} color="blue" text={item} />
                    ))}
                </div>
                <div className="mt-3 flex items-end justify-between">
                    <div>
                        <span className="font-bold text-xl">
                            {amount.toString()}
                        </span>
                        &nbsp;<span className="text-xs font-semibold">TRX</span>
                    </div>
                    <div>
                        <Link href={`/deal/${address}`}>
                            <a className="flex rounded-md bg-green-500 py-2 px-4 text-sm text-white transition-all duration-150 ease-in-out hover:bg-green-600">
                                Details
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealItem;
