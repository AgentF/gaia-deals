import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDatacontext } from "../context";
import { getBase58Address } from "../tronsvc";
import { BasicBadge, StatusBadge } from "../layout/CustomBadges";
import Review from "./Review";
import ModalReview from "./ModalReview";

const ModalRelease = dynamic(() => import("./ModalRelease"), { ssr: false });
const ModalDispute = dynamic(() => import("./ModalDispute"), { ssr: false });

const DealDetail = ({ id }) => {
    const [isClosed, setIsClosed] = useState(false);
    const [deal, setDeal] = useState({});
    const [reviews, setReviews] = useState({ user: null, partner: null });
    const [address, setAddress] = useState({ user: "", partner: "" });
    const {
        data: { accountInfo, categoriesList, articleList, dealsList },
        fn: { releaseDealAmount, makeDispute, getReviews },
    } = useDatacontext();

    useEffect(() => {
        initComponent();
    }, [dealsList]);

    useEffect(() => {
        findDealReviews(deal);;
    }, [address]);

    const initComponent = () => {
        const _deal =
            dealsList === null
                ? {}
                : dealsList.find(
                      (o) => o.address.toLowerCase() == id.toLowerCase()
                  );

        setDeal(_deal);
        setIsClosed(_deal.status !== 0);

        if (Object.keys(_deal).length > 0) {
            assignAddresses(_deal);
        }
    }

    const assignAddresses = (_deal) => {
        let userAddress;
        let partnerAddress;

        if (
            accountInfo.address.toLowerCase() ===
            getBase58Address(_deal.buyer).toLowerCase()
        ) {
            userAddress = _deal.buyer;
            partnerAddress = _deal.seller;
        } else {
            userAddress = _deal.seller;
            partnerAddress = _deal.buyer;
        }

        setAddress({ user: userAddress, partner: partnerAddress });
    };

    const findDealReviews = async (_deal) => {
        const reviewsUser = await getReviews(address.user);
        const reviewsPartner = await getReviews(address.partner);

        console.log(reviewsUser, reviewsPartner)
        const userRev =
            Object.keys(reviewsUser).map(i => reviewsUser[i]).find((r) => r.rfrom == _deal.address) || null;
        const partnerRev =
            Object.keys(reviewsPartner).map(i => reviewsPartner[i]).find((r) => r.rfrom == _deal.address) || null;

        setReviews({ user: userRev, partner: partnerRev });
    };

    const handleReleaseDealAmount = async () => {
        const result = await releaseDealAmount(id);
        if (result.success) {
            setIsClosed(true);
        }
    };

    const handleMakeDispute = () => {
        const conf = window.confirm("Do you want to dispute this deal?");
        if (conf) {
            makeDispute(id);
        }
    };

    if (!deal || Object.keys(deal).length === 0) {
        return (
            <div className="w-full lg:max-w-full lg:flex my-2 px-5">
                No deal found yet!
            </div>
        );
    }

    const article = articleList.find((o) => o.id == deal.productId);
    const cat = categoriesList.find((o) => o.id === article.category);
    const isBuyer =
        accountInfo.address.toLowerCase() ===
        getBase58Address(deal.buyer).toLowerCase();

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
                            {article.details.materials
                                .split(",")
                                .map((item, i) => (
                                    <BasicBadge
                                        key={i}
                                        color="blue"
                                        text={item}
                                    />
                                ))}
                        </div>
                        <div>
                            <span className="text-gray-500 text-md font-semibold mr-4">
                                Total
                            </span>
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
                                href={`https://nile.tronscan.org/#/address/${getBase58Address(
                                    deal.address
                                )}`}
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
                                    {deal.shippingAddress
                                        .split("\n")
                                        .map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}
                                </div>
                            </div>
                            <div>
                                {!isClosed && isBuyer && (
                                    <ModalRelease
                                        isDealClosed={isClosed}
                                        onRelease={() =>
                                            handleReleaseDealAmount()
                                        }
                                    />
                                )}
                                <span className="mx-1"></span>
                                {!isClosed && <ModalDispute />}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {isClosed && (
                <div className="w-full lg:max-w-full my-2 px-5">
                    <h3 className="text-gray-500 font-bold text-xl my-4">
                        Reviews
                    </h3>
                    {!reviews.partner ? (
                        <ModalReview addresses={address} contract={id} />
                    ) : (
                        <>
                            <Review data={reviews.user} from={address.partner} />
                            <Review data={reviews.partner} from={address.user} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DealDetail;
