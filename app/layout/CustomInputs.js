import React from "react";

export const CustomInput = React.forwardRef(({ name, label, placeholder, type }, ref) => (
    <>
        <label className="text-gray-700 font-semibold text-xl" htmlFor={name}>
            {label}
        </label>
        <input
            type={type}
            className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                mt-2
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id={name}
            name={name}
            ref={ref}
            placeholder={placeholder}
        />
    </>
));

export const CustomTextarea = React.forwardRef(({ name, label, placeholder }, ref) => (
    <>
        <label className="text-gray-700 font-semibold text-xl" htmlFor={name}>
            {label}
        </label>
        <textarea
            className="form-control block
                w-full
                h-36
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                mt-2
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text"
            id={name}
            name={name}
            ref={ref}
            placeholder={placeholder}
        />
    </>
));

export const CustomSelect = React.forwardRef(({ name, label, children }, ref) => (
    <>
        <label className="text-gray-700 font-semibold text-xl" htmlFor={name}>
            {label}
        </label>
        <select
            className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                mt-2
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id={name}
            name={name}
            ref={ref}
        >
            {children}
        </select>
    </>
));

export const CustomInputControlled = ({ labelText, name, value, onChange }) => {
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
                onChange={onChange}
            />
        </div>
    );
};