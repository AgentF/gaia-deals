import Link from "next/link";
import { useDatacontext } from "../context";

const AltArticleDetail = ({ id }) => {
    const {
        data: { categoriesList, articleList },
    } = useDatacontext();

    const article = articleList.find((o) => o.id == id);
    const cat = categoriesList.find((o) => o.id === article.category);

    if (!article) {
        return <div></div>;
    }

    return (
        <div className="cardlist-container block p-5">
            <div>
                <div className="relative w-full lg:max-w-full lg:flex my-2 p-4 shadow-md border border-white bg-white rounded my-4">
                    <div className="flex items-center bg-cover text-center overflow-hidden">
                        <img
                            src={article.image}
                            alt=""
                            className="h-36 md:h-96 w-auto"
                        />
                    </div>
                    <div className="pl-6 flex flex-col flex-1">
                        <div className="mb-2">
                            <span className="inline-block py-1 leading-none text-yellow-600 uppercase tracking-wide text-xs">
                                {cat.name}
                            </span>
                            <div className="text-gray-900 font-bold text-4xl mb-4">
                                {article.title}
                            </div>
                            <div className="text-gray-700 text-sm mb-4">
                                <p>
                                    <b>SELLER</b>: 0x1234567890
                                </p>
                                <p>
                                    <b>REPUTATION</b>: 99%
                                </p>
                                <p>
                                    <b>DEALS CLOSED</b>: 5
                                </p>
                            </div>
                            <div className="mb-4">{article.description}</div>
                            <table className="table- text-left">
                                <tbody>
                                    <tr>
                                        <th>Lifetime</th>
                                        <td className="pl-2">
                                            {article.details.age}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Materials</th>
                                        <td className="capitalize pl-2">
                                            {article.details.materials.join(
                                                ", "
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Country</th>
                                        <td className="pl-2">
                                            {article.details.country}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td className="pl-2">
                                            {article.price}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Extra</th>
                                        <td className="pl-2">
                                            {article.extra || "---"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="md:absolute right-5 bottom-5">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <span className="font-bold text-3xl">
                                        {article.price}
                                    </span>
                                    &nbsp;
                                    <span className="text-lg font-semibold">
                                        TRX
                                    </span>
                                </div>
                            </div>
                            <div>
                                <Link href={`/shipping/${id}`}>
                                    <button className="flex rounded-md bg-green-500 py-2 px-4 text-white transition-all duration-150 ease-in-out hover:bg-green-600">
                                        BUY NOW
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AltArticleDetail;
