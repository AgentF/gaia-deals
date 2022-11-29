export const BaseButton = ({
    children,
    onClick,
    classname,
    color = "gray",
    size = "md",
}) => (
    <button
        className={`font-semibold rounded-md bg-${color}-500 py-2 px-4 text-${size} text-white transition-all duration-150 ease-in-out hover:bg-${color}-600 ${classname}`}
        onClick={onClick}
    >
        {children}
    </button>
);

export const ConditionalButton = ({ children, color, showOn, onclick }) => {
    if (!showOn) {
        return <div></div>;
    }
    return (
        <button
            onClick={onclick}
            className={`ml-2 font-semibold rounded-md bg-${color}-500 hover:bg-${color}-600 py-2 px-4 text-sm text-white transition-all duration-150 ease-in-out`}
        >
            {children}
        </button>
    );
};
