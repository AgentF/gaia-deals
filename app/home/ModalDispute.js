import { useEffect, useState } from "react";
import ModalWindow from "../layout/ModalWindow";
import { BaseButton } from "../layout/CustomButtons";

const ModalDispute = ({}) => {
    const [show, setShow] = useState(false);
    const [isConfirm, setIsConfirm] = useState(null);

    return (
        <ModalWindow
            show={show}
            onShow={setShow}
            activator={({ onShow }) => (
                <BaseButton color="yellow" onClick={() => onShow(true)}>
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
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>

                        <span>Dispute Deal</span>
                    </div>
                </BaseButton>
            )}
        >
            <div className="rounded-sm bg-white p-6">
                <div>
                    <h4 className="my-3">
                        Do you want to <span className="font-semibold">dispute</span>{" "}
                        this deal?
                    </h4>
                    <div className="text-right">
                        <BaseButton color="green" classname="mr-2">
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

export default ModalDispute;
