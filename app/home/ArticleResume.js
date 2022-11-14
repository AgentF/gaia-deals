import { BasicBadge } from "./Badges";

const ArticleResume = ({ data, category }) => {
    return (
        <div className="w-full lg:max-w-full lg:flex my-2 px-5">
            <div className="h-48 lg:h-auto lg:w-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden shadow-md">
                <img src={data.image} alt="" className="h-64 w-auto " />
            </div>
            <div className="flex-1 border-r border-b border-l border-white lg:border-l-0 lg:border-t lg:border-white bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-md">
                <div className="flex items-start justify-between mb-4">
                    <div className="">
                        <span className="inline-block py-1 leading-none text-yellow-600 uppercase tracking-wide text-xs">
                            {category.name}
                        </span>
                        <div className="text-gray-900 font-bold text-xl">
                            {data.title}
                        </div>
                        <div>{data.description}</div>
                    </div>
                </div>

                <div className="mt-3 flex items-end justify-between">
                    <div className="text-sm">
                        <BasicBadge
                            color="yellow"
                            text={`${data.details.age} Years`}
                        />
                        <BasicBadge
                            color="yellow"
                            text={data.details.country}
                        />
                        {data.details.materials.map((item, i) => (
                            <BasicBadge key={i} color="blue" text={item} />
                        ))}
                    </div>
                    <div>
                        <span className="font-bold text-2xl">
                            {data.price}
                        </span>
                        &nbsp;
                        <span className="text-xs font-semibold">TRX</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleResume;
