import { useEffect, useState } from "react";
import ModalWindow from "../layout/ModalWindow";
import {BaseButton} from "../layout/CustomButtons";

const ModalTest = ({}) => {
    const [show, setShow] = useState(false);
    const [isConfirm, setIsConfirm] = useState(null);

    useEffect(()=>{
        if (show) setIsConfirm(null);
    }, [show])

    useEffect(()=>{
        if (!isConfirm) setShow(false);
    }, [isConfirm])

    return (
        <ModalWindow
            show={show}
            onShow={setShow}
            activator={({ onShow }) => (
                <BaseButton
                    color="green"
                    onClick={() => onShow(true)}
                >
                    <div>
                        <span>Close Deal</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline ml-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </BaseButton>
            )}
        >
            <div className="bg-white p-6">
                <div>
                    <h4 className="my-3">Do you want to release the money?</h4>
                    <div className="text-right">
                        <BaseButton
                            color="green"
                            classname="mr-2"
                        >
                            <span>Ok</span>
                        </BaseButton>
                        <BaseButton >
                            <span>Cancel</span>
                        </BaseButton>
                    </div>
                </div>

            </div>
        </ModalWindow>
    );
};

export default ModalTest;
