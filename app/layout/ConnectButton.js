import { useDatacontext } from "../context";

export default function ConnectButton() {
    const {
        data: { accountInfo, status },
        fn: { setWalletDetails },
    } = useDatacontext();

    if (status !== "connected") {
        return (
            <div className="uppercase bg-orange-accent text-white h-8 flex items-center justify-center rounded px-3 ml-2">
                <span>Connect Wallet</span>
            </div>
        );
    }

    const account = accountInfo.address;
    return (
        <div
            title={`Balance: ${accountInfo.balance} TRX`}
            className="uppercase bg-orange-accent text-white h-8 flex items-center justify-center rounded px-3 ml-2"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
            </svg>
            <span>
                {account.slice(0, 6)}...{account.slice(account.length - 4)}
            </span>
        </div>
    );
}
