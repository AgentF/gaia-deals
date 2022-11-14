import { useState, useRef } from "react";
import { useDatacontext } from "../context";
import { getHexAddress } from "../tronsvc";
import ArticleResume from "./ArticleResume";

const CustomInput = ({ labelText, name, value, onchange }) => {
    const inputClass =
        "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 mt-1 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

    return (
        <div className="form-group mb-6">
            <label
                className="text-gray-900 font-semibold text-md"
                htmlFor={name}
            >
                {labelText}
            </label>
            <input
                type="text"
                className={inputClass}
                id={name}
                value={value}
                onChange={onchange}
            />
        </div>
    );
};

const ShippingForm = ({ articleId }) => {
    const [addr1, setAddr1] = useState("");
    const [addr2, setAddr2] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [country, setCountry] = useState("");
    const [isCheckout, setIsCheckout] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [discountCost, setDiscountCost] = useState(0);

    const {
        data: { categoriesList, articleList, accountInfo },
        fn: { getShippingQuote, getDiscountQuote, doCheckout },
    } = useDatacontext();

    const article = articleList.find((o) => o.id == articleId);
    const cat = categoriesList.find((o) => o.id === article.category);

    const handleIsCheckout = () => {
        const quote = getShippingQuote();
        const discount = getDiscountQuote();
        setShippingCost(quote);
        setDiscountCost(discount);
        setTotalCost(parseInt(article.price) + quote - discount);
        setIsCheckout(true);
    };

    const handleDoCheckout = () => {
        const fullAddress = `${addr1}\n${addr2}\n${state},${country},${zipcode}`;
        console.log(article, fullAddress);

        if (totalCost > accountInfo.balance) {
            alert("Insufficient Funds in Wallet!");
        }
        // else if (article.seller.toLowerCase() === accountInfo.address.toLowerCase()) {
        //     alert("You can't buy to yourself ;)");
        // }
        else {
            doCheckout({ 
                articleId,
                shippingAddress: fullAddress, 
                amount: totalCost,  
                seller: "TEoVyCekzaE7Ndxf4RYGHUeht2LjvR3erd",
                buyer: accountInfo.address,
                timestamp: Date.now()
            })
        }
    };

    if (!article) {
        return <div></div>;
    }

    return (
        <div>
            <div className="flex justify-end p-5 pb-2">
                <div>
                    <span className="text-gray-500 text-md font-semibold mr-3">
                        Your Balance
                    </span>
                    <span className="font-bold text-2xl">
                        {accountInfo.balance}
                    </span>
                    &nbsp;
                    <span className="text-xs font-semibold">TRX</span>
                </div>
            </div>

            <ArticleResume data={article} category={cat} />

            {!isCheckout && (
                <div className="w-full lg:max-w-full my-2 px-5">
                    <h3 className="text-gray-500 font-bold text-xl my-4">
                        Shipping Details
                    </h3>
                    <div className="w-full my-4">
                        <CustomInput
                            name="addr1"
                            labelText="Address Line 1"
                            value={addr1}
                            onchange={(e) => setAddr1(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <CustomInput
                                name="addr2"
                                labelText="Address Line 2"
                                value={addr2}
                                onchange={(e) => setAddr2(e.target.value)}
                            />
                            <CustomInput
                                name="state"
                                labelText="State/Province"
                                value={state}
                                onchange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <CustomInput
                                name="country"
                                labelText="Country"
                                value={country}
                                onchange={(e) => setCountry(e.target.value)}
                            />
                            <CustomInput
                                name="zipcode"
                                labelText="Zip Code"
                                value={zipcode}
                                onchange={(e) => setZipcode(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="font-semibold rounded-md bg-green-500 py-2 px-4 text-md text-white transition-all duration-150 ease-in-out hover:bg-green-600"
                                onClick={handleIsCheckout}
                            >
                                <span>Next</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 ml-2 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCheckout && (
                <div className="w-full lg:max-w-full my-2 px-5">
                    <h3 className="text-gray-500 font-bold text-xl my-4">
                        Shipping Details
                    </h3>
                    <div className="flex justify-between items-end w-full shadow-md border border-white bg-white rounded p-5 my-4">
                        <div>
                            <div>{addr1}</div>
                            <div>{addr2}</div>
                            <div>
                                {state}, {country}, {zipcode}
                            </div>
                        </div>
                        <div>
                            <span className="text-gray-500 text-md font-semibold mr-3"></span>
                            <span className="font-bold text-2xl">
                                {shippingCost}
                            </span>
                            &nbsp;
                            <span className="text-xs font-semibold">TRX</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-gray-500 text-md font-semibold mr-3">
                                Discount
                            </span>
                            <span className="font-bold text-2xl">
                                {discountCost}
                            </span>
                            &nbsp;
                            <span className="text-xs font-semibold">TRX</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-gray-500 text-md font-semibold mr-3">
                                Total
                            </span>
                            <span className="font-bold text-2xl">
                                {totalCost}
                            </span>
                            &nbsp;
                            <span className="text-xs font-semibold">TRX</span>
                        </div>
                        <div>
                            <button
                                className="font-semibold rounded-md bg-gray-400 py-2 px-4 text-md text-white transition-all duration-150 ease-in-out hover:bg-gray-500 mr-3"
                                onClick={() => setIsCheckout(false)}
                            >
                                Back
                            </button>
                            <button
                                className="font-semibold rounded-md bg-green-500 py-2 px-4 text-md text-white transition-all duration-150 ease-in-out hover:bg-green-600"
                                onClick={() => handleDoCheckout()}
                            >
                                <span>Checkout</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 ml-2 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingForm;
