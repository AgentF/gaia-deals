import Link from "next/link";
import styles from "../../styles/Layout.module.css";

const Navbar = () => {
    return (
        <div className="mv-navbar">
            <Link href="/">
                <a className={styles.navbar_brand}>
                    <img src="/logo.png" alt="GaiaDeals Logo" />
                </a>
            </Link>
            <div className="absolute right-3 top-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Navbar;
