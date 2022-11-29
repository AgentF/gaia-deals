export const BasicBadge = ({
    text,
    color = "gray",
    size = "xs",
    className,
}) => {
    const badgeStyle = `bg-${color}-200 text-${color}-800`;
    return (
        <span
            className={`inline-block px-2 py-1 mr-1 leading-none ${badgeStyle} rounded-full font-semibold uppercase tracking-wide text-${size} ${className}`}
        >
            {text}
        </span>
    );
};

export const StatusBadge = ({ status, className }) => {
    const badgeStyle =
        status == 0
            ? "bg-green-200 text-green-800"
            : status == 1
            ? "bg-gray-200 text-gray-800"
            : "bg-yellow-200 text-yellow-800";
    return (
        <span
            className={`inline-block px-2 py-1 leading-none ${badgeStyle} rounded-full font-semibold uppercase tracking-wide text-xs ${className}`}
        >
            {status == 0 ? "Open" : status == 1 ? "Closed" : "Dispute"}
        </span>
    );
};

export const BadgeFurniture = ({ level = 1, className }) => {
    const badgeStyle = `bg-green-200 text-green-800`;
    return (
        <div
            className={`inline-block px-3 py-2 mr-1 leading-none ${badgeStyle} rounded-md font-semibold uppercase tracking-wide text-md ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mb-1"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                />
            </svg>

            <span>FLV{level}</span>
        </div>
    );
};

export const BadgeClothes = ({ level = 1, className }) => {
    const badgeStyle = `bg-yellow-200 text-yellow-800`;
    return (
        <div
            className={`inline-block px-3 py-2 mr-1 leading-none ${badgeStyle} rounded-md font-semibold uppercase tracking-wide text-md ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mb-1"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
            </svg>

            <span>CLV{level}</span>
        </div>
    );
};

export const BadgeProfile = ({ percent = 100, textDone = "5/5" }) => {
    const badgeStyle = `bg-green-200 text-green-800`;
    return (
        <div
            className={`inline-block px-3 py-2 mr-1 leading-none ${badgeStyle} rounded-md font-semibold uppercase tracking-wide text-md`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30pt"
                height="24pt"
                version="1.0"
                viewBox="0 0 36 36"
            >
                <text
                    fontSize="1.5em"
                    x="50%"
                    y="50%"
                    className="base"
                    fill="currentColor"
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    {percent}
                </text>
            </svg>

            <span>{textDone}</span>
        </div>
    );
};
