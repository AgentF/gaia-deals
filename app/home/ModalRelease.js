import { useEffect, useState } from "react";
import { useDatacontext } from "../context";
import ModalWindow from "../layout/ModalWindow";
import { BaseButton } from "../layout/CustomButtons";

const ModalRelease = ({ isDealClosed, onRelease }) => {
    const [show, setShow] = useState(false);

    const handleReleaseDealAmount = () => {
        if (isDealClosed) return;
        onRelease();
    };

    return (
        <ModalWindow
            show={show}
            onShow={setShow}
            activator={({ onShow }) => (
                <BaseButton color="green" onClick={() => onShow(true)}>
                    <div>
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
                    </div>
                </BaseButton>
            )}
        >
            <div className="rounded-sm bg-white p-6">
                <div>
                    <h4 className="my-3">Do you want to release the money?</h4>
                    <div className="text-right">
                        <BaseButton
                            color="green"
                            classname="mr-2"
                            onClick={() => handleReleaseDealAmount()}
                        >
                            <span>Ok</span>
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

export default ModalRelease;
