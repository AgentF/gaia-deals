import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "../../app/layout";
import Review from "../../app/home/Review";
import ContentHeader from "../../app/layout/ContentHeader";
import {
    BadgeClothes,
    BadgeFurniture,
    BasicBadge,
	BadgeProfile
} from "../../app/home/Badges";

function Profile({ params }) {
    const { wallet } = params;

    return (
        <Layout>
            <ContentHeader title={`Profile for ${wallet}`} />
            <div className="cardlist-container p-5">
                <div className="w-full shadow-md border border-white bg-white rounded my-4">
                    <div className="flex flex-col items-center relative">
                        <div
                            className="relative w-full h-36 bg-contain bg-repeat mb-6"
                            style={{ backgroundImage: "URL(/img/map.jpg)" }}
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-full"
                                style={{ backgroundColor: "#f68e8054" }}
                            />
                        </div>
                        <div className="absolute bg-white rounded-full p-1 top-12">
                            <img
                                src="/users/users-1.svg"
                                alt="avatar"
                                className="rounded-full bg-green-300 w-28 h-28"
                            />
                        </div>
						<div className="w-full flex flex-col text-center mb-4">
                            <h2 className="text-xl font-semibold my-3">{wallet}</h2>
                        </div>
                        <div className="flex flex-col md:flex-row justify-around w-full">
                            <div className="order-2 md:order-1 text-center mb-4">
                                <div className="">
									<BadgeFurniture className="mr-4" />
									<BadgeClothes />
								</div>
								<h4 className="text-sm font-semibold mt-2">
                                    Badges
                                </h4>
                            </div>
                            <div className="order-1 md:order-2 text-center mb-4 md:mb-0">
                                <BadgeProfile />
								<h4 className="text-sm font-semibold mt-2">
                                    Reputation
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-500">Reviews</h2>
                <div className="flex flex-col">
                    <Review />
                    <Review />
                    <Review />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
