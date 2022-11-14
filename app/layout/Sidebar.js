import NavLink from "./NavLink";
import styles from "../../styles/Layout.module.css";
import { useDatacontext } from "../context";

const Sidebar = () => {
    const {
        data: { categoriesList, accountInfo },
    } = useDatacontext();

    return (
        <div className="dt-sidebar">
            <div className={styles.sidebar_header}>
                <div className="flex items-center p-5">
                    <img
                        src="/logo.png"
                        alt="GaiaDeals"
                        className="w-10 h-10"
                    />
                    <div className="ml-3">
                        <h1 className="header-title text-4xl pb-1">
                            GAIA<span>DEALS</span>
                        </h1>
                    </div>
                </div>
            </div>
            {/* <div className="relative mb-6 mx-4 shadow rounded border-0">
                <input
                    type="search"
                    className="focus:outline-none p-3"
                    placeholder="Search..."
                />
                <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-500">
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
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </div> */}
            <ul className={styles.sidebar_nav}>
                <li className="mt-5">
                    <NavLink
                        className={styles.footbar_link}
                        classActive={styles.sidebar_selected}
                        to="/"
                    >
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
                                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                        </svg>
                        <span>Homepage</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={styles.footbar_link}
                        classActive={styles.sidebar_selected}
                        to="/deals"
                    >
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
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        <span>My Deals</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={styles.footbar_link}
                        classActive={styles.sidebar_selected}
                        to="/sell-form"
                    >
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
                                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                            />
                        </svg>

                        <span>Publish</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={styles.footbar_link}
                        classActive={styles.sidebar_selected}
                        to={`/profile/${accountInfo.address}`}
                    >
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
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg>

                        <span>My Profile</span>
                    </NavLink>
                </li>
            </ul>
            <hr />

            <h5 className="p-5 text-sm font-bold text-gray-500">Categories</h5>
            <ul className={styles.sidebar_nav}>
                {categoriesList.map(({ id, name }) => (
                    <li key={id}>
                        <NavLink
                            className={styles.footbar_link}
                            classActive={styles.sidebar_selected}
                            to={`/category/${id}`}
                        >
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
                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                />
                            </svg>

                            <span>{name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className={styles.sidebar_footer}>
                <a href="https://google.com" target="_blank">
                    <i className="zmdi zmdi-instagram"></i>
                </a>
                <a href="https://twitter.com/gaiadeals_" target="_blank">
                    <i className="zmdi zmdi-twitter"></i>
                </a>
                <a href="https://google.com" target="_blank">
                    <i className="zmdi zmdi-whatsapp"></i>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
