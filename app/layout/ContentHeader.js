import ConnectButton from "./ConnectButton";

function ContentHeader({ title, titleLv2 }) {
    return (
        <div className="w-full flex justify-between px-10 pt-5 md:pt-0">
            {
                !titleLv2 ?
                <h2 className="text-xl font-bold text-gray-500">{title}</h2>
                :
                <h2 className="flex items-center text-xl font-bold text-gray-500">
                    <span>{title}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                    <span>{titleLv2}</span>
                </h2>
            }
            
            <ConnectButton />
        </div>
    );
}

export default ContentHeader;
