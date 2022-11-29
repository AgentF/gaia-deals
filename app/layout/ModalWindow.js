import React from "react";
import { createPortal } from "react-dom";

const ModalWindow = ({
    children,
    activator,
    show,
    onShow,
    backdrop = false,
}) => {
    const content = (
        <div className={`modal-window ${show ? "open" : ""}`}>
            {backdrop && (
                <div
                    className="modal-backdrop"
                    onClick={() => onShow(false)}
                ></div>
            )}
            <div className="">
                <button
                    title="Close"
                    className="modal-close noselect"
                    onClick={() => onShow(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );

    return (
        <>
            {activator({ onShow })}
            {createPortal(content, window.document.body)}
        </>
    );
};

export default ModalWindow;
