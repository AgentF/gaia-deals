import { useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { BaseButton } from "../layout/CustomButtons";
import { CustomTextarea } from "../layout/CustomInputs";
import ModalWindow from "../layout/ModalWindow";
import { getBase58Address } from "../tronsvc";
import { useDatacontext } from "../context";

const ModalReview = ({ addresses, contract }) => {
    const {
        fn: { addReview },
    } = useDatacontext();

    const [show, setShow] = useState(false);
    const [score, setScore] = useState(false);
    const refComment = useRef();

    const handleRating = (rate) => {
        setScore(rate*10)
    }

    const handleSubmit = async () => {
        console.log("submit", score, refComment.current.value);
        const result = await addReview(contract, addresses.partner, score, refComment.current.value);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <ModalWindow
            show={show}
            onShow={setShow}
            activator={({ onShow }) => (
                <BaseButton color="blue" onClick={() => onShow(true)}>
                    <div className="flex items-center">
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
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>

                        <span>Leave Your Review</span>
                    </div>
                </BaseButton>
            )}
        >
            <div className="rounded-sm bg-white p-6">
                <div>
                    <h4 className="my-3 text-xl">Leave a Review for <br/> {getBase58Address(addresses.partner)}</h4>
                    <div className="form-group mb-6">
                        <div className="mb-5">
                            <h4 className="text-gray-700 font-semibold text-xl">Score</h4>
                            <Rating
                                onClick={handleRating}
                                fillColor="#f68e80"
                                SVGclassName="inline-block"
                            />
                        </div>
                        <CustomTextarea
                            ref={refComment}
                            name="comment"
                            label="Comment"
                            placeholder="Good bussiness person!"
                        />
                    </div>
                    <div className="text-right">
                        <BaseButton
                            color="green"
                            classname="mr-2"
                            onClick={() => handleSubmit()}
                        >
                            <span>Submit</span>
                        </BaseButton>
                        <BaseButton onClick={() => setShow(false)}>
                            <span>Cancel</span>
                        </BaseButton>
                    </div>
                </div>
            </div>
        </ModalWindow>
    );
};

export default ModalReview;
